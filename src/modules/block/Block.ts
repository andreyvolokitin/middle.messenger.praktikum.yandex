import Handlebars from '@andreyvolokitin/handlebars.js';

import EventBus from '../../utils/EventBus';
import PartialsVisitor from './utils/PartialsVisitor';
import debounce from '../../utils/debounce';
import addEventListener from '../../utils/addEventListener';
import capitalize from '../../utils/capitalize';
import toCase from '../../utils/toCase';
import isObject from '../../utils/isObject';
import isDeepEqual from '../../utils/isDeepEqual';
import getObjectValue from '../../utils/getObjectValue';
import mergeObjects from '../../utils/mergeObjects';
import cloneDeep from '../../utils/cloneDeep';
import '../../utils/handlebars-helpers';
import store from '../../store/storeInstance';

import { COMPONENT_CLASSNAME, COMPONENT_COPY_SUFFIX } from './const';

function partialToComponentName(partialName: string) {
  return capitalize(toCase(partialName, 'kebab', 'camel'));
}

export default class Block {
  props: Props;

  protected _rawProps: Props;

  private _oldProps: Props;

  private _isSilent: boolean;

  private _isStoreUpdate: boolean;

  readonly componentsMap: WeakMap<HTMLElement, Block>;

  readonly components: Record<string, Block>;

  readonly _parent?: Block;

  private static readonly EVENTS = {
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_SCU: 'flow:should-component-update',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_CWU: 'flow:component-will-unmount',
  };

  static readonly deps = {};

  static storeReaction = 'props';

  private readonly _eventBus: EventBus;

  private readonly _children?: Children;

  private readonly _ast: hbs.AST.Program;

  private readonly _partials: PartialMetadata[];

  private _initialHTML: string;

  private _tplElement: HTMLTemplateElement;

  private _element: HTMLElement;

  protected listElem: HTMLElement;

  private _eventHandlers: (() => unknown)[];

  private _storeListener: (newState: StateTree, matchedSelector: string) => unknown;

  isMounted: boolean;

  protected _isDisposed: boolean;

  protected list?: {
    listName: string;
    componentName: string;
    comparator?: (a: Record<string, unknown>, b: Record<string, unknown>) => boolean;
    position?: 'append' | 'prepend';
  };

  protected key?: string;

  protected getBaseKey?: () => string | number;

  protected alias?: string;

  protected storeSelectors?: (string | (() => string))[];

  protected ignoreSelectors?: (string | (() => string))[];

  constructor(
    props: Props = {
      events: {},
    },
    children?: Children,
    params: BlockParams = {}
  ) {
    const { parent, key, alias } = params;

    // сделать локальную статическую копию
    this._rawProps = cloneDeep(props, {
      usePrototype: 'collect',
    }) as Props;
    this.props = this._proxifyProps(this._rawProps);
    this._children = children;
    this._parent = parent;
    this.key = key;
    this.alias = alias;

    const { partials, ast } = this._preprocess();

    this._ast = ast;
    this._partials = partials;
    this._initialHTML = this.render();
    this.componentsMap = new WeakMap();
    this.components = {};
    this._eventHandlers = [];
    this._eventBus = new EventBus();
    this.isMounted = false;
    this._isDisposed = false;
    this._isSilent = false;

    this._componentize();
    this._registerEvents();
    this._createResources();
    this._render(this._initialHTML);

    // подождать инициализации свойств детей
    setTimeout(() => {
      const { storeSelectors, ignoreSelectors = [] } = this;

      if (storeSelectors) {
        this._storeListener = this._storeHook.bind(this);
        store.subscribe(this._storeListener, storeSelectors, ignoreSelectors);
      }
    }, 0);
  }

  /**
   * Создать AST шаблона. Собрать метаданные partials, использующихся в шаблоне.
   * Обработать и вернуть AST и метаданные (детали указаны в описании класса `PartialsVisitor`)
   * todo: делать это статически при компиляции проекта
   */
  private _preprocess(): {
    ast: hbs.AST.Program;
    partials: PartialMetadata[];
  } {
    // eslint-disable-next-line
    // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.template)
    const ast = Handlebars.parseWithoutProcessing(this.constructor.template);
    const partialsVisitor = new PartialsVisitor(this._children && this._children.ast, true);

    partialsVisitor.accept(ast);

    return { ast, partials: partialsVisitor.partials };
  }

