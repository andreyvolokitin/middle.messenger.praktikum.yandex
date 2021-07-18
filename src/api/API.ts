import HTTP from '../utils/HTTP';
import API_BASE from '../shared/const/apiBase';

type ApiResponse =
  | {
      [key: string]: unknown;
    }
  | string;
type ApiErrorResponse = {
  reason: string;
};

export default class API {
  public http: HTTP;

  constructor() {
    // eslint-disable-next-line
    // @ts-ignore: статические свойства детей должны быть доступны (this.constructor.endpoint)
    this.http = new HTTP(`${API_BASE}${this.constructor.endpoint}`, {
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
      },
    });
  }

  parseJSON<T = ParsedJSON>(json: string): T {
    try {
      return JSON.parse(json);
    } catch (e) {
      throw new Error(`Ошибка парсинга ответа сервера (${e.message.toLowerCase()})`);
    }
  }

  processResponse<T = ApiResponse>(response: XhrResponse): T {
    let parsed: unknown;
    const contentType = response.headers.get('content-type');
    const isJSON = contentType && contentType.includes('application/json');

    if (isJSON) {
      parsed = this.parseJSON(response.body as string) as T;
    }

    if (!response.ok) {
      throw new Error(
        `Запрос невалиден (${isJSON ? (parsed as ApiErrorResponse).reason : response.statusText})`
      );
    }

    return (isJSON ? parsed : response.body) as T;
  }

  create(_arg: unknown): unknown {
    throw new Error('Метод не определён');
  }

  request(_arg: unknown): unknown {
    throw new Error('Метод не определён');
  }

  update(_arg: unknown): unknown {
    throw new Error('Метод не определён');
  }

  delete(_arg: unknown): unknown {
    throw new Error('Метод не определён');
  }
}

export { API_BASE };
