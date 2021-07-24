export default function getObjectValue(
  obj: Record<string, unknown> | unknown[],
  path: string,
  separator = '.',
  propGetter = (val: Record<string, unknown> | unknown[], prop: string) => Reflect.get(val, prop)
): unknown {
  return path
    .split(separator)
    .slice()
    .reduce((value, prop, _i, arr) => {
      const segment = propGetter(value, prop);
      const array = arr;

      if (!segment) {
        array.length = 0;
      }

      return segment;
    }, obj);
}