  private _instantiateChild(
    ChildComponent: ComponentConstructor,
    options: {
      childMeta: PartialMetadata;
      parentPropsDescriptors?: Record<string, PropertyDescriptor>;
      iteratedSource?: Record<string, unknown>[];
      iterationIndex?: number;
      reiterated?: boolean;
    }
  ): Block {
    const {
      childMeta,
      parentPropsDescriptors = Object.getOwnPropertyDescriptors(this.props),
      iteratedSource,
      iterationIndex,
      reiterated,
    } = options;
    const { params, alias, iterated, children } = childMeta;
    let iteratedData;

    // Передать детям свойства шаблона-родителя (кроме спец-свойств)
    // todo: передавать только используемые детьми свойства
    delete parentPropsDescriptors.events;
    const childProps: Props = {
      __parent: Object.create(this.props.__parent || Object.prototype, parentPropsDescriptors),
    };
    let finalChildProps = childProps;
    let childrenObj: Children | undefined;

    Object.defineProperties(finalChildProps, Object.getOwnPropertyDescriptors(params));

    if (children) {
      childrenObj = {
        ast: children,
        dependencies: {
          // eslint-disable-next-line
          // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.deps)
          ...this.constructor.deps,
          ...(this._children && this._children.dependencies),
        },
      };
    }

    if (iterated && iteratedSource && typeof iterationIndex === 'number') {
      iteratedData = iteratedSource[iterationIndex];
      finalChildProps = cloneDeep(childProps) as Props;

      if (finalChildProps.__parent) {
        finalChildProps.__parent[iterated.param] = iteratedSource[iterationIndex];
      }
    }

    const finalAlias =
      typeof iterationIndex === 'number'
        ? `${alias}${COMPONENT_COPY_SUFFIX}${iterationIndex}${reiterated ? '+' : ''}`
        : alias;
    const instance = new ChildComponent(
      finalChildProps,
      childrenObj,
      // eslint-disable-next-line
      // @ts-ignore: раздуплить тайпскрипт о наличии третьего аргумента, явно описанного во всех компонентах
      {
        parent: this,
        // если элемент не итерируется, использовать ключ итерируемого родителя
        key: iteratedData
          ? `${this.getBaseKey ? this.getBaseKey() : ''}${iteratedData.id}`
          : this.key,
        alias: finalAlias,
      }
    );

    this.componentsMap.set(instance.element, instance);
    this.components[finalAlias] = instance;

    return instance;
  }

  /**
   * Создать компонент для каждого partial, присутствующего в разметке
   */
  private _componentize(): void {
    const thisPropsDescriptors = Object.getOwnPropertyDescriptors(this.props);
    delete thisPropsDescriptors.events;

    this._partials.forEach((meta) => {
      const componentName = partialToComponentName(meta.name);
      const Component =
        // eslint-disable-next-line
        // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.deps)
        this.constructor.deps[componentName] ||
        (this._children && this._children.dependencies[componentName]);

      if (!Component) {
        const parentDepsMSg = `или зависимостях родителя (${this._parent!.constructor.name}.deps)`;

        throw new Error(
          `Компонент "${
            this.constructor.name
          }" использует компонент "${componentName}", не указанный в
          его зависимостях (${this.constructor.name}.deps) ${this._parent ? parentDepsMSg : ''}

          Обычно это происходит при передаче произвольной разметки через @partial-block.
          Убедитесь, что указали все возможные зависимости, либо что не передаёте в качестве детей компоненты,
          не предусмотренные для передачи в этот компонент.
          `
        );
      }

      if (meta.iterated) {
        const iteratedAliasPrefix = `${meta.alias}${COMPONENT_COPY_SUFFIX}`;
        const iteratedSource = getObjectValue(this.props, meta.iterated.source) as Record<
          string,
          unknown
        >[];

        [...this._initialHTML.matchAll(new RegExp(`${iteratedAliasPrefix}(\\d+)`, 'gm'))].forEach(
          (match) => {
            const iterationIndex = Number(match[1]);

            this._instantiateChild(Component, {
              parentPropsDescriptors: thisPropsDescriptors,
              childMeta: meta,
              iteratedSource,
              iterationIndex,
            });
          }
        );
      } else {
        this._instantiateChild(Component, {
          parentPropsDescriptors: thisPropsDescriptors,
          childMeta: meta,
        });
      }
    });
  }

