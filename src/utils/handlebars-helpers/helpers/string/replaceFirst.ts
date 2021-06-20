import helpers from '../../helpers';

/**
 * Заменить первое вхождение подстроки на другую подстроку
 */
helpers.replaceFirst = function replaceFirst(
  string: string,
  substring: string,
  replacement: string
): string {
  if (typeof string !== 'string') {
    return '';
  }

  if (typeof substring !== 'string') {
    return string;
  }

  if (typeof replacement !== 'string') {
    // eslint-disable-next-line no-param-reassign
    replacement = '';
  }

  return string.replace(substring, replacement);
};
