type EventListenerOptions = boolean | Record<string, boolean | AbortSignal>;

/**
 * Хэлпер для `addEventListener`.
 * @param target{EventTarget} - элемент для добавки листенера
 * @param type{String} - тип события
 * @param listener{Function} - листенер
 * @param options{Boolean|Object} - опциональный третий аргумент для нативного `addEventListener`
 * @returns {function(): *} - коллбэк для удаления листенера
 */
function addEventListener(
  target: EventTarget,
  type: string,
  listener: (e: Event) => unknown,
  options?: EventListenerOptions
): () => void {
  if (!target) {
    // eslint-disable-next-line
    return () => {};
  }

  target.addEventListener(type, listener, options);

  return () => target.removeEventListener(type, listener, options);
}

export default addEventListener;
