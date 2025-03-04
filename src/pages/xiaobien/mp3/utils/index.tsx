import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { FFMPEG_PATH } from '../constant';

export function formatSecondsWithDate(seconds: number) {
  const date = new Date(seconds * 1000);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getUTCSeconds();
  const ms = String(seconds).split('.')[1]?.padEnd(3, '0').slice(0, 3) || '000';

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`;
}

export function download(record: { url: string; name: string }) {
  const link = document.createElement('a');
  link.href = record.url;
  link.download = record.name!;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function createFFmpeg() {
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

  return ffmpeg;
}

export async function ffmpegSplitMP3(audio: string, startTime: string, endTime: string) {
  const ffmpeg = await createFFmpeg();

  await ffmpeg.writeFile('input.mp3', await fetchFile(audio!));

  await ffmpeg.exec(['-i', 'input.mp3', '-ss', startTime, '-to', endTime, '-acodec', 'copy', 'output.mp3']);

  const data = await ffmpeg.readFile('output.mp3');

  return URL.createObjectURL(new Blob([(data as any).buffer], { type: 'audio/mpeg' }));
}
