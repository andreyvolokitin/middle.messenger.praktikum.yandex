import API from './API';

export default class UserAPI extends API {
  protected static endpoint = '/user';

  async request(id: number): Promise<UserData> {
    return this.processResponse<UserData>(await this.http.get(`/${id}`));
  }

  async update(data: ProfileData): Promise<UserData> {
    return this.processResponse<UserData>(
      await this.http.put('/profile', {
        data: JSON.stringify(data),
      })
    );
  }

  async updatePassword(data: UserPasswordData): Promise<void> {
    return this.processResponse<void>(
      await this.http.put('/password', {
        data: JSON.stringify(data),
      })
    );
  }

  async updateAvatar(data: FormData): Promise<UserData> {
    return this.processResponse<UserData>(
      await this.http.put(
        '/profile/avatar',
        {
          data,
        },
        true
      )
    );
  }
}
