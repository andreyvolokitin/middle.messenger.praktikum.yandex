const SPINNER_CLASSNAME = 'spinner';
const PROCESSING_CLASSNAME = 'is-processing';

export default function toggleSpinner(elem?: HTMLElement, force?: boolean): void {
  if (!elem) {
    return;
  }

  const spinner = elem.querySelector(`.${SPINNER_CLASSNAME}`);
  const isButtonElem = (el: HTMLElement): el is HTMLButtonElement =>
    el.tagName.toLowerCase() === 'button';

  elem.classList.toggle(PROCESSING_CLASSNAME, force);

  if (isButtonElem(elem)) {
    // eslint-disable-next-line no-param-reassign
    elem.disabled = typeof force === 'boolean' ? force : !elem.disabled;
  }

  if (!spinner) {
    elem.insertAdjacentHTML('beforeend', `<div class="${SPINNER_CLASSNAME}"></div>`);
  }
}
