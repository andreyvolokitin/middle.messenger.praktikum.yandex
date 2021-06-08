/**
 * Хэлпер для `addEventListener`.
 * @param elem{HTMLElement} - элемент для добавки листенера
 * @param type{String} - тип события
 * @param listener{Function} - листенер
 * @param options{Boolean|Object} - опциональный третий аргумент для нативного `addEventListener`
 * @returns {function(): *} - коллбэк для удаления листенера
 */
function addEventListener(elem, type, listener, options) {
  elem.addEventListener(type, listener, options);

  return () => elem.removeEventListener(type, listener, options);
}

export default addEventListener;
