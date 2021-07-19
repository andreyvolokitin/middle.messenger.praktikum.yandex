import Block from '../block';
import { ChatList, Chat } from '../index';
import { Button, Input, Dropdown, Modal } from '../../components';
import template from './messenger.tpl';
import addEventListener from '../../utils/addEventListener';
import MessengerController from '../../controllers/MessengerController';
import Validator from '../../utils/Validator';
import ChatActionsDropdown from './components/chat-actions-dropdown';
import ChatAdminModals from './components/chat-admin-modals';

const OPEN_CLASSNAME = 'is-open';
const CHAT_SELECTED_CLASSNAME = 'is-chat-selected';

interface MessengerProps extends Props {
  user: UserData;
}

export default class Messenger extends Block {
  static template = template;

  static deps = {
    ChatList,
    Chat,
    Button,
    Input,
    Dropdown,
    Modal,
    ChatActionsDropdown,
    ChatAdminModals,
  };

  storeSelectors = ['/currentChat', '/user'];

  static storeReaction = 'event';

  controller: MessengerController;

  private _sidebar: Nullable<HTMLDivElement>;

  private _chatListContainer: Nullable<HTMLElement>;

  private _chatContainer: Nullable<HTMLElement>;

  private _closeButton: Nullable<HTMLButtonElement>;

  private _createChatForm: Nullable<HTMLFormElement>;

  private _addUserForm: Nullable<HTMLFormElement>;

  private _deleteUserForm: Nullable<HTMLFormElement>;

  private _createChatValidator: Nullable<Validator>;

  private _addUserValidator: Nullable<Validator>;

  private _deleteUserValidator: Nullable<Validator>;

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessengerProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
    console.log(this);
  }

  init(): void {
    this.controller = new MessengerController();
    this._sidebar = this.element.querySelector('.js-messenger__sidebar') as HTMLDivElement;
    this._chatListContainer = this.element.querySelector(
      '.js-messenger__chatlist-container'
    ) as HTMLElement;
    this._chatContainer = this.element.querySelector('.js-messenger__chat') as HTMLElement;
    this._closeButton = this.element.querySelector(
      '.js-messenger__sidebar-close'
    ) as HTMLButtonElement;
    this._createChatForm = document.querySelector('.js-create-chat') as HTMLFormElement;
    this._addUserForm = document.querySelector('.js-add-user') as HTMLFormElement;
    this._deleteUserForm = document.querySelector('.js-delete-user') as HTMLFormElement;
    this._createChatValidator = new Validator(this._createChatForm);
    this._addUserValidator = new Validator(this._addUserForm);
    this._deleteUserValidator = new Validator(this._deleteUserForm);

    this._handlers = [
      addEventListener(this.element, 'store-update', (e: CustomEvent) => {
        const { selector, state } = e.detail;
        const currentChatId = state.currentChat && state.currentChat.id;

        switch (selector) {
          case '/currentChat':
            this.toggleSelectedChatMode(!!state.currentChat);
            this.toggleSidebar(false);
            setTimeout(() => {
              this.controller.requestMessages(currentChatId, this._chatContainer as HTMLElement);
            }, 0);
            break;
          case '/user':
            if (state.user) {
              this.controller.setChats(state.user, this._chatListContainer as HTMLElement);
            } else {
              this.controller.killSockets();
            }
            break;
          default:
            break;
        }
      }),
      addEventListener(this.element, 'click', (e) => {
        const openBtn = (e.target as HTMLElement).closest('.js-messenger-sidebar-open');

        if (openBtn) {
          this.toggleSidebar(true);
        }
      }),
      addEventListener(this._closeButton, 'click', () => this.toggleSidebar(false)),
      addEventListener(this.element, 'submit', async (e) => {
        const form = e.target as HTMLFormElement;
        const isAddUser = form === this._addUserForm;
        const isDeleteUser = form === this._deleteUserForm;

        if (!isAddUser || !isDeleteUser) {
          return;
        }

        e.preventDefault();

        if (
          !(this._addUserValidator as Validator).valid ||
          !(this._deleteUserValidator as Validator).valid
        ) {
          return;
        }

        const data = new FormData(form);
        const spinElem = (form.querySelector('button[type="submit"]') || form) as HTMLElement;
        let action;

        if (isAddUser) {
          action = 'add';
        }

        if (isDeleteUser) {
          action = 'delete';
        }

        const wasOk = await this.controller.manageUser(
          {
            user: {
              login: data.get(`${action}-user`) as string,
            },
            chatId: Number(form.dataset.chat),
          },
          action as 'add' | 'delete',
          spinElem
        );

        if (wasOk) {
          (this.getComponent(`${action}-user-modal`) as Modal).close();
        }
      }),
      addEventListener(this._createChatForm, 'submit', async (e) => {
        e.preventDefault();

        if (!(this._createChatValidator as Validator).valid) {
          return;
        }

        const form = e.target as HTMLFormElement;
        const spinElem = (form.querySelector('button[type="submit"]') || form) as HTMLElement;

        const isChatCreated = await this.controller.createChat(new FormData(form), spinElem);

        if (isChatCreated) {
          (this.getComponent('chat-create-modal') as Modal).close();
        }
      }),
      addEventListener(this.element, 'submit', async (e) => {
        const form = e.target as HTMLFormElement;
        const isDeleteChatForm = form.matches('.js-delete-chat');

        if (!isDeleteChatForm) {
          return;
        }

        e.preventDefault();

        const spinElem = (form.querySelector('button[type="submit"]') || form) as HTMLElement;
        const isChatDeleted = await this.controller.deleteChat(
          {
            chatId: Number(form.dataset.chat),
          },
          spinElem
        );

        if (isChatDeleted) {
          (this.getComponent('delete-chat-modal') as Modal).close();
        }
      }),
    ];

    this.controller.setChats(this.props.user as UserData, this._chatListContainer);
  }

  toggleSidebar(force: boolean): void {
    (this._sidebar as HTMLDivElement).classList.toggle(OPEN_CLASSNAME, force);
  }

  toggleSelectedChatMode(force: boolean): void {
    (this._sidebar as HTMLDivElement).classList.toggle(CHAT_SELECTED_CLASSNAME, force);
  }

  destroy(): void {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];

    this._sidebar = null;
    this._closeButton = null;
    this._chatListContainer = null;
    this._chatContainer = null;
    this._createChatForm = null;
    this._addUserForm = null;
    this._deleteUserForm = null;
    this._createChatValidator = null;
    this._addUserValidator = null;
    this._deleteUserValidator = null;
  }
}
