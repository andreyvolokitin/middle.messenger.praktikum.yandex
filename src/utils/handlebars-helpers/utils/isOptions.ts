import isObject from '../../isObject';

/**
 * Прерить, является ли переданное значение объектом опций хэлпера
 */
export default function isOptions(val: unknown): boolean {
  return isObject(val) && isObject((val as Record<string, unknown>).hash);
}
