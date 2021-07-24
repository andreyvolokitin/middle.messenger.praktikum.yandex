import Block from '../../modules/block';
import { Button } from '../../components';
import template from './page.tpl';

interface PageProps extends Props {
  centered?: string;
  scroll?: string;
  inner?: string;
}

export default class Page extends Block {
  static template = template;

  static deps = { Button };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: PageProps, children?: Children, params?: BlockParams) {
    super(props, children, params);
  }
}
