import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './chat-view.tpl';
import Messenger from '../../modules/messenger';
import Router from '../../utils/router/Router';
import store from '../../store/storeInstance';
import { ROOT_PATHNAME } from '../../shared/const/pathnames';

class ChatView extends Block {
  static template = template;

  static deps = { Page, Messenger };

  static title = 'Чат';
}

const router = new Router();

router.use(ROOT_PATHNAME, ChatView, () => store.getState());
router.use('/chats/:selectedChatId', ChatView, () => store.getState());

export default ChatView;
