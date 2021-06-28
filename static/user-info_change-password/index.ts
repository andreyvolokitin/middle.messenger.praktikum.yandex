import UserInfoChangePassword from '../../src/pages/user-info_change-password';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((data: Record<string, unknown>) => {
  const userInfoChangePassword = new UserInfoChangePassword({
    userData: data.user as Record<string, unknown>,
  });

  mountInto('body', userInfoChangePassword.element);
});
