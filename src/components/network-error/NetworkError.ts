import Block from '../../modules/block';
import Button from '../button';
import template from './network-error.tpl';

interface NetworkErrorProps extends Props {
  type: string;
  clarification: string;
}

export default class NetworkError extends Block {
  static template = template;

  static deps = { Button };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: NetworkErrorProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
