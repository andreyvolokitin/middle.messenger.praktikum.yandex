import UserInfo from '../../src/pages/user-info';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((data: Record<string, unknown>) => {
  console.time('user-info');

  const userInfo = new UserInfo({
    userData: data.user as Record<string, unknown>,
  });
  console.timeEnd('user-info');

  mountInto('body', userInfo.element);
});
