import helpers from '../../helpers';
import resolveValue from '../../utils/resolveValue';

/**
 * Рендер значения в зависимости от равенства аргументов (`==`)
 */
helpers.is = function is(a: unknown, b: unknown, options: Handlebars.HelperOptions) {
  // eslint-disable-next-line eqeqeq
  return resolveValue(a == b, this, options);
};
