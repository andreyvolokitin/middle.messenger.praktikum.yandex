import Router from '../../utils/router/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import Profile from '../../modules/profile';
import template from './profile-edit-page';
import store from '../../store/storeInstance';

class ProfileEditPage extends Block {
  static template = template;

  static deps = { Page, Profile };

  static title = 'Редактирование данных';
}

const router = new Router();

router.use('/profile/edit', ProfileEditPage, () => store.getState());

export default ProfileEditPage;
