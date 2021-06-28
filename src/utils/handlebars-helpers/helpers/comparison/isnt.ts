import helpers from '../../helpers';
import resolveValue from '../../utils/resolveValue';

/**
 * Рендер значения в зависимости от неравенства аргументов (`!=`)
 */
helpers.isnt = function isnt(a: unknown, b: unknown, options: Handlebars.HelperOptions) {
  // eslint-disable-next-line eqeqeq
  return resolveValue(a != b, this, options);
};