  private _registerEvents(): void {
    this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_SCU, debounce(0, this._shouldComponentUpdate.bind(this)));
    this._eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    this._eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
  }

  private _createResources(): void {
    this._tplElement = document.createElement('template');
  }

  // eslint-disable-next-line
  private _proxifyProps(props: Props): Props {
    const that = this;

    return new Proxy(props, {
      set(target: Props, prop: string, value: unknown): boolean {
        // eslint-disable-next-line no-param-reassign
        target[prop] = value;

        if (!this._isSilent) {
          that._eventBus.trigger(Block.EVENTS.FLOW_SCU, target);
        }

        return true;
      },
      defineProperty(target: Props, prop: string, descriptor: PropertyDescriptor): boolean {
        Object.defineProperty(target, prop, descriptor);

        if (!this._isSilent) {
          that._eventBus.trigger(Block.EVENTS.FLOW_SCU, target);
        }

        return true;
      },
      deleteProperty() {
        throw new Error('Вы не можете удалить свойство');
      },
    });
  }

  private _traverseComponent(name: string, ancestor: Block = this): Block | undefined {
    let component = ancestor.components[name] as Block | undefined;

    if (!component) {
      const keys = Object.keys(ancestor.components);

      for (let i = 0; i < keys.length; i += 1) {
        component = this._traverseComponent(name, ancestor.components[keys[i]]);

        if (component) {
          break;
        }
      }
    }

    return component;
  }

  private _forAllComponents(cb: (component: Block) => unknown): void {
    Object.entries(this.components).forEach(([_alias, instance]) => {
      cb(instance);
      instance._forAllComponents(cb);
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
    let oldElem = this._element;
    let newElement: HTMLElement;

    this._removeDOMEvents();

    if (!html) {
      this.destroy();
    }

    /**
     * Корень компонента/шаблона должен содержать единый HTML элемент, который вставляется в DOM.
     * Соседний текст (корневой) игнорируется.
     */
    if (fragment.children.length === 1) {
      newElement = fragment.children[0] as HTMLElement;
    } else {
      /**
       * Если элементов несколько (чего не должно быть), или их нет, то всё содержимое фрагмента,
       * включая корневой текст, объединяется дивом
       */
      newElement = document.createElement('div');
      newElement.style.height = '100%';
      newElement.appendChild(fragment);
    }

    let anchor = null;

    const replaceSlot = (slot: HTMLElement) => {
      if (!(slot && slot.parentNode)) {
        return;
      }

      if (oldElem === this.components[slot.id].element) {
        anchor = document.createElement('div');
        anchor.id = `old-elem-anchor_${slot.id}`;
        oldElem.insertAdjacentElement('afterend', anchor);
        oldElem = anchor;
      }

      slot.parentNode.replaceChild(this.components[slot.id].element, slot);

      if (slot === newElement) {
        newElement = this.components[slot.id].element;
      }
    };

    const componentSlots = newElement.querySelectorAll(`.${COMPONENT_CLASSNAME}`);

    componentSlots.forEach(replaceSlot);

    if (!componentSlots.length && newElement.matches(`.${COMPONENT_CLASSNAME}`)) {
      replaceSlot(newElement);
    }

    if (oldElem && oldElem.parentNode) {
      oldElem.parentNode.replaceChild(newElement, oldElem);

      if (this._parent && this._parent._element === oldElem) {
        this._parent._element = newElement;
      }

      (oldElem as Nullable<HTMLElement>) = null;
    }

    this._element = newElement;
    this._addDOMEvents();

    if (!html && this._parent && !this._parent.componentsMap.has(this.element)) {
      this._parent.componentsMap.set(this.element, this);
    }

    // Подождать пока субдерево отредерится (`_shouldComponentUpdate` стоят в debounce-очереди)
    setTimeout(() => {
      if (this._isDisposed) {
        return;
      }

      this.init();

      if (!html) {
        this._eventBus.trigger(Block.EVENTS.FLOW_CDU, this.props);
      }
    }, 0);
  }

  private _renderList(
    deleted: Record<string, unknown>[] = [],
    added: Record<string, unknown>[] = []
  ): void {
    const deletedSelector = deleted.reduce((total, item, i) => {
      let str = total;

      str += `${i > 0 ? ', ' : ''}[data-key="${this.getBaseKey ? this.getBaseKey() : ''}${
        item.id
      }"]`;

      return str;
    }, '');

    if (deleted.length) {
      this.listElem.querySelectorAll(deletedSelector).forEach((elem) => {
        const instance = this.componentsMap.get(elem as HTMLElement);

        if (instance) {
          const keyHolder = elem.closest('[data-key]');

          instance.dispose(false);
          delete this.components[instance.alias as string];

          if (keyHolder) {
            keyHolder.remove();
          }
        }
      });
    }

    if (added.length && this.list) {
      const { componentName, position } = this.list;
      const newFragment = document.createDocumentFragment();
      const partialMetadata = this._partials.find(
        (partial) => partialToComponentName(partial.name) === componentName
      ) as PartialMetadata;

      const thisPropsDescriptors = Object.getOwnPropertyDescriptors(this.props);

      added
        .map((_data, i) =>
          // eslint-disable-next-line
          // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.deps)
          this._instantiateChild(this.constructor.deps[componentName], {
            parentPropsDescriptors: thisPropsDescriptors,
            childMeta: partialMetadata,
            iteratedSource: added,
            iterationIndex: i,
            reiterated: true,
          })
        )
        .forEach((instance) => {
          newFragment.appendChild(instance.element);
          setTimeout(() => instance.setMounted(), 0);
        });

      if (position === 'prepend' && this.listElem.firstChild) {
        this.listElem.insertBefore(newFragment, this.listElem.firstChild);
      } else {
        this.listElem.appendChild(newFragment);
      }
    }

    if (added.length || deleted.length) {
      this._eventBus.trigger(Block.EVENTS.FLOW_CDU, this.props);
    }
  }

  private _storeHook(newState: StateTree, matchedSelector: string) {
    this._isStoreUpdate = true;

    // eslint-disable-next-line
    // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.storeReaction)
    switch (this.constructor.storeReaction) {
      case 'props':
        this.setProps(newState);
        break;

      case 'event':
        // this.setProps(newState, true);
        this.element.dispatchEvent(
          new CustomEvent('store-update', {
            detail: {
              state: newState,
              selector: matchedSelector,
            },
          })
        );
        break;

      default:
        break;
    }
  }

  private _componentDidMount(): void {
    this.componentDidMount(this.props);
  }

  private _shouldComponentUpdate(newProps: Props): void {
    if (!this._oldProps || !newProps) {
      return;
    }

    if (this.shouldComponentUpdate(this._oldProps, newProps)) {
      const { list } = this;

      if (!list || !this._isStoreUpdate) {
        this._render();
        return;
      }

      const { listName } = list;

      const { deleted, added } = this._compareLists(
        (this._oldProps[listName] as Record<string, unknown>[]) || [],
        (newProps[listName] as Record<string, unknown>[]) || []
      );

      if ((deleted && deleted.length) || (added && added.length)) {
        this._renderList(deleted as Record<string, unknown>[], added as Record<string, unknown>[]);
      } else {
        this._render();
      }
    }
  }

  private _componentDidUpdate(): void {
    this._isStoreUpdate = false;
    this.componentDidUpdate(this.props);
  }

  // eslint-disable-next-line
  // @ts-ignore: не считать ошибкой неиспользованную функцию
  private _componentWillUnmount(): void {
    this._removeDOMEvents();
    this.componentWillUnmount();
  }

  private _compareLists(oldList: unknown[], newList: unknown[]) {
    if (!oldList || !newList) {
      return {};
    }

    // eslint-disable-next-line
    // @ts-ignore: свойство существует и объявлено, тайпскрипт тупит.
    let { comparator } = this.list;

    if (!comparator) {
      comparator = (a: Record<string, unknown>, b: Record<string, unknown>) => a.id !== b.id;
    }

    const deleted = oldList.filter((oldElem: Record<string, unknown>) =>
      newList.every((newElem: Record<string, unknown>) => comparator(oldElem, newElem))
    );
    const added = newList.filter((newElem: Record<string, unknown>) =>
      oldList.every((oldElem: Record<string, unknown>) => comparator(oldElem, newElem))
    );

    return { deleted, added };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  init(): void {
    // переопределяется детьми
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  destroy(): void {
    // переопределяется детьми
  }

  setMounted(): void {
    if (this.isMounted) {
      return;
    }

    this.isMounted = true;
    this._eventBus.trigger(Block.EVENTS.FLOW_CDM);
  }

  mount(rootSelector: string): void {
    const root = document.querySelector(rootSelector);

    if (this.isMounted || !root) {
      return;
    }

    root.insertAdjacentElement('afterbegin', this.element);
    this.setMounted();
    this._forAllComponents((component) => component.setMounted());
  }

  unmount(): void {
    if (!this.isMounted) {
      return;
    }

    this._eventBus.trigger(Block.EVENTS.FLOW_CWU);
    this.element.remove();
    this.isMounted = false;
  }

  dispose(deleteFromParent = true): void {
    this.unmount();
    this.destroy();

    if (this._storeListener) {
      store.unsubscribe(this._storeListener);
    }

    if (this._parent && deleteFromParent) {
      this._parent.deleteComponent(this);
    }

    Object.entries(this.components).forEach(([_alias, instance]) => instance.dispose());

    (this.props as Nullable<Props>) = null;
    (this._oldProps as Nullable<Props>) = null;
    (this._element as Nullable<HTMLElement>) = null;
    (this.listElem as Nullable<HTMLElement>) = null;
    (this._tplElement as Nullable<HTMLTemplateElement>) = null;
    (this._children as Nullable<Children>) = null;
    (this._ast as Nullable<hbs.AST.Program>) = null;
    (this._partials as Nullable<PartialMetadata[]>) = null;
    this._initialHTML = '';
    (this.components as Nullable<Record<string, Block>>) = null;
    (this._parent as Nullable<Block>) = null;
    this._eventHandlers = [];
    (this._eventBus as Nullable<EventBus>) = null;

    this._isDisposed = true;
  }

  deleteComponent(instance: Block): void {
    const entries = Object.entries(this.components);

    entries.forEach(([alias, component]) => {
      if (component === instance) {
        delete this.components[alias];
        entries.length = 0;
      }
    });
  }

  // eslint-disable-next-line
  componentDidMount(_props: Props): void {}

  shouldComponentUpdate(_oldProps: Props, _newProps: Props): boolean {
    return !isDeepEqual(_oldProps, _newProps);
  }
  // eslint-disable-next-line
  componentDidUpdate(_props: Props): void {}

  // eslint-disable-next-line
  componentWillUnmount(): void {}

  render(): string {
    return Handlebars.compile(this._ast)(this.props);
  }

  private _saveOldProps(): void {
    this._oldProps = cloneDeep(this.props) as Props;
  }

  private _saveSubtreeOldProps(): void {
    this._saveOldProps();
    this._forAllComponents((component) => component._saveSubtreeOldProps());
  }

  setProps(nextProps: Props, isSilent = false, saveOldProps = true): void {
    if (!nextProps || !Object.keys(nextProps).length) {
      return;
    }

    const shouldUpdateChildren = !this.list || !this._isStoreUpdate;

    this._isSilent = isSilent;

    if (!this._isSilent && saveOldProps) {
      this._saveOldProps();

      if (shouldUpdateChildren) {
        this._forAllComponents((component) => component._saveSubtreeOldProps());
      }
    }

    if (shouldUpdateChildren) {
      const nextPropsForChildren = nextProps;

      // Передать новые свойства детям, кроме спец-свойств
      // todo: передавать только используемые детьми свойства
      delete nextPropsForChildren.events;
      Object.values(this.components).forEach((component) => {
        component.setProps(
          {
            __parent: nextPropsForChildren,
          },
          isSilent,
          false
        );
      });
    }

    mergeObjects(this.props, nextProps);
    this._isSilent = false;
  }

  get element(): HTMLElement {
    return this._element;
  }

  getComponent(name: string): unknown {
    return this._traverseComponent(name);
  }

  show(): void {
    this.element.style.display = 'block';
  }

  hide(): void {
    this.element.style.display = 'none';
  }
}
