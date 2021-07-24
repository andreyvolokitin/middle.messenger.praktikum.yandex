import Block from '../../modules/block';
import Page from '../../layout/page';
import Auth from '../../modules/auth';
import { Input, Button } from '../../components';
import template from './signup.tpl';

interface SignupProps extends Props {
  [key: string]: unknown;
}

class Signup extends Block {
  static template = template;

  static deps = { Page, Auth, Input, Button };

  static title = 'Регистрация';

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: SignupProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}

export default Signup;
