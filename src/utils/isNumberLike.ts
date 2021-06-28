export default function isNumberLike(value: unknown): boolean {
  if (typeof value === 'number') {
    return !Number.isNaN(value);
  }

  if (typeof value === 'string' && value.trim().length) {
    return Number.isFinite(Number(value));
  }

  return false;
}
