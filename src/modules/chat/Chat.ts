import Block from '../block';
import ChatPreview from '../components/chat-preview';
import { Button, Input } from '../../components';
import MessageList from './components/message-list';
import template from './chat.tpl';
import addEventListener from '../../utils/addEventListener';
import isKeyDown from '../../utils/isKeyDown';
import debounce from '../../utils/debounce';
import MessengerController from '../../controllers/MessengerController';

const ZERO_WIDTH_SPACE = '\u200B';
const PARENT_CLONE_CLASSNAME = 'is-clone';
const OVERFLOWN_TEXTAREA_CLASSNAME = 'is-overflown';

interface ChatProps extends Props {
  currentChat: ChatData;
}

export default class Chat extends Block {
  static template = template;

  static deps = { ChatPreview, MessageList, Button, Input };

  storeSelectors = ['/currentChat'];

  private _chat: Nullable<HTMLElement>;

  private _form: Nullable<HTMLFormElement>;

  private _textarea: Nullable<HTMLTextAreaElement>;

  private _attach: Nullable<HTMLInputElement>;

  private _div: Nullable<HTMLDivElement>;

  private _parentClone: Nullable<HTMLElement>;

  private _textareaClone: Nullable<HTMLTextAreaElement>;

  private _heightLimit: number;

  private _handlers: (() => void)[];

  messengerController: MessengerController;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }

  init(): void {
    this._chat = this.element;
    this._form = this._chat.querySelector('.js-chat__input-form') as HTMLFormElement;

    if (!this._form) {
      return;
    }

    this._textarea = this._chat.querySelector('.js-chat__input-field') as HTMLTextAreaElement;
    this._attach = this._chat.querySelector('.js-chat__attach-input') as HTMLInputElement;
    this._div = document.createElement('div') as HTMLDivElement;
    this._parentClone = this._textarea.parentNode?.cloneNode(true) as HTMLElement;
    this._textareaClone = this._parentClone.querySelector('textarea') as HTMLTextAreaElement;
    this._heightLimit = Number(this._textarea.dataset.heightLimit);

    /*
     * - клонируем обёртку с `textarea`, чтобы сохранить нужные стили;
     * - меняем в клоне тег с "textarea" на "div[contenteditable='true']" (по размеру клона мы будем выставлять размер `textarea`);
     * - добавляем клон рядом с оригиналом, чтобы он имел такую же ширину
     * */
    this._parentClone.classList.add(PARENT_CLONE_CLASSNAME);
    [...this._textareaClone.attributes].forEach((attr) =>
      this._div?.setAttribute(attr.name, attr.value)
    );
    this._div.contentEditable = 'true';
    this._textarea.insertAdjacentElement('afterend', this._parentClone);
    this._textareaClone.replaceWith(this._div);
    this._div.style.height = 'auto';

    this.messengerController = new MessengerController();

    this._handlers = [
      addEventListener(this._attach, 'change', async (e: InputEvent) => {
        const input = e.target as HTMLInputElement;
        const { files } = input;

        if (!files || !files.length) {
          delete input.dataset.attach;
          return;
        }

        const formData = new FormData();

        formData.append('resource', files[0]);

        const fileData = await this.messengerController.uploadFile(
          formData,
          input.parentNode as HTMLElement
        );

        if (fileData) {
          input.dataset.attach = String(fileData.id);
        }
      }),
      addEventListener(this._textarea, 'input', (e: InputEvent) => {
        this.handleTextareaSizing((e.target as HTMLTextAreaElement).value, e.data);
      }),
      addEventListener(this._textarea, 'keypress', (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !isKeyDown('Shift')) {
          // не добавлять символ в `<textarea>`
          e.preventDefault();
          this.sendMessage();
        }
      }),
      addEventListener(this._textarea, 'blur', (e: KeyboardEvent) => {
        if (!(e.target as HTMLTextAreaElement).value.trim()) {
          this.resetTextarea();
        }
      }),
      addEventListener(this._form, 'submit', (e) => {
        e.preventDefault();
        this.sendMessage();
      }),
      addEventListener(
        window,
        'resize',
        debounce(150, () => {
          if (!this.isMounted || !this.element.isConnected) {
            return;
          }

          this.handleTextareaSizing(this._textarea ? this._textarea.value : '');
        })
      ),
      addEventListener(
        window,
        'orientationchange',
        debounce(0, () => {
          if (!this.isMounted || !this.element.isConnected) {
            return;
          }

          this.handleTextareaSizing(this._textarea ? this._textarea.value : '');
        })
      ),
    ];
  }

  /**
   * Устанавливает высоту `textarea` соразмерно высоте contenteditable-клона,
   * если ещё не достигнут лимит высоты.
   *
   * Ограничивает высоту `terxtarea`
   * @param finalValue - полное текстовое содержимое для установки клону
   * @param enteredValue - текущий введённый символ
   */
  handleTextareaSizing(finalValue: string, enteredValue?: string | null): void {
    if (!this._div || !this._textarea) {
      return;
    }

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

  sendMessage(): void {
    const fileId = this._attach!.dataset.attach;
    const content = this._textarea!.value.trim();

    if (!content && !fileId) {
      return;
    }

    this.messengerController.sendMessage(
      { content, fileId: fileId! },
      (this.props.currentChat as ChatData).id
    );

    this._attach!.value = '';
    delete this._attach!.dataset.attach;

    if (!fileId && content) {
      this.resetTextarea();
    }
  }

  resetTextarea(): void {
    if (!this._textarea) {
      return;
    }

    this._textarea.value = '';
    this.handleTextareaSizing('');
  }

  componentDidMount() {
    if (this._textarea) {
      this.handleTextareaSizing(this._textarea.value);
    }
  }

  componentDidUpdate() {
    if (this._textarea) {
      this.handleTextareaSizing(this._textarea.value);
    }
  }

  destroy(): void {
    if (this._handlers) {
      this._handlers.forEach((remove) => remove && remove());
    }
    this._handlers = [];

    this._chat = null;
    this._form = null;
    this._textarea = null;
    this._attach = null;
    this._div = null;
    this._parentClone = null;
    this._textareaClone = null;
  }
}
