import './css/main.scss';

import store from './store/storeInstance';
import Router from './utils/router/Router';
import {
  LOGIN_PATHNAME,
  PROFILE_PATHNAME,
  ROOT_PATHNAME,
  SIGNUP_PATHNAME,
} from './shared/const/pathnames';

import ChatView from './pages/chat-view';
import ProfilePage from './pages/profile-page';
import ProfileEditPage from './pages/profile-edit-page';
import ProfileEditPasswordPage from './pages/profile-edit-password-page';
import Login from './pages/login';
import Signup from './pages/signup';
import Page404 from './pages/page-404';
import Page500 from './pages/page-500';

import RootController from './controllers/RootController';

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
