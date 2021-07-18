import isObjectOrArray from './isObjectOrArray';
import isObject from './isObject';

function stringifyEntry(baseKey: string, val: unknown): string {
  let query;

  if (isObjectOrArray(val)) {
    query = Object.entries(val).reduce((acc, entry, i) => {
      let str = acc;
      const [key, value] = entry;

      str += `${i > 0 ? '&' : ''}${stringifyEntry(`${baseKey}[${key}]`, value)}`;

      return str;
    }, '');
  } else {
    query = `${encodeURIComponent(baseKey)}=${encodeURIComponent(String(val))}`;
  }

  return query;
}

export default function toQueryString(data: Record<string, unknown>): string | never {
  if (!isObject(data)) {
    throw new Error('Входным параметром должен быть объект');
  }

  const keys = Object.keys(data);

  if (!keys.length) {
    return '';
  }

  return `?${keys.map((key) => stringifyEntry(key, data[key])).join('&')}`;
}
