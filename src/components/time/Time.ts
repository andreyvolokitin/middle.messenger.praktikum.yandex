import Block from '../../modules/block';
import template from './time.tpl';

interface TimeProps extends Props {
  value: string;
  raw: string;
  class?: string;
}

export default class Time extends Block {
  static template = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: TimeProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
