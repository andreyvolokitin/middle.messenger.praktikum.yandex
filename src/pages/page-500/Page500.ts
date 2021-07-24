import Block from '../../modules/block';
import Page from '../../layout/page';
import NetworkError from '../../components/network-error';
import template from './page-500.tpl';

class Page500 extends Block {
  static template = template;

  static deps = { Page, NetworkError };

  static title = 'Ошибка сервера';
}

export default Page500;
