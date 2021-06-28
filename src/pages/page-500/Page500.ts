import Block from '../../modules/block';
import Page from '../../layout/page';
import NetworkError from '../../components/network-error';
import template from './page-500.tpl';

interface Page500Props extends Props {
  [key: string]: unknown;
}

export default class Page500 extends Block {
  static TEMPLATE = template;

  static DEPS = { Page, NetworkError };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: Page500Props) {
    super(props);
  }
}
