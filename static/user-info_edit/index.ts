import UserInfoEdit from '../../src/pages/user-info_edit';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((xhr: XMLHttpRequest) => {
  const data = JSON.parse(xhr.response);

  const userInfoEdit = new UserInfoEdit({
    userData: data.user,
  });

  mountInto('body', userInfoEdit.element);
});
