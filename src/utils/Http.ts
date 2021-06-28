const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as Record<string, string>;

type RequestOptions = {
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  method?: string;
  [key: string]: unknown;
};

function queryURLify(data: Record<string, unknown>) {
  if (Object.prototype.toString.call(data) !== '[object Object]' || !Object.keys(data)) {
    return '';
  }

  return `?${Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(data[key]))}`)
    .join('&')}`;
}

export default class Http {
  get(url: string, options: RequestOptions = {}) {
    const { data, timeout } = options;

    return this.request(
      `${url}${queryURLify(data as Record<string, unknown>)}`,
      { ...options, method: METHODS.GET },
      timeout as number
    );
  }

  post(url: string, options: RequestOptions = {}) {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout as number);
  }

  put(url: string, options: RequestOptions = {}) {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout as number);
  }

  delete(url: string, options: RequestOptions = {}) {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout as number);
  }

  request = (
    url: string,
    options: RequestOptions,
    timeout = 5000
  ): Promise<XMLHttpRequest | ErrorEvent> => {
    const xhr = new XMLHttpRequest();
    const { method = METHODS.GET, headers = {}, data } = options;

    xhr.open(method as string, url);
    Object.keys(headers as Record<string, string>).forEach((key) =>
      xhr.setRequestHeader(key, (headers as Record<string, string>)[key])
    );
    xhr.timeout = timeout;

    return new Promise((resolve, reject) => {
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.onload = () => resolve(xhr);

      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data as Document | BodyInit | null | undefined);
      }
    });
  };
}
