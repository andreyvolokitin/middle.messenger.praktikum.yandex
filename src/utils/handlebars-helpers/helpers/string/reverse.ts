import helpers from '../../helpers';

/**
 * Вернуть "зеркальную" строку
 */
helpers.reverse = function reverse(string: string): string {
  if (typeof string !== 'string') {
    return '';
  }

  return [...string].reverse().join('');
};
