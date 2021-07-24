import Block from '../../modules/block';
import Page from '../../layout/page';
import Profile from '../../modules/profile';
import template from './profile-edit-password-page.tpl';

class ProfileEditPasswordPage extends Block {
  static template = template;

  static deps = { Page, Profile };

  static title = 'Сменить пароль';
}

export default ProfileEditPasswordPage;
