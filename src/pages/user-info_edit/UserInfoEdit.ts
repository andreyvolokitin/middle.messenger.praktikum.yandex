import Block from '../../modules/block';
import Page from '../../layout/page';
import Profile from '../../modules/profile';
import template from './user-info_edit.tpl';

interface UserInfoEditProps extends Props {
  userData: Record<string, unknown>;
  [key: string]: unknown;
}

export default class UserInfoEdit extends Block {
  static TEMPLATE = template;

  static DEPS = { Page, Profile };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: UserInfoEditProps) {
    super(props);
  }
}
