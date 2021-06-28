import helpers from '../../helpers';
import resolveValue from '../../utils/resolveValue';

/**
 * Рендер значения в зависимости от того, больше ли первый аргумент второго
 */
helpers.gt = function gt(
  a: number | string,
  b: number | string,
  options: Handlebars.HelperOptions
) {
  if (arguments.length !== 3) {
    throw new Error('Передайте 2 значения для сравнения');
  }

  return resolveValue(a > b, this, options);
};
