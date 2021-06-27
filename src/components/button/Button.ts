import Block from '../../modules/block';
import Icon from '../icon';
import template from './button.tpl';

interface ButtonProps extends Props {
  tag?: string;
  class?: string;
  theme?: string;
  display?: string;
  type?: string;
  tabindex?: string;
  href?: string;
  title?: string;
  disabled?: unknown;
  attrs?: string;
  icon?: string;
  iconScale?: number | string;
  text?: string;
}

export default class Button extends Block {
  static TEMPLATE = template;

  static DEPS = { Icon };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: ButtonProps, children?: hbs.AST.Program) {
    super(props, children);
  }
}
