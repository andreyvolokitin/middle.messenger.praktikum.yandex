import Block from '../../modules/block';
import template from './link.tpl';

interface LinkProps extends Props {
  text: string;
  href?: string;
  action?: unknown;
  theme?: string;
  attrs?: string;
}

export default class Link extends Block {
  static template = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: LinkProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
