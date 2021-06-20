import helpers from '../helpers';

/**
 * Вернуть имя файла по его пути (`/path/to/file.ext` => file.ext)
 */
helpers.filename = function filename(path: string): string {
  if (typeof path !== 'string') {
    throw new Error('Путь должен быть задан строкой');
  }

  const segments = path.split('/');

  if (segments.length) {
    return (segments.pop() as string).trim();
  }

  return path.trim();
};
