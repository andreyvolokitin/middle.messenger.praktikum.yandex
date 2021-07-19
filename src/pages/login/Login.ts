import Router from '../../utils/router/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import Auth from '../../modules/auth';
import { Input, Button } from '../../components';
import template from './login.tpl';
import { LOGIN_PATHNAME } from '../../shared/const/pathnames';
import store from '../../store/storeInstance';

class Login extends Block {
  static template = template;

  static deps = { Page, Auth, Input, Button };

  static title = 'Вход';
}

const router = new Router();

router.use(LOGIN_PATHNAME, Login, () => store.getState());

export default Login;
