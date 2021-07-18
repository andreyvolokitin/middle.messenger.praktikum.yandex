import Router from '../../utils/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import NetworkError from '../../components/network-error';
import template from './page-404.tpl';
import store from '../../store/storeInstance';

class Page404 extends Block {
  static template = template;

  static deps = { Page, NetworkError };

  static title = 'Страницы нету';
}

const router = new Router();

router.use('/404', Page404, () => store.getState());

export default Page404;
