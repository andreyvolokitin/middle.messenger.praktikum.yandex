import helpers from '../../helpers';

helpers.startsWith = function startsWith(string: string, substr: string): boolean {
  if (typeof string !== 'string' || typeof substr !== 'string') {
    return false;
  }

  return string.startsWith(substr);
};
