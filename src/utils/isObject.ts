export default function isObject(val: unknown): val is Record<string, unknown> {
  return Boolean(val) && Object.prototype.toString.call(val) === '[object Object]';
}
