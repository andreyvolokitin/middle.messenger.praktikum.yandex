import Block from '../../modules/block';
import template from './badge.tpl';

interface BadgeProps extends Props {
  value: string;
  class?: string;
}

export default class Badge extends Block {
  static TEMPLATE = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: BadgeProps) {
    super(props);
  }
}
