import isOptions from './isOptions';

/**
 * Проверить, определено ли значение. Значение может быть опциями хэлпера,
 * что равносильно тому, что значение не было передано, а значит не определено
 */
export default function isNotDefined(value: unknown): boolean {
  return value == null || isOptions(value);
}
