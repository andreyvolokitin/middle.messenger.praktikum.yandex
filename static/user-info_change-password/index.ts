import UserInfoChangePassword from '../../src/pages/user-info_change-password';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((xhr: XMLHttpRequest) => {
  const data = JSON.parse(xhr.response);

  const userInfoChangePassword = new UserInfoChangePassword({
    userData: data.user,
  });

  mountInto('body', userInfoChangePassword.element);
});
