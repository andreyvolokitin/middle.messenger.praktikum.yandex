import API from './API';

export default class AuthAPI extends API {
  protected static endpoint = '/auth';

  async create(user: UserSignupData): Promise<UserSignupResponse> {
    return this.processResponse<UserSignupResponse>(
      await this.http.post('/signup', {
        data: JSON.stringify(user),
      })
    );
  }

  async update(user: UserLoginData | false): Promise<void> {
    if (user === false) {
      this.processResponse(await this.http.post('/logout'));
      return;
    }

    this.processResponse(
      await this.http.post('/signin', {
        data: JSON.stringify(user),
      })
    );
  }

  async request(): Promise<UserData> {
    return this.processResponse<UserData>(await this.http.get('/user'));
  }
}
