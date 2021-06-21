import UserInfoEdit from '../../src/pages/user-info_edit';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((data: Record<string, unknown>) => {
  const userInfoEdit = new UserInfoEdit({
    userData: data.user as Record<string, unknown>,
  });

  mountInto('body', userInfoEdit.element);
});
