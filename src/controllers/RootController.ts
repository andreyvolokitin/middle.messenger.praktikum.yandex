import Router from '../utils/router/Router';
import AuthController from '../modules/auth/AuthController';
import { LOGIN_PATHNAME, SIGNUP_PATHNAME, ROOT_PATHNAME } from '../shared/const/pathnames';
import store from '../store/storeInstance';

function isAuthPage(pathname: string) {
  return pathname === SIGNUP_PATHNAME || pathname === LOGIN_PATHNAME;
}

export default class RootController {
  router: Router;

  authController: AuthController;

  constructor() {
    this.router = new Router();
    this.authController = new AuthController();
  }

  async boot(): Promise<void> {
    const user = await this.authController.getAuthorizedUser(document.body);
    const { pathname } = document.location;
    const isAuth = isAuthPage(pathname);

    if (!user && !isAuth) {
      this.router.go(LOGIN_PATHNAME);
    }

    if (user) {
      const state = store.getState();

      if (!state.user || (state.user as UserData).id !== user.id) {
        store.dispatch('PROFILE_LOAD', user);
      }

      if (isAuth) {
        this.router.go(ROOT_PATHNAME, null, true);
      }
    }

    this.router.start();
  }
}
