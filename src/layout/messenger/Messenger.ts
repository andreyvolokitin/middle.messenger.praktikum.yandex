import Block from '../../modules/block';
import { ChatList, Chat } from '../../modules';
import { Button, Input } from '../../components';
import template from './messenger.tpl';
import addEventListener from '../../utils/addEventListener';

const CLOSED_CLASSNAME = 'is-closed';

interface MessengerProps extends Props {
  chats: Record<string, unknown>[];
  currentChat?: Record<string, unknown>;
}

export default class Messenger extends Block {
  static TEMPLATE = template;

  static DEPS = { ChatList, Chat, Button, Input };

  private _sidebar: Nullable<HTMLDivElement>;

  private _openButton: Nullable<HTMLButtonElement>;

  private _closeButton: Nullable<HTMLButtonElement>;

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessengerProps) {
    super(props);

    this._sidebar = this.element.querySelector('.js-messenger__sidebar') as HTMLDivElement;
    this._openButton = this.element.querySelector(
      '.js-messenger-sidebar-open'
    ) as HTMLButtonElement;
    this._closeButton = this.element.querySelector(
      '.js-messenger__sidebar-close'
    ) as HTMLButtonElement;

    this._handlers = [
      addEventListener(this._openButton, 'click', () => {
        this.toggleSidebar(true);
      }),
      addEventListener(this._closeButton, 'click', () => {
        this.toggleSidebar(false);
      }),
    ];
  }

  toggleSidebar(force: boolean): void {
    (this._sidebar as HTMLDivElement).classList.toggle(CLOSED_CLASSNAME, !force);
  }

  destroy(): void {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];

    this._sidebar = null;
    this._openButton = null;
    this._closeButton = null;
  }
}
