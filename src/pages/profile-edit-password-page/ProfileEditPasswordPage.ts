import Router from '../../utils/router/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import Profile from '../../modules/profile';
import template from './profile-edit-password-page.tpl';
import store from '../../store/storeInstance';

class ProfileEditPasswordPage extends Block {
  static template = template;

  static deps = { Page, Profile };

  static title = 'Сменить пароль';
}

const router = new Router();

router.use('/profile/password/edit', ProfileEditPasswordPage, () => store.getState());

export default ProfileEditPasswordPage;
