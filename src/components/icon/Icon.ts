import Block from '../../modules/block';
import template from './icon.tpl';

interface IconProps extends Props {
  name: string;
  scale?: number | string;
  class?: string;
}

export default class Icon extends Block {
  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: IconProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }

  static template = template;
}
