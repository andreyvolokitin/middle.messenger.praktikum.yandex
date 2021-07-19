import Router from '../../utils/router/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import Auth from '../../modules/auth';
import { Input, Button } from '../../components';
import template from './signup.tpl';
import { SIGNUP_PATHNAME } from '../../shared/const/pathnames';
import store from '../../store/storeInstance';

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

const router = new Router();

router.use(SIGNUP_PATHNAME, Signup, () => store.getState());

export default Signup;
