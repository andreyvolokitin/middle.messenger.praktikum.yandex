import Block from '../block';
import ChatPreview from '../components/chat-preview';
import template from './chat-list.tpl';

interface ChatListProps extends Props {
  chats: Record<string, unknown>[];
}

export default class ChatList extends Block {
  static TEMPLATE = template;

  static DEPS = { ChatPreview };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatListProps) {
    super(props);
  }
}
