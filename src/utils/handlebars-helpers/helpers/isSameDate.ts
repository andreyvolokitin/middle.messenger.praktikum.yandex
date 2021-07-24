import helpers from '../helpers';
import isValidDate from './utils/isValidDate';

/**
 * Форматировать дату в виде строки в фомате ISO 8601 (ГГГГ-ММ-ДД)
 * @param date - инстанс `new Date()`
 * @returns {string} - форматированная дата
 */
function dateToISO8601(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

/**
 * Handlebars helper. Выяснить, равны ли две даты (время не учитывается)
 * @param a - дата в виде, валидном для передачи в `new Date()`
 * @param b - дата в виде, валидном для передачи в `new Date()`
 * @returns {boolean}
 */

helpers.isSameDate = function isSameDate(a: number | string, b: number | string): boolean {
  if (arguments.length !== 3) {
    throw new Error('Передайте 2 даты');
  }

  const date1 = new Date(a);
  const date2 = new Date(b);
  const isDate1Valid = isValidDate(date1);
  const isDate2Valid = isValidDate(date2);
  const isSingleDateInvalid =
    [date1, date2].some((date) => isValidDate(date)) && (!isDate1Valid || !isDate2Valid);

  if (isSingleDateInvalid) {
    throw new Error('Минимум 1 из 2х переданных дат должна представлять валидную дату');
  }

  return dateToISO8601(date1) === dateToISO8601(date2);
};
