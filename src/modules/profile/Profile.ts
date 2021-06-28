import Block from '../block';
import UploadAvatar from '../upload-avatar';
import Modal from '../../components/modal';
import Avatar from '../../components/avatar';
import Input from '../../components/input';
import Button from '../../components/button';
import template from './profile.tpl';

import Validator from '../../utils/Validator';

interface ProfileProps extends Props {
  user: Record<string, unknown>;
  edit?: string;
}

export default class Profile extends Block {
  static TEMPLATE = template;

  static DEPS = { Avatar, Input, Button, Modal, UploadAvatar };

  public form: HTMLFormElement;

  public validator: Validator;

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: ProfileProps) {
    super(props);

    this.form = this.element.querySelector('.js-profile__form') as HTMLFormElement;
    this.validator = new Validator(this.form);
  }
}
