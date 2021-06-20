import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './user-info.tpl';

interface UserInfoProps extends Props {
  userData: Record<string, unknown>;
  [key: string]: unknown;
}

export default class UserInfo extends Block {
  static TEMPLATE = template;

  static DEPS = { Page };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: UserInfoProps) {
    super(props);
  }
}
