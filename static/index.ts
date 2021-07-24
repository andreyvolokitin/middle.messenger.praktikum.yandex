import store from '../src/store/storeInstance';
import Router from '../src/utils/router/Router';
import {
  LOGIN_PATHNAME,
  PROFILE_PATHNAME,
  ROOT_PATHNAME,
  SIGNUP_PATHNAME,
} from '../src/shared/const/pathnames';

import ChatView from '../src/pages/chat-view';
import ProfilePage from '../src/pages/profile-page';
import ProfileEditPage from '../src/pages/profile-edit-page';
import ProfileEditPasswordPage from '../src/pages/profile-edit-password-page';
import Login from '../src/pages/login';
import Signup from '../src/pages/signup';
import Page404 from '../src/pages/page-404';
import Page500 from '../src/pages/page-500';

import RootController from '../src/controllers/RootController';

const rootController = new RootController();
const router = new Router();

router.use(ROOT_PATHNAME, ChatView, () => store.getState());
router.use('/chats/:selectedChatId', ChatView, () => store.getState());
router.use(LOGIN_PATHNAME, Login, () => store.getState());
router.use('/404', Page404, () => store.getState());
router.use('/500', Page500, () => store.getState());
router.use('/profile/edit', ProfileEditPage, () => store.getState());
router.use('/profile/password/edit', ProfileEditPasswordPage, () => store.getState());
router.use(PROFILE_PATHNAME, ProfilePage, () => store.getState());
router.use(SIGNUP_PATHNAME, Signup, () => store.getState());

rootController.boot();
