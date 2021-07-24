import EventBus from '../utils/EventBus';
import isObjectOrArray from '../utils/isObjectOrArray';
import debounce from '../utils/debounce';
import STORAGE_KEY from '../shared/const/storageKey';
import cloneDeep from '../utils/cloneDeep';
import isArray from '../utils/isArray';
import getObjectValue from '../utils/getObjectValue';
import trim from '../utils/trim';

const STORE_UPDATE_EVENT = 'update';
const isProxified = Symbol('isProxified');

type ChangedPropMeta = {
  type: 'set' | 'delete';
  target: StateBranch;
  targetPath: string;
  prop: string;
  value?: ParsedJSON;
};

export default class Store {
  private static _instance: Store;

  private _eventBus: EventBus;

  private _listeners: WeakMap<
    (newState: StateTree, matchedSelector: string) => unknown,
    (changedPropMeta: ChangedPropMeta) => unknown
  >;

  private readonly _initialState: StateTree;

  public state: StateTree;

  private _rawStateClone: Nullable<StateTree>;

  private _actions: Record<string, (data: ParsedJSON, state: StateTree) => unknown>;

  constructor(actions = {}, initialState: StateTree = {}) {
    if (Store._instance) {
      return Store._instance;
    }

    this._eventBus = new EventBus();
    this._listeners = new WeakMap();
    this._eventBus.on(STORE_UPDATE_EVENT, debounce(0, this._onUpdate.bind(this), true));
    this._eventBus.on(STORE_UPDATE_EVENT, debounce(0, this._saveState.bind(this)));
    this._initialState = initialState;
    this.state = this._getInitialState();
    this._actions = actions;
    this._rawStateClone = null;
    Store._instance = this;
  }

  private _getInitialState() {
    return this._proxifyDeep(cloneDeep(this._initialState) as StateTree) as StateTree;
  }

  private _getProxy(objectOrArray: StateTree | StateBranch) {
    const that = this;

    return new Proxy(objectOrArray, {
      set(target, prop: string, value: ParsedJSON): boolean {
        let finalValue = value;

        // eslint-disable-next-line
        //@ts-ignore: https://github.com/microsoft/TypeScript/issues/1863
        if (isObjectOrArray(value) && !value[isProxified]) {
          (finalValue as StateBranch) = that._proxifyDeep(
            value,
            // eslint-disable-next-line
            //@ts-ignore: непонятно как типизировать нечисловое свойство массива (__path__)
            `${target.__path__ || ''}/${isArray(target) ? String(value.id) : prop}`
          );
        }

        const operationResult = Reflect.set(target, prop, finalValue);

        // eslint-disable-next-line
        //@ts-ignore: https://github.com/microsoft/TypeScript/issues/1863
        if ((!value || !value[isProxified]) && !(isArray(target) && prop === 'length')) {
          that._eventBus.trigger(STORE_UPDATE_EVENT, {
            type: 'set',
            target,
            get targetPath() {
              return this.target.__path__ || '';
            },
            prop,
            value,
          });
        }

        return operationResult;
      },
      deleteProperty(target, prop) {
        const operationResult = Reflect.deleteProperty(target, prop);

        that._eventBus.trigger(STORE_UPDATE_EVENT, {
          type: 'delete',
          target,
          get targetPath() {
            return this.target.__path__ || '';
          },
          prop,
        });

        return operationResult;
      },
      get(target, prop) {
        if (prop === isProxified) {
          return true;
        }

        return Reflect.get(target, prop);
      },
    });
  }

  private _proxifyDeep(state: StateTree | StateBranch, rootPath = '') {
    const proxy = this._getProxy(state);
    // eslint-disable-next-line
    //@ts-ignore: непонятно как типизировать нечисловое свойство массива (__path__)
    const statePath = state.__path__;
    const parentPath = statePath || rootPath;

    if (!statePath && rootPath) {
      Object.defineProperty(state, '__path__', {
        value: rootPath,
        writable: true,
      });
    }

    Object.entries(proxy).forEach(([key, value]) => {
      // eslint-disable-next-line
      //@ts-ignore: https://github.com/microsoft/TypeScript/issues/1863
      if (!isObjectOrArray(value) || value[isProxified]) {
        return;
      }

      Object.defineProperty(value, '__path__', {
        value: `${parentPath}/${isArray(proxy) ? Reflect.get(proxy, key).id : key}`,
        writable: true,
      });

      Reflect.set(proxy, key, this._proxifyDeep(value));
    });

    return proxy;
  }

