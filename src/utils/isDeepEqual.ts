import isObjectOrArray from './isObjectOrArray';
import isArray from './isArray';

export default function isDeepEqual(a: unknown, b: unknown): boolean {
  if (!isObjectOrArray(a) || !isObjectOrArray(b)) {
    throw new Error('Аргументы должны быть JSON-совместимыми структурами (объект/массив)');
  }

  const entriesA = Object.entries(a);
  const entriesB = Object.entries(b);

  if (entriesA.length !== entriesB.length) {
    return false;
  }

  return entriesA.every(([keyA, valueA]) => {
    const valueB = isArray(b) ? b[Number(keyA)] : b[keyA];

    if (isObjectOrArray(valueA) && isObjectOrArray(valueB)) {
      return isDeepEqual(valueA, valueB);
    }

    return Object.is(valueA, valueB);
  });
}
