import AuthAPI from '../../api/AuthAPI';
import toggleSpinner from '../../utils/toggleSpinner';
import Router from '../../utils/router/Router';
import { ROOT_PATHNAME } from '../../shared/const/pathnames';
import STORAGE_KEY from '../../shared/const/storageKey';
import store from '../../store/storeInstance';

const router = new Router();

export default class AuthController {
  authAPI: AuthAPI;

  constructor() {
    this.authAPI = new AuthAPI();
  }

  async signup(user: UserSignupData, actionElem?: HTMLElement): Promise<void> {
    toggleSpinner(actionElem);

    try {
      await this.authAPI.create(user);

      const userData = await this.getAuthorizedUser();

      store.dispatch('PROFILE_LOAD', userData);
      window.localStorage.removeItem(STORAGE_KEY);
      router.go(ROOT_PATHNAME, null, true);
    } catch (e) {
      alert(`Ошибка, попробуйте ещё раз. \n${e}`);
    } finally {
      toggleSpinner(actionElem);
    }
  }

  async login(user: UserLoginData, actionElem?: HTMLElement): Promise<void> {
    toggleSpinner(actionElem);

    try {
      await this.authAPI.update(user);

      const userData = await this.getAuthorizedUser();

      store.dispatch('PROFILE_LOAD', userData);
      router.go(ROOT_PATHNAME, null, true);
    } catch (e) {
      alert(`Ошибка, попробуйте ещё раз. \n${e}`);
    } finally {
      toggleSpinner(actionElem);
    }
  }

  async getAuthorizedUser(actionElem?: HTMLElement): Promise<UserData | null> {
    toggleSpinner(actionElem);

    try {
      return await this.authAPI.request();
    } catch (e) {
      return null;
    } finally {
      toggleSpinner(actionElem);
    }
  }
}
