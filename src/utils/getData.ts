import Http from './Http';

const http = new Http();

export default function getData(): Promise<XMLHttpRequest | ErrorEvent> {
  return http.get('/assets/data.json');
}
