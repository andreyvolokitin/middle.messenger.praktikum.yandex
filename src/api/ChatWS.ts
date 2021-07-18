import ChatsAPI from './ChatsAPI';

export default class ChatWS {
  chatsAPI: ChatsAPI;

  constructor() {
    this.chatsAPI = new ChatsAPI();
  }

  create(connectionData: { chatId: number; userId: number; token: string }): WebSocket {
    const { userId, chatId, token } = connectionData;

    return new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
  }
}
