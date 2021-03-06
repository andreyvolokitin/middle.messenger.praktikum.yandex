import Block from '../../modules/block';
import Img from '../img';
import template from './media.tpl';

interface MediaProps extends Props {
  url: string;
  width: string;
  height: string;
  type?: string;
  class?: string;
}

export default class Media extends Block {
  static template = template;

  static deps = { Img };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MediaProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
