import Block from '../../../block';
import template from './message-list.tpl';
import MessageListItem from '../message-list-item';

function getCurrentChatId(props: Props) {
  const currentChat = props.currentChat as ChatData;

  if (!currentChat) {
    return 'unknown';
  }

  return currentChat.id;
}

interface MessageListProps extends Props {
  data: MessageData[];
  user: UserData;
}

export default class MessageList extends Block {
  static template = template;

  static deps = { MessageListItem };

  storeSelectors = [() => `/messages/${getCurrentChatId(this.props)}/*`];

  getBaseKey = () => getCurrentChatId(this.props);

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessageListProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);

    this.list = {
      listName: 'data',
      componentName: 'MessageListItem',
      comparator(a, b) {
        return a.id !== b.id || a.chatId !== b.chatId;
      },
    };
  }

  init() {
    this.listElem = this.element;
  }

  destroy() {
    (this.listElem as Nullable<HTMLElement>) = null;
  }
}