  private _onUpdate() {
    this._rawStateClone = null;
  }

  private _saveState() {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
  }

  dispatch(action: string, payload: ParsedJSON): void {
    if (typeof this._actions[action] !== 'function') {
      return;
    }

    this._actions[action](payload, this.state);
  }

  private _matchSelector(selector: string, changedPath: string, ignoreSelectors: string[]) {
    if (ignoreSelectors.some((item) => changedPath.startsWith(item))) {
      return false;
    }

    const ignoreRoot = /\*!$/.test(selector);

    const watchFullSubtree = /\*\*!?$/.test(selector);
    const watchOneLevel = /\/\*!?$/.test(selector);
    const watchPropOnly = /\w$/.test(selector);

    const selectorTrimmed = trim(selector, '/*!');
    const changedPathTrimmed = trim(changedPath, '/');

    const selectorPathLength = selectorTrimmed.split('/').length;
    const changedPathLength = changedPathTrimmed.split('/').length;
    const isEqualPaths = changedPathTrimmed === selectorTrimmed;
    const startsWithSelector = changedPathTrimmed.startsWith(selectorTrimmed);

    if (watchFullSubtree) {
      return ignoreRoot ? startsWithSelector && !isEqualPaths : startsWithSelector;
    }

    if (watchOneLevel) {
      const changeDepth = changedPathLength - selectorPathLength;

      return ignoreRoot
        ? startsWithSelector && changeDepth === 1
        : startsWithSelector && (changeDepth === 0 || changeDepth === 1);
    }

    if (watchPropOnly) {
      return isEqualPaths;
    }

    return false;
  }

  private _getSelector(selector: string | (() => string)) {
    return typeof selector === 'function' ? selector() : selector;
  }

  subscribe(
    handler: (newState: StateTree, matchedSelector: string) => unknown,
    selectors: (string | (() => string))[],
    ignoreSelectors: (string | (() => string))[]
  ): void {
    const listener = (changedPropMeta: ChangedPropMeta) => {
      const { targetPath, prop } = changedPropMeta;

      selectors.forEach((sel) => {
        const selector = this._getSelector(sel);

        if (
          !this._matchSelector(
            selector,
            `${targetPath}/${prop}`,
            ignoreSelectors.map((item) => this._getSelector(item))
          )
        ) {
          return;
        }

        const trimmedSelector = trim(selector, '/*!');
        const subtreeClone = cloneDeep(
          getObjectValue(this.state, trimmedSelector, '/', (target, propName) => {
            if (isArray(target)) {
              const index = target.findIndex(
                (item: Record<string, unknown>) => item.id === Number(propName)
              );

              return target[index];
            }

            return (target as Record<string, unknown>)[propName];
          })
        );

        const lastSelectorSegment = trimmedSelector.split('/').pop();
        let stateProp = lastSelectorSegment;

        if (!Number.isNaN(Number(lastSelectorSegment))) {
          stateProp = 'data';
        }

        handler(
          {
            [stateProp as string]: subtreeClone,
          } as StateTree,
          selector
        );
      });
    };

    this._eventBus.on(STORE_UPDATE_EVENT, listener);
    this._listeners.set(handler, listener);
  }

  unsubscribe(handler: (newState: StateTree, matchedSelector: string) => unknown): void {
    const listener = this._listeners.get(handler);

    if (listener) {
      this._eventBus.off(STORE_UPDATE_EVENT, listener);
      this._listeners.delete(handler);
    }
  }

  getState(): StateTree {
    if (!this._rawStateClone) {
      this._rawStateClone = cloneDeep(this.state) as StateTree;
    }

    return this._rawStateClone;
  }

  reset(): void {
    Object.assign(this.state, this._getInitialState());
  }
}
