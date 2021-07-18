import Block from '../../block';
import template from './profile-content.tpl';
import { Input, Button } from '../../../components';

interface ProfileContentProps extends Props {
  user: UserData;
  action?: string;
}

export default class ProfileContent extends Block {
  static template = template;

  static deps = { Input, Button };

  storeSelectors = ['/user/**!'];

  ignoreSelectors = ['/user/avatar'];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ProfileContentProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
