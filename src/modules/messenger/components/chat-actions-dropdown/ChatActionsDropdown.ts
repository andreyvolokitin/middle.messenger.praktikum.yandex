import Block from '../../../block';
import template from './chat-actions-dropdown.tpl';
import { Dropdown, Button } from '../../../../components';

interface ChatActionsDropdownProps extends Props {
  user: UserData;
  currentChat: ChatData;
}

export default class ChatActionsDropdown extends Block {
  static template = template;

  static deps = { Button, Dropdown };

  storeSelectors = ['/currentChat', '/user'];

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props: ChatActionsDropdownProps, ...rest: [Children?, BlockParams?]) {
    super(props, ...rest);
  }
}
