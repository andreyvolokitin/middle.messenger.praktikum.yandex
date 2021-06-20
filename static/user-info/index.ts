import UserInfo from '../../src/pages/user-info';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((xhr: XMLHttpRequest) => {
  const data = JSON.parse(xhr.response);

  const userInfo = new UserInfo({
    userData: data.user,
  });

  mountInto('body', userInfo.element);
});
