import helpers from '../../helpers';
import isNotDefined from '../../utils/isNotDefined';

/**
 * Использовать последний элемент массива в качестве контекста для блока, задаваемого хэлепром
 */
helpers.withLast = function withLast(
  array: unknown[],
  options: Handlebars.HelperOptions
): string | unknown {
  if (isNotDefined(array)) {
    return '';
  }

  if (!Array.isArray(array)) {
    throw new Error(
      'Передайте массив, последний элемент которого должен использоваться в качестве контекста'
    );
  }

  return options.fn(array[array.length - 1]);
};
