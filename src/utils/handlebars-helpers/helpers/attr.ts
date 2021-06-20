import helpers from '../helpers';

/**
 * Превратить параметры, переданные в хэлпер, в строку html-атрибутов.
 */
helpers.attr = function attr(options: Handlebars.HelperOptions): string {
  const hash = (options && options.hash) || {};
  const stringifiedHash = Object.keys(hash)
    .map((key) => {
      const val = String(hash[key]).replace(/^['"]|['"]$/g, '');
      return `${key}="${val}"`;
    })
    .join(' ')
    .trim();

  return stringifiedHash ? ` ${stringifiedHash}` : '';
};
