import { DragSortTable, PageContainer } from '@ant-design/pro-components';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useRequest } from '@umijs/max';
import { useWavesurfer } from '@wavesurfer/react';
import { Button, Input, InputNumber, Space, Spin } from 'antd';
import ButtonGroup from 'antd/es/button/button-group';
import Handlebars from 'handlebars';
import { useEffect, useMemo, useRef, useState } from 'react';
import Hover from 'wavesurfer.js/dist/plugins/hover.esm.js';
import Regions, { Region } from 'wavesurfer.js/dist/plugins/regions.esm.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { FFMPEG_PATH, WAVESURFER_HOVER_OPTION, WAVESURFER_OPTION, WAVESURFER_TIMELINE_OPTION } from './constant';
import { formatSecondsWithDate } from './utils';

interface CutAudioItem {
  startTime: string;
  endTime: string;
  start: number;
  end: number;
  url: string;
  name?: string;
}

function useWavesurferInit() {
  const containerRef = useRef(null);

  const regions = useMemo(() => Regions.create(), []);
  const timeline = useMemo(() => Timeline.create(WAVESURFER_TIMELINE_OPTION), []);
  const hover = useMemo(() => Hover.create(WAVESURFER_HOVER_OPTION), []);

  const rest = useWavesurfer({
    container: containerRef,
    ...WAVESURFER_OPTION,
    plugins: useMemo(() => [timeline, hover, regions], []),
  });

  return { ...rest, regions, containerRef };
}

const HomePage: React.FC = () => {
  const { wavesurfer, isPlaying, containerRef, regions } = useWavesurferInit();

  const regionCacheRef = useRef<Record<string, Region | undefined>>({});

  const [region, setRegion] = useState<Region | null>(null);

  const [audio, setAudio] = useState<string | null>(null);

  useEffect(() => {
    if (!wavesurfer) return;

    wavesurfer.on('ready', () => {
      const duration = wavesurfer.getDuration();
      setRegion(
        regions.addRegion({
          start: 0,
          end: Math.min(10, Math.floor(duration / 4)),
          content: 'Cut Region',
          drag: true,
          resize: true,
        }),
      );
    });
    wavesurfer.on('interaction', () => {
      wavesurfer.play();
    });
  }, [wavesurfer, regions]);

  function onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    regions.clearRegions();

    const url = URL.createObjectURL(file);
    setAudio(url);
    wavesurfer?.load?.(url);
  }

  const [dataSource, setDataSource] = useState<CutAudioItem[]>([]);

  const { loading, run } = useRequest(
    async () => {
      if (!region) {
        return;
      }

      const { start, end } = region;

      // 格式化开始和结束时间
      const startTime = formatSecondsWithDate(start);
      const endTime = formatSecondsWithDate(end);

      // 验证输入
      if (!startTime || !endTime) {
        return;
      }

      // 初始化 FFmpeg
      const ffmpeg = new FFmpeg();
      // 设置日志处理
      ffmpeg.on('log', ({ message }) => console.log(message));
      // 设置进度处理
      ffmpeg.on('progress', ({ progress, time }) => console.info(`${progress * 100} %, time: ${time / 1000000} s`));
      // 加载 FFmpeg 核心

      await ffmpeg.load({
        coreURL: await toBlobURL(`${FFMPEG_PATH}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${FFMPEG_PATH}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      await ffmpeg.writeFile('input.mp3', await fetchFile(audio!));

      await ffmpeg.exec(['-i', 'input.mp3', '-ss', startTime, '-to', endTime, '-acodec', 'copy', 'output.mp3']);

      const data = await ffmpeg.readFile('output.mp3');
      const url = URL.createObjectURL(new Blob([(data as any).buffer], { type: 'audio/mpeg' }));

      setDataSource((prev) => [...prev, { url, start, end, startTime, endTime }]);
    },
    { manual: true },
  );

  const handleDragSortEnd = (beforeIndex: number, afterIndex: number, newDataSource: CutAudioItem[]) => {
    setDataSource(newDataSource);
  };

  const [starNumber, setStartNumber] = useState(1);
  const [name, setName] = useState('RE.{{index}}.mp3');

  return (
    <PageContainer ghost>
      <Spin spinning={loading}>
        <div>
          <div ref={containerRef} />
          <Input style={{ marginTop: 24 }} type="file" id="uploader" accept="audio/mpeg" onChange={onFileChange} />
        </div>

        <Space style={{ marginTop: 24, marginBottom: 24 }}>
          <ButtonGroup>
            <Button onClick={() => wavesurfer?.playPause()}>{isPlaying ? 'Pause' : 'Play'}</Button>
            <Button onClick={run}>Cut</Button>
          </ButtonGroup>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <InputNumber<number> min={1} value={starNumber} onChange={(v) => setStartNumber(v!)} />
        </Space>

        <DragSortTable<CutAudioItem>
          rowKey="url"
          search={false}
          toolBarRender={false}
          dataSource={dataSource.map((item, index) => {
            return {
              ...item,
              name: Handlebars.compile(name)({
                ...item,
                index: index + starNumber,
              }),
            };
          })}
          columns={[
            { title: '排序', dataIndex: 'sort', width: 80 },
            { title: 'Start Time', dataIndex: 'startTime' },
            { title: 'End Time', dataIndex: 'endTime' },
            { title: 'Audio', dataIndex: 'url', render: (_, record) => <audio src={record.url} controls /> },
            {
              title: 'File',
              dataIndex: 'name',
            },

            {
              title: 'Action',
              dataIndex: 'action',
              render: (_, record) => (
                <Space>
                  <Button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = record.url;
                      link.download = record.name!;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    Download
                  </Button>
                  <Button
                    onClick={() => {
                      if (!!regionCacheRef.current?.[record?.url]) {
                        regionCacheRef.current?.[record?.url]?.remove?.();
                        regionCacheRef.current = {
                          ...regionCacheRef.current,
                          [record?.url]: undefined,
                        };
                      } else {
                        const r = regions.addRegion({
                          start: record.start,
                          end: record.end,
                          drag: false,
                          resize: false,
                          color: 'rgba(9,105,218,0.2)',
                        });
                        regionCacheRef.current = {
                          ...regionCacheRef.current,
                          [record?.url]: r,
                        };
                      }
                    }}
                  >
                    Watch
                  </Button>
                  <Button
                    onClick={() => {
                      setDataSource((prev) => prev.filter((item) => item.url !== record.url));
                    }}
                  >
                    Delete
                  </Button>
                </Space>
              ),
            },
          ]}
          dragSortKey="sort"
          onDragSortEnd={handleDragSortEnd}
        />
      </Spin>
    </PageContainer>
  );
};

export default HomePage;
