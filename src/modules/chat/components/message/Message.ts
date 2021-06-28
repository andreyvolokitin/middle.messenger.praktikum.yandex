import Block from '../../../block';
import { Avatar, Media, File, Time, Link } from '../../../../components';
import template from './message.tpl';

interface MessageProps extends Props {
  messageData: Record<string, unknown>;
  class?: string;
}

export default class Message extends Block {
  static TEMPLATE = template;

  static DEPS = { Avatar, Time, Media, File, Link };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessageProps) {
    super(props);
  }
}
