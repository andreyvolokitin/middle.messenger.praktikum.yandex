import API from './API';

export default class ResourcesAPI extends API {
  protected static endpoint = '/resources';

  async create(resource: FormData): Promise<FileData> {
    return this.processResponse<FileData>(
      await this.http.post(
        '/',
        {
          data: resource,
        },
        true
      )
    );
  }
}
