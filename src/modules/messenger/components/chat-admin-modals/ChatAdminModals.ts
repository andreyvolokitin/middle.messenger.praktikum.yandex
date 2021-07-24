import Block from '../../../block';
import template from './chat-admin-modals.tpl';
import { Modal, Input, Button } from '../../../../components';
import Validator from '../../../../utils/Validator';
import addEventListener from '../../../../utils/addEventListener';
import MessengerController from '../../../../controllers/MessengerController';

interface ChatAdminModalsProps extends Props {
  user: UserData;
  currentChat: ChatData;
}

export default class ChatAdminModals extends Block {
  static template = template;

  static deps = { Input, Button, Modal };

  storeSelectors = ['/currentChat'];

  controller: MessengerController;

  private _addUserForm: Nullable<HTMLFormElement>;

  private _deleteUserForm: Nullable<HTMLFormElement>;

  private _addUserValidator: Nullable<Validator>;

  private _deleteUserValidator: Nullable<Validator>;

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatAdminModalsProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);

    this.controller = new MessengerController();
  }

  init() {
    this._addUserForm = this.element.querySelector('.js-add-user') as HTMLFormElement;
    this._deleteUserForm = this.element.querySelector('.js-delete-user') as HTMLFormElement;
    this._addUserValidator = new Validator(this._addUserForm);
    this._deleteUserValidator = new Validator(this._deleteUserForm);

    this._handlers = [
      addEventListener(this.element, 'submit', async (e) => {
        const form = e.target as HTMLFormElement;
        const isAddUser = form === this._addUserForm;
        const isDeleteUser = form === this._deleteUserForm;

        if (!isAddUser && !isDeleteUser) {
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
  }

  destroy() {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];

    (this._addUserValidator as Validator).destroy();
    (this._deleteUserValidator as Validator).destroy();

    this._addUserValidator = null;
    this._deleteUserValidator = null;

    this._addUserForm = null;
    this._deleteUserForm = null;
    this._addUserValidator = null;
    this._deleteUserValidator = null;
  }
}
