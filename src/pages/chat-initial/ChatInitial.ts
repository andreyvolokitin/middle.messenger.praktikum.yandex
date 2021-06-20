import Block from '../../modules/block';
import Page from '../../layout/page';
import template from './chat-initial.tpl';

interface ChatInitialProps extends Props {
  chats: Record<string, unknown>[];
}

export default class ChatInitial extends Block {
  static TEMPLATE = template;

  static DEPS = { Page };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatInitialProps) {
    super(props);
  }
}
