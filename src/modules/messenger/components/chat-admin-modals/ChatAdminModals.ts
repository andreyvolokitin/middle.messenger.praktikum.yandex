import Block from '../../../block';
import template from './chat-admin-modals.tpl';
import { Modal, Input, Button } from '../../../../components';

interface ChatAdminModalsProps extends Props {
  user: UserData;
  currentChat: ChatData;
}

export default class ChatAdminModals extends Block {
  static template = template;

  static deps = { Input, Button, Modal };

  storeSelectors = ['/currentChat'];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatAdminModalsProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
