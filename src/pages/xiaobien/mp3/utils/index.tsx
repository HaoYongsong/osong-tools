export function formatSecondsWithDate(seconds: number) {
  const date = new Date(seconds * 1000);
  const h = date.getUTCHours();
  const m = date.getUTCMinutes();
  const s = date.getUTCSeconds();
  const ms = String(seconds).split('.')[1]?.padEnd(3, '0').slice(0, 3) || '000';

  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`;
}
