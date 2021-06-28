import Block from '../../modules/block';
import Page from '../../layout/page';
import Auth from '../../modules/auth';
import { Input, Button } from '../../components';
import template from './index-page.tpl';

interface IndexPageProps extends Props {
  [key: string]: unknown;
}

export default class IndexPage extends Block {
  static TEMPLATE = template;

  static DEPS = { Page, Auth, Input, Button };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: IndexPageProps) {
    super(props);
  }
}
