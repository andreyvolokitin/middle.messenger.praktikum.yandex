import Block from '../../../block';
import template from './message-list-closer.tpl';

interface MessageListCloserProps extends Props {
  messages: Record<string, unknown>[];
}

export default class MessageListCloser extends Block {
  static template = template;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessageListCloserProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
