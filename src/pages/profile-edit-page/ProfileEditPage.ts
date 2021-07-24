import Block from '../../modules/block';
import Page from '../../layout/page';
import Profile from '../../modules/profile';
import template from './profile-edit-page';

class ProfileEditPage extends Block {
  static template = template;

  static deps = { Page, Profile };

  static title = 'Редактирование данных';
}

export default ProfileEditPage;
