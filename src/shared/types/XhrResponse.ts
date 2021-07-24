type XhrResponse = {
  ok: boolean;
  status: number;
  statusText: string;
  headers: Map<string, string>;
  body: XhrResponseBody;
};
