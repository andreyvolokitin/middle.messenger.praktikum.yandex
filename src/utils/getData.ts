import Http from './Http';

const http = new Http();

export default async function getData(): Promise<Record<string, unknown>> {
  let data;

  try {
    const xhr = await http.get('/assets/data.json');

    data = JSON.parse((xhr as XMLHttpRequest).response);
  } catch (e) {
    throw new Error(`Ошибка запроса данных: ${e}`);
  }

  return data;
}
