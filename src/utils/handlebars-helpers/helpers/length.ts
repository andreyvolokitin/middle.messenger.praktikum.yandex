import helpers from '../helpers';

/**
 * Вернуть длину массива или строки
 */
helpers.length = function length(value: unknown[] | string): number {
  if (typeof value !== 'string' && !Array.isArray(value)) {
    throw new Error('Передайте массив или строку для нахождения длины');
  }

  return value.length;
};
