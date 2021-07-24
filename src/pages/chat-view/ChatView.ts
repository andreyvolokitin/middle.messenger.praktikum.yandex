import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './chat-view.tpl';
import Messenger from '../../modules/messenger';

class ChatView extends Block {
  static template = template;

  static deps = { Page, Messenger };

  static title = 'Чат';
}

export default ChatView;
