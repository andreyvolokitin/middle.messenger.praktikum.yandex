import helpers from '../../helpers';

/**
 * Возвращает первый аргумент, не равный `null`/`undefined`
 */
helpers.default = function (...args: unknown[]): string | unknown {
  for (let i = 0; i < args.length - 1; i += 1) {
    if (args[i] !== null && args[i] !== undefined) {
      return args[i];
    }
  }

  return '';
};
