import helpers from '../../helpers';

/**
 * Добавить суффикс к строке.
 */
helpers.append = function append(string: string, suffix: string): string {
  if (typeof string !== 'string' || typeof string !== 'string') {
    throw new Error('Передайте строки для соединения');
  }

  return string + suffix;
};
