import isObject from './isObject';

export default function mergeObjects(
  lhs: Record<string, unknown>,
  rhs: Record<string, unknown>
): Record<string, unknown> {
  const destination = lhs;

  Object.keys(rhs).forEach((key) => {
    const lval = lhs[key];
    const rval = rhs[key];

    try {
      if (isObject(lval) && isObject(rval)) {
        destination[key] = mergeObjects(lval, rval);
      } else {
        destination[key] = rval;
      }
    } catch {
      // защита от переполнения стека
      destination[key] = rval;
    }
  });

  return destination;
}
