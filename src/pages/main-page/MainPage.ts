import store from '../../store/storeInstance';
import Router from '../../utils/router/Router';
import Block from '../../modules/block';
import Page from '../../layout/page';
import Messenger from '../../modules/messenger';
import template from './main-page.tpl';
import { ROOT_PATHNAME } from '../../shared/const/pathnames';

class MainPage extends Block {
  static template = template;

  static deps = { Page, Messenger };

  static title = 'Ваши чаты';
}

const router = new Router();

router.use(ROOT_PATHNAME, MainPage, () => store.getState());

export default MainPage;
