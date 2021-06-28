import Block from '../../modules/block';
import template from './input.tpl';

interface InputProps extends Props {
  wrapperClass?: string;
  class?: string;
  theme?: string;
  display?: string;
  area?: unknown;
  float?: unknown;
  hint?: string;
  name?: string;
  id?: string;
  autocomplete?: unknown;
  value?: string;
  type?: string;
  disabled?: unknown;
  fixed?: unknown;
  attrs?: string;
}

export default class Input extends Block {
  static TEMPLATE = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: InputProps) {
    super(props);
  }
}
