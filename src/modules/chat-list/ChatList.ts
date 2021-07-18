import Block from '../block';
import ChatListItem from './components/chat-list-item';
import template from './chat-list.tpl';
import sortPropsList from '../../utils/sortPropsList';

interface ChatListProps extends Props {
  chats: ChatData[];
}

export default class ChatList extends Block {
  static template = template;

  static deps = { ChatListItem };

  storeSelectors = ['/chats/*'];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatListProps, ...rest: [Children?, BlockParams?]) {
    super(sortPropsList(props, 'chats', 'descending'), ...rest);

    this.list = ['chats', ChatListItem, 'prepend'];
  }

  init() {
    this.listElem = this.element.querySelector('.js-chat-list') as HTMLElement;
  }

  destroy() {
    (this.listElem as Nullable<HTMLElement>) = null;
  }
}
