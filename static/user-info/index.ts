import UserInfo from '../../src/pages/user-info';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((data: Record<string, unknown>) => {
  const userInfo = new UserInfo({
    userData: data.user as Record<string, unknown>,
  });

  mountInto('body', userInfo.element);
});
