import helpers from '../helpers';
import isValidDate from './utils/isValidDate';

/**
 * date.toJSON() => читаемая дата
 */
helpers.formatJsonDate = function formatJsonDate(value: string): string {
  const date = new Date(value);
  const isToday = date.toDateString() === new Date().toDateString();

  if (!value || !isValidDate(date)) {
    return '';
  }

  return isToday
    ? `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
    : `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};
