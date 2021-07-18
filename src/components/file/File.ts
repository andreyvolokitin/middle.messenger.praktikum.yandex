import Block from '../../modules/block';
import template from './file.tpl';

interface FileProps extends Props {
  url: string;
  size: string;
  name: string;
  type?: string;
  class?: string;
  tag?: string;
}

export default class File extends Block {
  static template = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: FileProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
