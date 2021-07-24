import Block from '../../block';
import { Avatar, Time, Badge } from '../../../components';
import template from './chat-preview.tpl';

interface ChatPreviewProps extends Props {
  data: ChatData;
  picSize: string;
  tag?: string;
  class?: string;
  compact?: unknown;
  href?: string;
}

export default class ChatPreview extends Block {
  static template = template;

  static deps = { Avatar, Time, Badge };

  storeSelectors = [`/chats/${this.key}/**!`];

  ignoreSelectors = [`/chats/${this.key}/selected`];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatPreviewProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
