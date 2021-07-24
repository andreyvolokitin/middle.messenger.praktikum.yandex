import Block from '../../modules/block';
import Page from '../../layout/page';
import NetworkError from '../../components/network-error';
import template from './page-404.tpl';

class Page404 extends Block {
  static template = template;

  static deps = { Page, NetworkError };

  static title = 'Страницы нету';
}

export default Page404;
