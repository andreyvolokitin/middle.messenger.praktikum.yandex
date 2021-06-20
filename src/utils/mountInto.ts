export default function mountInto(rootSelector: string, DOM: HTMLElement | DocumentFragment): void {
  const root = document.querySelector(rootSelector);

  if (root) {
    root.insertBefore(DOM, root.firstChild);
  }
}
