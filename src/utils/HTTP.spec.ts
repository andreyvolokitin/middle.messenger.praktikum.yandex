/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import HTTP from './HTTP';
import '../shared/patchNodeGlobalForTests';

describe('HTTP', function () {
  const endpoint = 'https://httpbin.org';
  const http = new HTTP(endpoint);

  it('should have correct "ok" property value', async () => {
    const { ok: ok400 } = await http.get('/status/400');
    const { ok: ok200 } = await http.get('/status/200');

    expect(ok400).to.equal(false);
    expect(ok200).to.equal(true);
  });

  it('should set headers correctly', async () => {
    const response = await http.get('/headers', {
      headers: {
        'X-Custom-Header': 'value',
      },
    });
    const body = JSON.parse(response.body as string);

    expect(body.headers['X-Custom-Header']).to.equal('value');
  });

  it('should reset headers', async () => {
    const anotherHttp = new HTTP(endpoint, {
      headers: {
        'X-Custom-Header': 'value',
      },
    });

    const response = await anotherHttp.get('/get', {}, true);
    const body = JSON.parse(response.body as string);

    expect(body.headers['X-Custom-Header']).to.equal(undefined);
  });

  it('should perform GET correctly', async () => {
    const response = await http.get('/get?param=value');
    const body = JSON.parse(response.body as string);

    expect(response.statusText).to.equal('OK');
    expect(body.args.param).to.equal('value');
  });

  it('should perform POST correctly', async () => {
    const response = await http.post('/post');

    expect(response.statusText).to.equal('OK');
  });

  it('should perform PUT correctly', async () => {
    const response = await http.put('/put');

    expect(response.statusText).to.equal('OK');
  });

  it('should perform DELETE correctly', async () => {
    const response = await http.delete('/delete');

    expect(response.statusText).to.equal('OK');
  });
});
