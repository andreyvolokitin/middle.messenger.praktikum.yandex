import helpers from '../../helpers';
import isNotDefined from '../../utils/isNotDefined';
import isNumberLike from '../../../isNumberLike';

/**
 * Вернуть элемент массива под указанным индексом
 */
helpers.itemAt = function itemAt(array: unknown[], index: number | string): unknown {
  if (isNotDefined(array)) {
    return '';
  }

  if (!Array.isArray(array)) {
    throw new Error(
      'Передайте массив, последний элемент которого должен использоваться в качестве контекста'
    );
  }

  const i = isNumberLike(index) ? Number(index) : 0;

  if (i < 0) {
    return array[array.length + i];
  }

  if (i < array.length) {
    return array[i];
  }

  return '';
};
