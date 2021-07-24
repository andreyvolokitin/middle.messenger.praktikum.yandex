import isObjectOrArray from './isObjectOrArray';
import isArray from './isArray';
import toCase from './toCase';

type Case = 'kebab' | 'snake' | 'camel';

export default function toCaseDeep(val: unknown, sourceCase: Case, targetCase: Case): unknown {
  if (!isObjectOrArray(val)) {
    return val;
  }

  if (isArray(val)) {
    return val.map((item) => toCaseDeep(item, sourceCase, targetCase));
  }

  return Object.fromEntries(
    Object.entries(val).map(([key, value]) => [
      toCase(key, sourceCase, targetCase),
      toCaseDeep(value, sourceCase, targetCase),
    ])
  );
}
