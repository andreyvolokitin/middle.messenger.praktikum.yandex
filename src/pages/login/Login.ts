import Block from '../../modules/block';
import Page from '../../layout/page';
import Auth from '../../modules/auth';
import { Input, Button } from '../../components';
import template from './login.tpl';

class Login extends Block {
  static template = template;

  static deps = { Page, Auth, Input, Button };

  static title = 'Вход';
}

export default Login;
