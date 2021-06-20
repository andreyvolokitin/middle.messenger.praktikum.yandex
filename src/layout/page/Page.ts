import Block from '../../modules/block';
import * as components from '../../components';
import * as modules from '../../modules';
import Messenger from '../messenger';
import template from './page.tpl';

interface PageProps extends Props {
  centered?: boolean | string;
  scroll?: boolean | string;
  backURL?: string;
}

export default class Page extends Block {
  static TEMPLATE = template;

  static DEPS = { ...components, ...modules, Messenger };

  // определить конструктор, чтобы явно указать набор свойств
  // eslint-disable-next-line no-useless-constructor
  constructor(props?: PageProps, children?: hbs.AST.Program) {
    super(props, children);
  }
}
