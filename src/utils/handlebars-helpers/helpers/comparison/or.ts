import helpers from '../../helpers';
import resolveValue from '../../utils/resolveValue';

/**
 * Рендер значения в зависимости от результата дизъюнкции аргументов
 */
helpers.or = function or(...args: unknown[]) {
  const options = args.pop();
  const result = args.some((arg) => arg);

  return resolveValue(result, this, options as Handlebars.HelperOptions);
};
