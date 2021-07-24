import API from './API';

export default class ChatsAPI extends API {
  protected static endpoint = '/chats';

  async request(params?: ChatListRequestParams): Promise<ChatListData> {
    return this.processResponse<ChatListData>(
      await this.http.get('/', {
        data: params,
      })
    );
  }

  async create(data: ChatCreationData): Promise<ChatCreationResponse> {
    return this.processResponse<ChatCreationResponse>(
      await this.http.post('/', {
        data,
      })
    );
  }

  async delete(data: ChatDeletionData): Promise<ChatDeletionResponse> {
    return this.processResponse<ChatDeletionResponse>(
      await this.http.delete('/', {
        data,
      })
    );
  }

  async getChatToken(chatId: number): Promise<ChatTokenResponse> {
    return this.processResponse<ChatTokenResponse>(await this.http.post(`/token/${chatId}`));
  }

  async updateAvatar(data: FormData): Promise<ChatData> {
    return this.processResponse<ChatData>(
      await this.http.put(
        '/avatar',
        {
          data,
        },
        true
      )
    );
  }

  async addUsers(data: ChatUserManageData): Promise<void> {
    this.processResponse<void>(
      await this.http.put('/users', {
        data,
      })
    );
  }

  async deleteUsers(data: ChatUserManageData): Promise<void> {
    this.processResponse<void>(
      await this.http.delete('/users', {
        data,
      })
    );
  }
}
