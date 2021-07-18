import Block from '../block';
import { Modal, Button } from '../../components';
import template from './profile.tpl';
import ProfileAvatar from './profile-avatar';
import ProfileContent from './profile-content';

import Validator from '../../utils/Validator';
import ProfileController from './ProfileController';
import addEventListener from '../../utils/addEventListener';

interface ProfileProps extends Props {
  user: UserData;
  action?: string;
}

export default class Profile extends Block {
  static template = template;

  static deps = { Modal, Button, ProfileAvatar, ProfileContent };

  storeSelectors = ['/user'];

  public form: HTMLFormElement;

  private _updateAvatarForm: HTMLFormElement;

  public logoutBtn: HTMLButtonElement;

  public validator: Validator;

  public _updateAvatarValidator: Validator;

  controller: ProfileController;

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: ProfileProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }

  init() {
    this.form = this.element.querySelector('.js-profile__form') as HTMLFormElement;
    this._updateAvatarForm = this.element.querySelector(
      '.js-profile-avatar-update'
    ) as HTMLFormElement;
    this.logoutBtn = this.element.querySelector('.js-profile__logout') as HTMLButtonElement;
    this.validator = new Validator(this.form);
    this._updateAvatarValidator = new Validator(this._updateAvatarForm);
    this.controller = new ProfileController();

    this._handlers = [
      addEventListener(this.logoutBtn, 'click', () => this.controller.logout(this.logoutBtn)),
      addEventListener(this.form, 'submit', async (e) => {
        e.preventDefault();

        if (!(this.validator as Validator).valid) {
          return;
        }

        const form = e.target as HTMLFormElement;
        const spinElem = (form.querySelector('button[type="submit"]') || form) as HTMLElement;
        const formEntries = Object.fromEntries([...new FormData(this.form)]);
        let action = 'setProfile';

        if (this.form.dataset.action === 'edit-password') {
          action = 'setPassword';
        }

        // eslint-disable-next-line
        //@ts-ignore: вызов метода через строковое свойство работает везде, кроме здесь. ХЗ что ему надо.
        await this.controller[action](formEntries as ProfileData, spinElem);
      }),
      addEventListener(this._updateAvatarForm, 'submit', async (e) => {
        e.preventDefault();

        if (!(this._updateAvatarValidator as Validator).valid) {
          return;
        }

        const form = e.target as HTMLFormElement;
        const spinElem = (form.querySelector('button[type="submit"]') || form) as HTMLElement;

        const isAvatarUpdated = await this.controller.setAvatar(new FormData(form), spinElem);

        if (isAvatarUpdated) {
          (this.getComponent('profile-avatar-update-modal') as Modal).close();
        }
      }),
    ];
  }

  destroy(): void {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];
  }
}
