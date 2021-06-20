import Handlebars from '@andreyvolokitin/handlebars.js';

import EventBus from '../../utils/eventBus';
import PartialsVisitor from './utils/PartialsVisitor';
import debounce from '../../utils/debounce';
import addEventListener from '../../utils/addEventListener';
import capitalize from '../../utils/capitalize';
import kebabToCamel from '../../utils/kebabToCamel';
import isObject from '../../utils/isObject';
import isShallowEqual from '../../utils/isShallowEqual';
import '../../utils/handlebars-helpers';

import { COMPONENT_COPY_SUFFIX } from './const';
import getObjectValue from '../../utils/getObjectValue';

function assignProps(target: Props, props: Props): Props {
  return Object.defineProperties(target, Object.getOwnPropertyDescriptors(props));
}

export default class Block {
  public readonly props: Props;

  public components: Record<string, Block>;

  private static readonly EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_SCU: 'flow:should-component-update',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
  };

  static DEPS = {};

  private _oldProps: Props;

  private readonly eventBus: EventBus;

  private readonly _children?: hbs.AST.Program;

  private readonly _ast: hbs.AST.Program;

  private readonly _partials: PartialMetadata[];

  private readonly _initialHTML: string;

  private _tplElement: HTMLTemplateElement;

  private _element: HTMLElement;

  private _eventHandlers: (() => unknown)[];

  constructor(
    props: Props = {
      events: {},
    },
    children?: hbs.AST.Program
  ) {
    this.props = this._proxifyProps(props);
    this._children = children;

    const { partials, ast } = this._preprocess();

    this._ast = ast;
    this._partials = partials;
    this._initialHTML = this.render();
    this.components = this._componentize();
    this._eventHandlers = [];
    this.eventBus = new EventBus();
    this._init();
  }

  /**
   * Создать AST шаблона. Собрать метаданные partials, использующихся в шаблоне.
   * Обработать и вернуть AST и метаданные (детали указаны в описании класса `PartialsVisitor`)
   */
  private _preprocess(): {
    ast: hbs.AST.Program;
    partials: PartialMetadata[];
  } {
    // eslint-disable-next-line
    // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.TEMPLATE)
    const ast = Handlebars.parseWithoutProcessing(this.constructor.TEMPLATE);
    const partialsVisitor = new PartialsVisitor(this._children, true);

    partialsVisitor.accept(ast);

    return { ast, partials: partialsVisitor.partials };
  }

  /**
   * Создать компонент для каждого partial, присутствующего в разметке
   */
  private _componentize(): Record<string, Block> {
    const components: Record<string, Block> = {};

    this._partials
      .filter(({ alias }) => this._initialHTML.includes(alias as string))
      .forEach(({ name, alias, params, children, iterated }) => {
        const finalProps: Props = {
          // Передать детям свойства шаблона-родителя
          // todo: передавать только используемые детьми свойства
          __parent: Object.create(
            this.props.__parent || {},
            Object.getOwnPropertyDescriptors(this.props)
          ),
        };

        // Не передавать спец-свойства
        delete (finalProps.__parent as Props).events;

        Object.defineProperties(finalProps, Object.getOwnPropertyDescriptors(params));

        const componentName = capitalize(kebabToCamel(name));
        // eslint-disable-next-line
        // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.DEPS)
        const Component = this.constructor.DEPS[componentName];

        if (!Component) {
          throw new Error(
            `Компонент "${this.constructor.name}" использует компонент "${componentName}",
              не указанный в его зависимостях (${this.constructor.name}.DEPS). Обычно это происходит
              при передаче произвольной разметки через @partial-block. Убедитесь, что в ${this.constructor.name}.DEPS,
              перечислены все возможные зависимости, либо что не передаёте в качестве детей компоненты,
              не предусмотренные для передачи в этот компонент.`
          );
        }

        if (iterated) {
          const iteratedAliasPrefix = `${alias}${COMPONENT_COPY_SUFFIX}`;
          const regxp = new RegExp(`${iteratedAliasPrefix}(\\d+)`, 'gm');
          const copies = [...this._initialHTML.matchAll(regxp)];

          copies.forEach((match) => {
            const iteratedIndex = Number(match[1]);

            finalProps.__parent![iterated.param] = (
              getObjectValue(this.props, iterated.source) as unknown[]
            )[iteratedIndex];
            components[`${iteratedAliasPrefix}${iteratedIndex}`] = new Component(
              finalProps,
              children
            );
          });
        } else {
          components[alias] = new Component(finalProps, children);
        }
      });

    return components;
  }

  private _init(): void {
    this._registerEvents();
    this._createResources();
    this._render(this._initialHTML);
    // Позволить коду наледующих классов исполниться/инициализироваться, перед событием маунта
    setTimeout(() => this.eventBus.trigger(Block.EVENTS.FLOW_CDM));
  }

  private _registerEvents(): void {
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_SCU, debounce(0, this._shouldComponentUpdate.bind(this)));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CWU, this._componentDidUpdate.bind(this));
  }

  private _createResources(): void {
    this._tplElement = document.createElement('template');
  }

  // eslint-disable-next-line
  private _proxifyProps(props: Props): Props {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that = this;

    return new Proxy(props, {
      set(target: Props, prop: string, value: unknown): boolean {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;
        that.eventBus.trigger(Block.EVENTS.FLOW_SCU, target);

        return true;
      },
      defineProperty(target: Props, prop: string, descriptor: PropertyDescriptor): boolean {
        Object.defineProperty(target, prop, descriptor);
        that.eventBus.trigger(Block.EVENTS.FLOW_SCU, target);

        return true;
      },
      deleteProperty() {
        throw new Error('Вы не можете удалить свойство');
      },
    });
  }

  private _addDOMEvents(): void {
    const { events } = this.props;

    if (!this._element) {
      return;
    }

    if (events && isObject(events)) {
      // При изменении `props.events` актуальными считаются только вновь установленные события, старые удаляются
      this._removeDOMEvents();
      this._eventHandlers = Object.keys(events).map((name) =>
        addEventListener(this._element, name, events[name])
      );
    }
  }

  private _removeDOMEvents(): void {
    this._eventHandlers.forEach((remove) => remove());
  }

  private _render(html?: string): void {
    this._tplElement.innerHTML = html || this.render();

    const fragment = this._tplElement.content;
    const oldElem = this._element;
    const wasConnected = oldElem && oldElem.isConnected;

    this._removeDOMEvents();

    /**
     * Корень компонента/шаблона должен содержать единый HTML элемент, который вставляется в DOM.
     * Соседний текст (корневой) игнорируется.
     */
    if (fragment.children.length === 1) {
      this._element = fragment.children[0] as HTMLElement;
    } else {
      /**
       * Если элементов несколько (чего не должно быть), или их нет, то всё содержимое фрагмента,
       * включая корневой текст, объединяется дивом
       */
      this._element = document.createElement('div');
      this._element.appendChild(fragment);
    }

    Object.keys(this.components).forEach((name) => {
      const slot =
        this._element.querySelector(`#${name}`) ||
        (this._element.matches(`#${name}`) && this._element);

      if (slot && slot.parentNode) {
        slot.parentNode.replaceChild(this.components[name].element, slot);

        if (slot === this._element) {
          this._element = this.components[name].element;
        }
      }
    });

    if (wasConnected && oldElem.parentNode) {
      oldElem.parentNode.replaceChild(this._element, oldElem);
    }

    this._addDOMEvents();

    if (!html) {
      this.eventBus.trigger(Block.EVENTS.FLOW_CDU, this.props);
    }
  }

  private _componentDidMount(): void {
    this.componentDidMount(this.props);
  }

  private _shouldComponentUpdate(newProps: Props): void {
    if (this.shouldComponentUpdate(this._oldProps, newProps)) {
      this._render();
    }
  }

  private _componentDidUpdate(): void {
    this.componentDidUpdate(this.props);
  }

  // eslint-disable-next-line
  // @ts-ignore: не считать ошибкой неиспользованную функцию
  private _componentWillUnmount(): void {
    this._removeDOMEvents();
    this.componentWillUnmount();
  }

  // eslint-disable-next-line
  componentDidMount(_props: Props): void {}

  // eslint-disable-next-line class-methods-use-this
  shouldComponentUpdate(_oldProps: Props, _newProps: Props): boolean {
    const isPropsShallowEqual = isShallowEqual(_oldProps, _newProps);
    let isParentPropsShallowEqual = true;

    if (_newProps.__parent && _oldProps.__parent) {
      isParentPropsShallowEqual = isShallowEqual(
        _oldProps.__parent as Props,
        _newProps.__parent as Props
      );
    }

    return !isPropsShallowEqual || !isParentPropsShallowEqual;
  }
  // eslint-disable-next-line
  componentDidUpdate(_props: Props): void {}

  // eslint-disable-next-line
  componentWillUnmount(): void {}

  render(): string {
    return Handlebars.compile(this._ast)(this.props);
  }

  setProps(nextProps: Props): void {
    if (!nextProps || !Object.keys(nextProps).length) {
      return;
    }

    this._oldProps = assignProps({}, this.props);

    if (this._oldProps.__parent) {
      this._oldProps.__parent = assignProps({}, this.props.__parent as Props);
    }

    assignProps(this.props, nextProps);

    // Передать новые свойства детям, кроме спец-свойств
    // todo: передавать только используемые детьми свойства
    // eslint-disable-next-line no-param-reassign
    delete nextProps.events;
    Object.keys(this.components).forEach((name) => {
      this.components[name].setProps({
        __parent: assignProps(this.components[name].props.__parent as Props, nextProps),
      });
    });
  }

  get element(): HTMLElement {
    return this._element;
  }

  getChild(name: string): unknown {
    return this.components[name];
  }

  show(): void {
    this.element.style.display = 'block';
  }

  hide(): void {
    this.element.style.display = 'none';
  }
}
