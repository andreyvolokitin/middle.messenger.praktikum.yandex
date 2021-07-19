import Route from './Route';
import sanitize from '../sanitize';
import isDeepEqual from '../isDeepEqual';

type RouterOptions = {
  hook: string;
  root: string;
};

export default class Router {
  private static _instance: Router;

  public routes: Route[];

  public options: RouterOptions;

  private _currentRoute: Route | null;

  private _isStarted: boolean;

  constructor(
    options: RouterOptions = {
      hook: '[data-router]',
      root: 'body',
    }
  ) {
    if (Router._instance) {
      return Router._instance;
    }

    this.routes = [];
    this._currentRoute = null;
    this._isStarted = false;
    this.options = options;

    Router._instance = this;
  }

  private _getPathParams(routePathnam: string, concretePathname: string): Record<string, string> {
    const concreteSegments = concretePathname.split('/');

    return routePathnam.split('/').reduce((total, segment, i) => {
      const result = total;

      if (segment.startsWith(':')) {
        result[segment.slice(1)] = sanitize(concreteSegments[i]);
      }

      return result;
    }, {} as Record<string, string>);
  }

  private _handleRoute(pathname: string, state?: HistoryState): void {
    const route = this.getRoute(pathname);

    if (!route) {
      window.history.replaceState({}, '', '/404');
      this._handleRoute('/404');
      return;
    }

    const pathParams = this._getPathParams(route.pathname, pathname);
    const isSameRoute = this._currentRoute === route;
    const isPathParamsChanged = !isDeepEqual(route.pathParams, pathParams);

    if (isSameRoute && !isPathParamsChanged) {
      return;
    }

    route.activate(this.options.root, pathParams, state, this._currentRoute);
    this._currentRoute = route;
  }

  use(
    pathname: string,
    Component: ComponentConstructor,
    getProps: () => Props = () => ({})
  ): Router {
    if (this.getRoute(pathname)) {
      throw new Error('Роут уже определён');
    }

    this.routes.push(new Route(pathname, Component, getProps));
    return this;
  }

  getRoute(pathname: string): Route {
    return this.routes.filter((route) => route.match(pathname))[0];
  }

  start(): void {
    if (this._isStarted) {
      return;
    }

    window.addEventListener('popstate', ({ state }) => {
      this._handleRoute(document.location.pathname, state);
    });
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const hook = target && (target.closest(this.options.hook) as HTMLElement);

      if (!hook) {
        return;
      }

      e.preventDefault();

      const { action } = hook.dataset;
      const pathname = (hook as HTMLAnchorElement).pathname || hook.dataset.pathname;

      switch (action) {
        case 'back':
          this.back();
          break;
        default:
          this.go(pathname);
      }
    });
    this._handleRoute(document.location.pathname, window.history.state);
    this._isStarted = true;
  }

  go(pathname = '/', state: HistoryState = null, replaceState = false): void {
    const action = replaceState ? 'replaceState' : 'pushState';

    window.history[action](state, '', pathname);
    this._handleRoute(pathname, state);
  }

  back(): void {
    window.history.back();
  }

  forward(): void {
    window.history.forward();
  }
}
