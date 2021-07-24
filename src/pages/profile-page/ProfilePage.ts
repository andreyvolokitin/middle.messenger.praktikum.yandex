import Block from '../../modules/block';
import Page from '../../layout/page';
import { Profile } from '../../modules';
import template from './profile-page.tpl';

class ProfilePage extends Block {
  static template = template;

  static deps = { Page, Profile };

  static title = 'Профиль';
}

export default ProfilePage;
