import AuthAPI from '../../api/AuthAPI';
import UserAPI from '../../api/UserAPI';
import toggleSpinner from '../../utils/toggleSpinner';
import Router from '../../utils/router/Router';
import { LOGIN_PATHNAME, PROFILE_PATHNAME } from '../../shared/const/pathnames';
import store from '../../store/storeInstance';

const router = new Router();

export default class ProfileController {
  authAPI: AuthAPI;

  userAPI: UserAPI;

  constructor() {
    this.authAPI = new AuthAPI();
    this.userAPI = new UserAPI();
  }

  async logout(actionElem?: HTMLElement): Promise<void> {
    toggleSpinner(actionElem);

    try {
      await this.authAPI.logout();
      router.go(LOGIN_PATHNAME);
      store.reset();
    } catch (e) {
      alert(`Неудачно, попробуйте ещё раз. \n${e}`);
    } finally {
      toggleSpinner(actionElem);
    }
  }

  async setAvatar(avatarFormData: FormData, actionElem: HTMLElement): Promise<boolean> {
    toggleSpinner(actionElem);

    try {
      const { avatar } = await this.userAPI.updateAvatar(avatarFormData);

      store.dispatch('PROFILE_AVATAR_SET', { avatar });
      return true;
    } catch (e) {
      alert(`Ошибка, попробуйте ещё раз. \n${e}`);
      return false;
    } finally {
      toggleSpinner(actionElem);
    }
  }

  async setProfile(profileData: ProfileData, actionElem: HTMLElement): Promise<boolean> {
    toggleSpinner(actionElem);

    try {
      const user = await this.userAPI.update(profileData);

      store.dispatch('PROFILE_LOAD', user);
      router.go(PROFILE_PATHNAME);
      return true;
    } catch (e) {
      alert(`Ошибка, попробуйте ещё раз. \n${e}`);
      return false;
    } finally {
      toggleSpinner(actionElem);
    }
  }

  async setPassword(passwordData: UserPasswordData, actionElem: HTMLElement): Promise<boolean> {
    toggleSpinner(actionElem);

    try {
      await this.userAPI.updatePassword(passwordData);
      router.go(PROFILE_PATHNAME);
      return true;
    } catch (e) {
      alert(`Ошибка, попробуйте ещё раз. \n${e}`);
      return false;
    } finally {
      toggleSpinner(actionElem);
    }
  }
}
