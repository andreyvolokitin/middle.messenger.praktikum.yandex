import helpers from '../../helpers';
import resolveValue from '../../utils/resolveValue';

/**
 * Рендер значения в зависимости от результата логического умножения аргументов
 */
helpers.and = function and(...args: unknown[]) {
  const options = args.pop();
  const result = args.every((arg) => arg);

  return resolveValue(result, this, options as Handlebars.HelperOptions);
};
