import isObject from './isObject';

export default function setObjectValue(
  obj: Record<string, unknown> | unknown,
  path: string,
  value: unknown
): Record<string, unknown> | unknown {
  if (!isObject(obj)) {
    return obj;
  }

  return path.split('.').reduce((acc, val, i, arr) => {
    if (i === arr.length - 1) {
      acc[val] = value;
    } else if (!isObject(acc[val])) {
      acc[val] = {};
    }

    return acc[val];
  }, obj);
}
