import helpers from '../../helpers';
import isNumberLike from '../../../isNumberLike';

/**
 * Вернуть строку с длиной, не превышающей указанный лимит.
 */
helpers.truncate = function truncate(string: string, limit: number | string): string {
  if (!isNumberLike(limit)) {
    throw new Error('Укажите максимальную длину строки');
  }

  if (typeof string !== 'string') {
    return '';
  }

  if (string.length > limit) {
    return string.slice(0, Number(limit));
  }

  return string;
};
