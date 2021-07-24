import Block from '../../../block';
import { Time } from '../../../../components';
import Message from '../message';
import template from './message-list-item.tpl';

interface MessageListItemProps extends Props {
  data: Record<string, unknown>;
}

export default class MessageListItem extends Block {
  static template = template;

  static deps = { Time, Message };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessageListItemProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }

  componentDidMount(_props: Props) {
    this.element.scrollIntoView();
  }
}
