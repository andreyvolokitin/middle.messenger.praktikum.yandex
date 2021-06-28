import Block from '../../modules/block';
import template from './time.tpl';

interface TimeProps extends Props {
  value: string;
  class?: string;
}

export default class Time extends Block {
  static TEMPLATE = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: TimeProps) {
    super(props);
  }
}
