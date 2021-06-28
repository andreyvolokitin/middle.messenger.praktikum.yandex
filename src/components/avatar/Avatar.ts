import Block from '../../modules/block';
import Img from '../img';
import template from './avatar.tpl';

interface AvatarProps extends Props {
  url: string;
  tag?: string;
  class?: string;
  theme?: string;
  size?: string;
  width?: string;
  height?: string;
  href?: string;
}

export default class Avatar extends Block {
  static TEMPLATE = template;

  static DEPS = { Img };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: AvatarProps) {
    super(props);
  }
}
