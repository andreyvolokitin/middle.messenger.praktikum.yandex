const state = {};

window.addEventListener('keyup', (e) => (state[e.key] = false));
window.addEventListener('keydown', (e) => (state[e.key] = true));

/**
 * Определить, зажата ли клавиша
 * @param key - значение, валидное для `KeyboardEvent.key`: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
 * @returns {*|boolean} - состояние зажатия
 */
function isKeyDown(key) {
  return state.hasOwnProperty(key) && state[key];
}

export default isKeyDown;
