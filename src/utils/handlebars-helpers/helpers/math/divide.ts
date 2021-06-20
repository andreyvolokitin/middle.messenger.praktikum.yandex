import helpers from '../../helpers';
import isNumberLike from '../../../isNumberLike';

/**
 * Вернуть разницу двух аргументов
 */
helpers.divide = function divide(a: number | string, b: number | string): number {
  if (!isNumberLike(a) || !isNumberLike(b)) {
    throw new Error('Передайте 2 числовых значения для деления');
  }

  return Number(a) / Number(b);
};
