import Block from '../../block';
import template from './profile-avatar.tpl';
import { Avatar } from '../../../components';

interface ProfileAvatarProps extends Props {
  avatar: string;
}

export default class ProfileAvatar extends Block {
  static template = template;

  static deps = { Avatar };

  storeSelectors = ['/user/avatar'];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ProfileAvatarProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
