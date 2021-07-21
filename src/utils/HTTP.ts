import toQueryString from './toQueryString';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as Record<string, string>;

type RequestOptions = {
  headers?: Record<string, string>;
  data?: Record<string, unknown> | string | FormData;
  method?: string;
  withCredentials?: boolean;
  formatJSONKeys?: (val: unknown) => unknown;
  [key: string]: unknown;
};

export default class HTTP {
  private readonly _endpoint: string;

  private readonly _defaults: Record<string, unknown>;

  constructor(endpoint = '', defaults = {}) {
    this._endpoint = endpoint;
    this._defaults = defaults;
  }

  private _getURL(url: string): string {
    return this._endpoint + url;
  }

  get(url: string, options: RequestOptions = {}, resetDefaultHeaders = false) {
    const { data = {}, timeout } = options;

    return this.request(
      `${this._getURL(url)}${toQueryString(data as Record<string, unknown>)}`,
      { ...options, method: METHODS.GET },
      timeout as number,
      resetDefaultHeaders
    );
  }

  post(url: string, options: RequestOptions = {}, resetDefaultHeaders = false) {
    return this.request(
      this._getURL(url),
      { ...options, method: METHODS.POST },
      options.timeout as number,
      resetDefaultHeaders
    );
  }

  put(url: string, options: RequestOptions = {}, resetDefaultHeaders = false) {
    return this.request(
      this._getURL(url),
      { ...options, method: METHODS.PUT },
      options.timeout as number,
      resetDefaultHeaders
    );
  }

  delete(url: string, options: RequestOptions = {}, resetDefaultHeaders = false) {
    return this.request(
      this._getURL(url),
      { ...options, method: METHODS.DELETE },
      options.timeout as number,
      resetDefaultHeaders
    );
  }

  request = (
    url: string,
    options: RequestOptions,
    timeout = 5000,
    resetDefaultHeaders = false
  ): Promise<XhrResponse> => {
    const xhr = new XMLHttpRequest();
    const finalDefaults = { ...this._defaults };

    if (resetDefaultHeaders) {
      delete finalDefaults.headers;
    }

    const {
      method = METHODS.GET,
      headers = {},
      withCredentials = false,
      data,
      formatJSONKeys = (val: unknown) => val,
    } = {
      ...finalDefaults,
      ...options,
    };

    const contentType = headers['content-type'];
    const isJSON = contentType && contentType.includes('application/json');
    let preparedData = data;

    if (isJSON) {
      preparedData = JSON.stringify(formatJSONKeys(data as string));
    }

    xhr.open(method as string, url);
    Object.keys(headers as Record<string, string>).forEach((key) =>
      xhr.setRequestHeader(key, (headers as Record<string, string>)[key])
    );
    xhr.withCredentials = withCredentials;
    xhr.timeout = timeout;

    return new Promise((resolve, reject) => {
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onload = () => {
        resolve({
          ok: xhr.status < 300 && xhr.status > 199,
          status: xhr.status,
          statusText: xhr.statusText,
          body: xhr.response,
          headers: new Map(
            xhr
              .getAllResponseHeaders()
              .toLowerCase()
              .split('\n')
              .map((header) => header.split(':')) as Array<[string, string]>
          ),
        });
      };

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(preparedData as Document | BodyInit | null | undefined);
      }
    });
  };
}
