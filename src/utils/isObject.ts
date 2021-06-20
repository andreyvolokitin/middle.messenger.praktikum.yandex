export default function isObject(obj: unknown): boolean {
  return Boolean(obj) && Object.prototype.toString.call(obj) === '[object Object]';
}
