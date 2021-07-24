import API from './API';
import toCaseDeep from '../utils/toCaseDeep';

export default class AuthAPI extends API {
  protected static endpoint = '/auth';

  async create(user: UserSignupData): Promise<UserSignupResponse> {
    return this.processResponse<UserSignupResponse>(
      await this.http.post('/signup', {
        data: user,
        formatJSONKeys(data: unknown) {
          return toCaseDeep(data, 'camel', 'snake');
        },
      })
    );
  }

  async login(user: UserLoginData): Promise<void> {
    this.processResponse(
      await this.http.post('/signin', {
        data: user,
      })
    );
  }

  async logout(): Promise<void> {
    this.processResponse(await this.http.post('/logout'));
  }

  async request(): Promise<UserData> {
    return this.processResponse<UserData>(await this.http.get('/user'));
  }
}
