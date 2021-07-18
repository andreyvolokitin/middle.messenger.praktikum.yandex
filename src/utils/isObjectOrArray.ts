import isObject from './isObject';
import isArray from './isArray';

export default function isObjectOrArray(val: unknown): val is Record<string, unknown> | [] {
  return isObject(val) || isArray(val);
}
