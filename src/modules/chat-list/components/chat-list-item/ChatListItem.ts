import Block from '../../../block';
import ChatPreview from '../../../components/chat-preview';
import template from './chat-list-item.tpl';

interface ChatListItemProps extends Props {
  data: ChatData;
  selected: boolean;
}

export default class ChatListItem extends Block {
  static template = template;

  static deps = { ChatPreview };

  storeSelectors = [`/chats/${this.key}/selected`];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatListItemProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
