import store from '../../store/storeInstance';
import trim from '../trim';

const components = new WeakMap();

export default class Route {
  readonly pathname: string;

  pathParams: Record<string, string>;

  private readonly _Component: ComponentConstructor;

  private readonly _getProps: () => Props;

  component: Component | undefined;

  constructor(pathname: string, Component: ComponentConstructor, getProps: () => Props) {
    this.pathname = pathname;
    this.pathParams = {};
    this._Component = Component;
    this._getProps = getProps;
    this.component = components.get(Component);
  }

  match(pathname: string): boolean {
    const segments = trim(this.pathname, '/').split('/');
    const concreteSegments = trim(pathname, '/').split('/');

    if (segments.length !== concreteSegments.length) {
      return false;
    }

    return segments.every(
      (segment, i) => segment === concreteSegments[i] || segment.startsWith(':')
    );
  }

  activate(
    rootSelector: string,
    pathParams: Record<string, string>,
    state: HistoryState = {},
    currentRoute: Route | null
  ): void {
    this.pathParams = pathParams;
    // eslint-disable-next-line
    // @ts-ignore: статические свойства компонент должны быть доступны (this._Component.title)
    document.title = (state && (state.title as string)) || this._Component.title;
    this.component = components.get(this._Component);

    if (!this.component) {
      this.component = new this._Component(Object.assign(this._getProps(), pathParams));
      components.set(this._Component, this.component);
    }

    if (currentRoute && currentRoute.component !== this.component) {
      currentRoute.deactivate();
    }

    this.component.mount(rootSelector);

    // Диспатч в конце очереди, чтобы компонент успел полностью инициализироваться (`init()`-коллбэки используют setTimeout)
    setTimeout(() => {
      store.dispatch('PATH_PARAM_CHANGED', pathParams);
    }, 0);
  }

  deactivate(): void {
    if (this.component) {
      this.component.element.querySelectorAll('form').forEach((form) => form.reset());
      this.component.unmount();
    }
  }
}
