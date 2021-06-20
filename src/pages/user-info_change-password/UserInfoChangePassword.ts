import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './user-info_change-password.tpl';

interface UserInfoChangePasswordProps extends Props {
  userData: Record<string, unknown>;
  [key: string]: unknown;
}

export default class UserInfoChangePassword extends Block {
  static TEMPLATE = template;

  static DEPS = { Page };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: UserInfoChangePasswordProps) {
    super(props);
  }
}
