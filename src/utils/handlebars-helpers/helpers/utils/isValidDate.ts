/**
 * Проверить валидность даты, возвращаемой через `new Date()`
 * @param date - инстанс `new Date()`
 * @returns {boolean|boolean}
 */
export default function isValidDate(date: Date): boolean {
  return !Number.isNaN(+date);
}
