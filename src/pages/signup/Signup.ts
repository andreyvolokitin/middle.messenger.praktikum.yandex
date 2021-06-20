import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './signup.tpl';

interface SignupProps extends Props {
  [key: string]: unknown;
}

export default class Signup extends Block {
  static TEMPLATE = template;

  static DEPS = { Page };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: SignupProps) {
    super(props);
  }
}
