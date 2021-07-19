import Router from '../../utils/router/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import NetworkError from '../../components/network-error';
import template from './page-500.tpl';
import store from '../../store/storeInstance';

class Page500 extends Block {
  static template = template;

  static deps = { Page, NetworkError };

  static title = 'Ошибка сервера';
}

const router = new Router();

router.use('/500', Page500, () => store.getState());

export default Page500;
