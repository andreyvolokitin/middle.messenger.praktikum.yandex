import Block from '../block';
import { Button, Input } from '../../components';
import template from './auth.tpl';

import addEventListener from '../../utils/addEventListener';
import Validator from '../../utils/Validator';
import AuthController from './AuthController';

interface AuthProps extends Props {
  heading: string;
}

export default class Auth extends Block {
  static template = template;

  static deps = { Button, Input };

  public form: HTMLFormElement;

  public validator: Validator;

  controller: AuthController;

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: AuthProps, children: Children, params?: BlockParams) {
    super(props, children, params);
    this.controller = new AuthController();
  }

  init(): void {
    this.form = this.element.querySelector('.js-auth__form') as HTMLFormElement;
    this.validator = new Validator(this.form);

    this._handlers = [
      addEventListener(this.form, 'submit', (e) => {
        const { action } = this.form.dataset;

        e.preventDefault();

        if (!this.validator.valid || (action !== 'signup' && action !== 'login')) {
          return;
        }

        const data = Object.fromEntries([...new FormData(this.form)].filter((entry) => entry[1]));
        const spinElem = (this.form.querySelector('button[type="submit"]') ||
          this.form) as HTMLElement;

        this.controller[action](data as UserSignupData, spinElem);
      }),
    ];
  }

  destroy(): void {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];
  }
}
