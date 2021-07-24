import Block from '../../modules/block';
import Button from '../button';
import template from './modal.tpl';
import addEventListener from '../../utils/addEventListener';
import onEscapePress from '../../utils/onEscapePress';

const MODAL_CLASS = 'js-modal';
const VISIBLE_CLASS = 'is-visible';

const instances = new WeakMap();

interface ModalProps extends Props {
  id: string;
  heading?: string;
  class?: string;
}

export default class Modal extends Block {
  static template = template;

  static deps = { Button };

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ModalProps, children: Children, params?: BlockParams) {
    super(props, children, params);
  }

  init() {
    this._handlers = [
      addEventListener(this.element, 'click', (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest(`.${MODAL_CLASS}__close, [data-cancel]`)) {
          this.close();
        }
      }),
      onEscapePress(() => this.close()),
    ];
    instances.set(this.element, this);
  }

  toggle(force?: boolean) {
    const isOpened = this.element.classList.toggle(VISIBLE_CLASS, force);

    if (isOpened) {
      this.element.focus();
    }
  }

  open(): void {
    this.element.classList.add(VISIBLE_CLASS);
  }

  close(): void {
    this.element.classList.remove(VISIBLE_CLASS);
    this.reset();
  }

  reset(): void {
    this.element.querySelectorAll('form').forEach((form) => form.reset());
  }

  destroy(): void {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];
  }
}

document.addEventListener('click', (e) => {
  if (!e.target) {
    return;
  }

  const target = e.target as HTMLElement;
  const modalTrigger = target.closest(`.${MODAL_CLASS}-trigger`) as HTMLElement;

  if (modalTrigger) {
    e.preventDefault();
    const modal = document.querySelector(modalTrigger.dataset.target as string) as HTMLElement;

    instances.get(modal).open();
  }
});
