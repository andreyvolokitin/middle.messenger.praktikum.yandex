import isBlock from './isBlock';

/**
 * Возврат значения хэлпера
 * (block/inverse для блочного хэлпера, само значение для инлайн-хэлпера)
 */
export default function resolveValue(
  val: unknown,
  context: unknown,
  options: Handlebars.HelperOptions
): string | unknown {
  if (isBlock(options)) {
    return val ? options.fn(context) : options.inverse(context);
  }

  return val;
}
