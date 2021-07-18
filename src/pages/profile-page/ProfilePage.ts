import Router from '../../utils/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import { Profile } from '../../modules';
import template from './profile-page.tpl';
import store from '../../store/storeInstance';
import { PROFILE_PATHNAME } from '../../shared/const/pathnames';

class ProfilePage extends Block {
  static template = template;

  static deps = { Page, Profile };

  static title = 'Профиль';
}

const router = new Router();

router.use(PROFILE_PATHNAME, ProfilePage, () => store.getState());

export default ProfilePage;
