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
function debounce(ms: number, fn: () => void, isImmediate?: boolean): () => void {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return () => {
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    } else if (isImmediate) {
      fn.apply(this, args);
    }

    timeout = setTimeout(() => {
      if (!isImmediate) {
        fn.apply(this, args);
      }

      timeout = undefined;
    }, ms);
  };
}

export default debounce;
