import Block from '../../modules/block';
import template from './img.tpl';

interface ImgProps extends Props {
  url: string;
  class?: string;
  width?: string;
  height?: string;
  alt?: string;
}

export default class Img extends Block {
  static template = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ImgProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
