import Block from '../block';
import { Button, Input } from '../../components';
import template from './auth.tpl';

import Validator from '../../utils/Validator';
import addEventListener from '../../utils/addEventListener';

interface AuthProps extends Props {
  heading: string;
}

export default class Auth extends Block {
  static TEMPLATE = template;

  static DEPS = { Button, Input };

  public form: HTMLFormElement;

  public validator: Validator;

  private _handlers: (() => void)[];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: AuthProps, children: Children) {
    super(props, children);

    this.form = this.element.querySelector('.js-auth__form') as HTMLFormElement;
    this.validator = new Validator(this.form);

    this._handlers = [
      addEventListener(this.form, 'submit', (e) => {
        e.preventDefault();

        const filledEntries = [...new FormData(this.form)].filter((entry) => entry[1]);

        console.log(Object.fromEntries(filledEntries));
      }),
    ];
  }

  destroy(): void {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];
  }
}
