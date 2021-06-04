/**
 * Дебаунс функции. При вызове функции чаще, чем N миллисекунд,
 * функция будет исполнена только один раз, спустя N миллисекунд после последнего вызова.
 *
 * Если параметр `isImmediate === true`, то вызов функции произойдёт немедленно
 * @param ms
 * @param fn
 * @param isImmediate
 * @returns {function(...[*]=)}
 */
function debounce(ms, fn, isImmediate) {
  let timeout;

  return () => {
    const that = this;
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    } else if (isImmediate) {
      fn.apply(that, args);
    }

    timeout = setTimeout(() => {
      !isImmediate && fn.apply(that, args);
      timeout = undefined;
    }, ms);
  }
}

export default debounce;