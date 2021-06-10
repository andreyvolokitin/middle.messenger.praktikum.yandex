import addEventListener from '../../../utils/addEventListener';
import isKeyDown from '../../../utils/isKeyDown';
import debounce from '../../../utils/debounce';

const ZERO_WIDTH_SPACE = '\u200B';
const PARENT_CLONE_CLASSNAME = 'is-clone';
const OVERFLOWN_TEXTAREA_CLASSNAME = 'is-overflown';

class Chat {
  constructor(chatElem) {
    if (!chatElem) {
      return;
    }

    this._chat = chatElem;
    this._form = this._chat.querySelector('.js-chat__input-form');
    this._textarea = this._chat.querySelector('.js-chat__input-field');
    this._div = document.createElement('div');
    this._parentClone = this._textarea.parentNode.cloneNode(true);
    this._textareaClone = this._parentClone.querySelector('textarea');

    this._heightLimit = this._textarea.dataset.heightLimit;

    /*
     * - клонируем обёртку с `textarea`, чтобы сохранить нужные стили;
     * - меняем в клоне тег с "textarea" на "div[contenteditable=true]" (по размеру клона мы будем выставлять размер `textarea`);
     * - добавляем клон рядом с оригиналом, чтобы он имел такую же ширину
     * */
    this._parentClone.classList.add(PARENT_CLONE_CLASSNAME);
    [...this._textareaClone.attributes].forEach((attr) =>
      this._div.setAttribute(attr.name, attr.value)
    );
    this._div.contentEditable = true;
    this._textarea.insertAdjacentElement('afterend', this._parentClone);
    this._textareaClone.replaceWith(this._div);
    this._div.style.height = 'auto';

    this._handlers = [
      addEventListener(this._textarea, 'input', (e) => {
        this.handleTextareaSizing(e.target.value, e.data);
      }),
      addEventListener(this._textarea, 'keypress', (e) => {
        if (e.key === 'Enter' && !isKeyDown('Shift')) {
          // не добавлять символ в `<textarea>`
          e.preventDefault();
          this.sendMessage(e.target.value);
        }
      }),
      addEventListener(this._form, 'submit', (e) => {
        e.preventDefault();
        this.sendMessage(this._textarea.value);
      }),
      addEventListener(
        window,
        'resize',
        debounce(150, () => {
          this.handleTextareaSizing(this._textarea.value);
        })
      ),
      addEventListener(
        window,
        'orientationchange',
        debounce(0, () => {
          this.handleTextareaSizing(this._textarea.value);
        })
      ),
    ];

    this.handleTextareaSizing(this._textarea.value);

    this._isInited = true;
  }

  /**
   * Устанавливает высоту `textarea` соразмерно высоте contenteditable-клона,
   * если ещё не достигнут лимит высоты.
   *
   * Ограничивает высоту `terxtarea`
   * @param finalValue - полное текстовое содержимое для установки клону
   * @param enteredValue - текущий введённый символ
   */
  handleTextareaSizing(finalValue, enteredValue) {
    this._div.innerText = finalValue;

    // contenteditable не реагирует на вводимый при нажатии enter символ, добавка "zero-width space" это исправляет
    if (enteredValue === null) {
      this._div.appendChild(document.createTextNode(ZERO_WIDTH_SPACE));
    }

    const textareaClientHeight = this._textarea.clientHeight;
    const divClientHeight = this._div.clientHeight;
    const isTextareaOverflown = divClientHeight >= this._heightLimit;
    const shouldUpdateHeight = !isTextareaOverflown || divClientHeight < textareaClientHeight;

    if (shouldUpdateHeight) {
      this._textarea.style.height = `${divClientHeight}px`;
    }

    this._textarea.classList.toggle(OVERFLOWN_TEXTAREA_CLASSNAME, isTextareaOverflown);
  }

  sendMessage(msg) {
    console.log(`Отправить сообщение: ${msg}`);
    this._textarea.value = '';
    this.handleTextareaSizing('');
  }

  destroy() {
    if (this._isInited) {
      this._handlers.forEach((fn) => fn && fn());
      this._handlers = null;

      this._chat = null;
      this._form = null;
      this._textarea = null;
      this._div = null;
      this._parentClone = null;
      this._textareaClone = null;

      this._isInited = false;
    }
  }
}

export default Chat;
