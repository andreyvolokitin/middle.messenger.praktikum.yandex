import helpers from '../helpers';
import API_BASE from '../../../shared/const/apiBase';

/**
 * Вернуть полный URL ресурса
 */
helpers.resourceURL = function resourceURL(path: string): string {
  if (typeof path !== 'string') {
    return '';
  }

  return `${API_BASE}/resources${path}`;
};
