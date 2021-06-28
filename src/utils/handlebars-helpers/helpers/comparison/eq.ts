import helpers from '../../helpers';
import resolveValue from '../../utils/resolveValue';

/**
 * Рендер значения в зависимости от эквивалентности двух аргументов (`===`)
 */
helpers.eq = function eq(
  a: number | string,
  b: number | string,
  options: Handlebars.HelperOptions
) {
  if (arguments.length !== 3) {
    throw new Error('Передайте 2 значения для сравнения');
  }

  return resolveValue(a === b, this, options);
};
