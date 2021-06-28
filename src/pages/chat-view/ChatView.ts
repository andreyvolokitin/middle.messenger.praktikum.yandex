import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './chat-view.tpl';
import Messenger from '../../layout/messenger';
import { Button, Input, Dropdown, Modal } from '../../components';

interface ChatViewProps extends Props {
  chats: Record<string, unknown>[];
  currentChat: Record<string, unknown>;
}

export default class ChatView extends Block {
  static TEMPLATE = template;

  static DEPS = { Page, Messenger, Modal, Dropdown, Button, Input };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatViewProps) {
    super(props);
  }
}
