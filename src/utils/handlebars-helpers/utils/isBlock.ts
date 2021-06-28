import isOptions from './isOptions';

/**
 * Прерить, является ли переданный объект объектом опций блочного хэлпера
 */
export default function isBlock(options: Handlebars.HelperOptions): boolean {
  return (
    isOptions(options) && typeof options.fn === 'function' && typeof options.inverse === 'function'
  );
}
