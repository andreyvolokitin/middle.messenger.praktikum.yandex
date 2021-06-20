import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './page-404.tpl';

interface Page404Props extends Props {
  [key: string]: unknown;
}

export default class Page404 extends Block {
  static TEMPLATE = template;

  static DEPS = { Page };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: Page404Props) {
    super(props);
  }
}
