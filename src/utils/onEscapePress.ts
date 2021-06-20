import addEventListener from './addEventListener';

export default function onEscapePress(cb: () => unknown): () => void {
  return addEventListener(document, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cb();
    }
  });
}
