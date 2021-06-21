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

  let actualReplacement = replacement;

  if (typeof replacement !== 'string') {
    actualReplacement = '';
  }

  return string.replace(substring, actualReplacement);
};
