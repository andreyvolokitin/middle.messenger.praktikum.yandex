import Block from '../block';
import Button from '../../components/button';
import template from './upload-avatar.tpl';
import addEventListener from '../../utils/addEventListener';

const UPLOADING_CLASS = 'is-uploading';
const UPLOADED_CLASS = 'is-uploaded';

export default class UploadAvatar extends Block {
  static TEMPLATE = template;

  static DEPS = { Button };

  private _uploadInput: Nullable<HTMLInputElement>;

  private _fileLabel: Nullable<HTMLElement>;

  private _progressbar: Nullable<HTMLProgressElement>;

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();

    this._uploadInput = this.element.querySelector('.js-upload-avatar__input') as HTMLInputElement;
    this._fileLabel = this.element.querySelector('.js-upload-avatar__file') as HTMLElement;
    this._progressbar = this.element.querySelector(
      '.js-upload-avatar__progress'
    ) as HTMLProgressElement;

    this._handlers = [
      addEventListener(this._uploadInput, 'change', (e: Event) => {
        const targetInput = e.target as HTMLInputElement;

        if (!targetInput || !targetInput.files) {
          return;
        }

        this.element.classList.add(UPLOADING_CLASS);
        this.element.classList.remove(UPLOADED_CLASS);
        this._renderProgress(0);
        (this._fileLabel as HTMLElement).textContent = targetInput.files[0].name;
      }),
    ];
  }

  private _renderProgress(progress: number) {
    (this._progressbar as HTMLProgressElement).value = progress;

    if (progress < 1) {
      requestAnimationFrame(() => {
        this._renderProgress(progress + 0.01);
      });
    } else {
      this.element.classList.add(UPLOADED_CLASS);
      this.element.classList.remove(UPLOADING_CLASS);
    }
  }

  destroy(): void {
    this._handlers.forEach((fn) => fn && fn());
    this._handlers = [];

    this._uploadInput = null;
    this._fileLabel = null;
    this._progressbar = null;
  }
}
