export default class EventBus {
  private readonly _handlers: {
    [key: string]: ((...args: unknown[]) => unknown)[];
  };

  constructor() {
    this._handlers = {};
  }

  on(name: string, handler: () => unknown): void {
    if (!Object.prototype.hasOwnProperty.call(this._handlers, name)) {
      this._handlers[name] = [];
    }

    this._handlers[name].push(handler);
  }

  off(name: string, handler: () => unknown): void {
    if (!Object.prototype.hasOwnProperty.call(this._handlers, name)) {
      throw new Error(`Событие ${name} не существует`);
    }

    this._handlers[name] = this._handlers[name].filter((fn) => fn !== handler);
  }

  trigger(name: string, ...args: unknown[]): void {
    if (!Object.prototype.hasOwnProperty.call(this._handlers, name)) {
      throw new Error(`Событие ${name} не существует`);
    }

    this._handlers[name].forEach((fn) => fn(...args));
  }
}
