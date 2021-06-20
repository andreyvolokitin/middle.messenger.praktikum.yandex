export default function getObjectValue(obj: Record<string, unknown>, path: string): unknown {
  return path
    .split('.')
    .slice()
    .reduce((value, prop, i, arr) => {
      const segment = value[prop];

      if (!segment) {
        arr.splice(i - 1);
      }

      return segment;
    }, obj);
}
