import Block from '../../../block';
import { Avatar, Media, File, Time, Link } from '../../../../components';
import template from './message.tpl';

interface MessageProps extends Props {
  data: MessageData;
  user: UserData;
  class?: string;
}

export default class Message extends Block {
  static template = template;

  static deps = { Avatar, Time, Media, File, Link };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: MessageProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
