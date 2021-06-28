import Block from '../../block';
import { Avatar, Time, Badge } from '../../../components';
import template from './chat-preview.tpl';

interface ChatPreviewProps extends Props {
  chatData: Record<string, unknown>;
  picSize: string;
  tag?: string;
  class?: string;
  compact?: unknown;
  href?: string;
}

export default class ChatPreview extends Block {
  static TEMPLATE = template;

  static DEPS = { Avatar, Time, Badge };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatPreviewProps) {
    super(props);
  }
}
