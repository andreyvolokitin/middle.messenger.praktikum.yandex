import Block from '../../modules/block';
import { Button } from '../../components';
import template from './page.tpl';

interface PageProps extends Props {
  centered?: boolean | string;
  scroll?: boolean | string;
  backURL?: string;
}

export default class Page extends Block {
  static TEMPLATE = template;

  static DEPS = { Button };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: PageProps, children?: Children) {
    super(props, children);
  }
}
