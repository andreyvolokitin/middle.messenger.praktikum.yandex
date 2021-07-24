import ChatsAPI from '../api/ChatsAPI';
import UserAPI from '../api/UserAPI';
import ResourcesAPI from '../api/ResourcesAPI';
import ChatWS from '../api/ChatWS';
import toggleSpinner from '../utils/toggleSpinner';
import store from '../store/storeInstance';
import { ROOT_PATHNAME } from '../shared/const/pathnames';
import Router from '../utils/router/Router';
import sanitize from '../utils/sanitize';
import toCaseDeep from '../utils/toCaseDeep';

const SOCKET_PING_INTERVAL = 10000;

export default class MessengerController {
  chatsAPI: ChatsAPI;

  userAPI: UserAPI;

  resourcesAPI: ResourcesAPI;

  chatWS: ChatWS;

  router: Router;

  sockets: Map<number, WebSocket>;

  socketsPromises: Map<number, Promise<WebSocket>>;

  user: UserData;

  private _pingTimerId: ReturnType<typeof setTimeout>;

  private static _instance: MessengerController;

  private _loadingChatElem: Nullable<HTMLElement>;

  constructor() {
    if (MessengerController._instance) {
      return MessengerController._instance;
    }

    this.chatsAPI = new ChatsAPI();
    this.userAPI = new UserAPI();
    this.resourcesAPI = new ResourcesAPI();
    this.chatWS = new ChatWS();
    this.router = new Router();
    this.sockets = new Map();
    this.socketsPromises = new Map();
    MessengerController._instance = this;
  }

  private _onSocketError(e: Event, _chatId: number) {
    alert(`Ошибка соединения. \n${e}`);
  }

  private _onSocketMessage(e: MessageEvent, chatId: number) {
    try {
      const data = toCaseDeep(JSON.parse(e.data), 'snake', 'camel') as ParsedJSON;

      if (!data) {
        throw new Error('Данные недоступны');
      }

      const payload = {
        chatId,
        data,
      };

      switch ((data as Record<string, unknown>).type) {
        case 'message':
        case 'file':
          store.dispatch('MESSAGE_ADD', payload);
          break;
        case 'pong':
          break;
        case 'user connected':
          break;
        default:
          toggleSpinner(this._loadingChatElem as HTMLElement);
          this._loadingChatElem = null;
          store.dispatch('MESSAGES_LOAD', payload);
      }
    } catch (err) {
      alert(`Не удалось получить сообщения, попробуйте перезагрузить страницу. \n${err}`);
    }
  }

  private _pingSockets() {
    this.sockets.forEach((socket) => {
      socket.send(
        JSON.stringify({
          type: 'ping',
        })
      );
    });
  }

  killSockets(): void {
    this.sockets.forEach((socket) => socket.close());
    this.sockets.clear();
    this.socketsPromises.clear();
    clearInterval(this._pingTimerId);
  }

  setUser(user: UserData): void {
    this.killSockets();
    this.user = user;
    this._pingTimerId = setInterval(() => {
      this._pingSockets();
    }, SOCKET_PING_INTERVAL);
  }

  setChats(user: UserData, container: HTMLElement): void {
    this.setUser(user);
    this.populateChats(container);
  }

  async uploadFile(file: FormData, actionElem: HTMLElement): Promise<FileData | null> {
    toggleSpinner(actionElem);

    try {
      return await this.resourcesAPI.create(file);
    } catch (e) {
      alert(`Ошибка загрузки файла. \n${e}`);
      return null;
    } finally {
      toggleSpinner(actionElem);
    }
  }

  sendMessage(
    msg: {
      content: string;
      fileId: string;
    },
    chatId: number
  ): void {
    const data = {} as OutgoingMessageData;
    const { content, fileId } = msg;
    const socket = this.sockets.get(chatId);

    if (fileId) {
      data.type = 'file';
      data.content = fileId;
    } else if (content) {
      data.type = 'message';
      data.content = sanitize(content);
    }

    if (socket) {
      socket.send(JSON.stringify(data));
    }
  }

  async createChatSocket(chatId: number): Promise<WebSocket> {
    try {
      const { token } = await this.chatsAPI.getChatToken(chatId);
      const userId = this.user.id as number;
      const socket = this.chatWS.create({
        chatId,
        userId,
        token,
      });

      socket.onmessage = (e) => this._onSocketMessage(e, chatId);
      socket.onerror = (e) => this._onSocketError(e, chatId);

      this.sockets.set(chatId, socket);

      return socket;
    } catch (e) {
      alert(`Ошибка соединения с чатом \n${e}`);
      // пытаться бесконечно
      return this.createChatSocket(chatId);
    }
  }

  async getChats(actionElem: HTMLElement): Promise<ChatListData | null> {
    toggleSpinner(actionElem);

    try {
      return await this.chatsAPI.request({
        limit: 99,
      });
    } catch (e) {
      return null;
    } finally {
      toggleSpinner(actionElem);
    }
  }

  private _queryMessages(socket: WebSocket) {
    // получить первые 20 сообщений и всё
    // todo: клиентская пагинация с разделением по дням
    socket.send(
      JSON.stringify({
        content: '0',
        type: 'get old',
      })
    );
  }

  async requestMessages(chatId: number, actionElem?: HTMLElement): Promise<void> {
    const socket = this.sockets.get(chatId) || (await this.socketsPromises.get(chatId));

    if (!socket) {
      return;
    }

    if (actionElem) {
      this._loadingChatElem = actionElem;
      toggleSpinner(actionElem);
    }

    if (socket.readyState === socket.OPEN) {
      this._queryMessages(socket);
    } else {
      socket.addEventListener('open', () => this._queryMessages(socket), { once: true });
    }
  }

  async populateChats(container: HTMLElement): Promise<void> {
    const state = store.getState();
    const chats = (state.chats || (await this.getChats(container))) as ChatData[];

    if (!chats) {
      alert('Данные недоступны, попробуйте перезагрузить страницу.');
    }

    if (chats && !state.chats) {
      chats.forEach((chat) => this.socketsPromises.set(chat.id, this.createChatSocket(chat.id)));
      store.dispatch('CHATS_LOAD', chats);
    }
  }

  async createChat(chatFormData: FormData, actionElem: HTMLElement): Promise<boolean> {
    const chatName = chatFormData.get('new-chat-name') as string;
    const finalData = chatFormData;

    finalData.delete('new-chat-name');
    toggleSpinner(actionElem);

    try {
      const { id: chatId } = await this.chatsAPI.create({
        title: chatName,
      });

      finalData.set('chatId', String(chatId));

      const chatData = await this.chatsAPI.updateAvatar(finalData);

      store.dispatch('CHAT_ADD', chatData);
      this.socketsPromises.set(chatId, this.createChatSocket(chatId));

      return true;
    } catch (e) {
      alert(`Ошибка, попробуйте ещё раз. \n${e}`);

      return false;
    } finally {
      toggleSpinner(actionElem);
    }
  }

  async deleteChat(data: ChatDeletionData, actionElem: HTMLElement): Promise<boolean> {
    toggleSpinner(actionElem);

    try {
      const chatDeletionData = await this.chatsAPI.delete(data);
      const socket = this.sockets.get(data.chatId);

      if (socket) {
        socket.close();
      }

      this.sockets.delete(data.chatId);
      this.socketsPromises.delete(data.chatId);
      store.dispatch('CHAT_DELETE', chatDeletionData);
      this.router.go(ROOT_PATHNAME, null, true);

      return true;
    } catch (e) {
      alert(`Ошибка, попробуйте ещё раз. \n${e}`);
      return false;
    } finally {
      toggleSpinner(actionElem);
    }
  }

  async manageUser(
    data: {
      user: UserSearchData;
      chatId: number;
    },
    action: 'add' | 'delete',
    actionElem: HTMLElement
  ): Promise<boolean> {
    toggleSpinner(actionElem);

    try {
      const users = await this.userAPI.search(data.user);
      const user = users.find((item) => item.login === data.user.login);
      let method;

      switch (action) {
        case 'add':
          method = 'addUsers';
          break;
        case 'delete':
          method = 'deleteUsers';
          break;
        default:
          break;
      }

      if (!user) {
        throw new Error('Пользователь не найден');
      }
      if (!method) {
        return false;
      }

      // eslint-disable-next-line
      // @ts-ignore: вызов метода по строке должен работать без доп. телодвижений, но потом исправлю
      await this.chatsAPI[method]({
        users: [user.id],
        chatId: data.chatId,
      });

      return true;
    } catch (e) {
      alert(`Ошибка. \n${e}`);
      return false;
    } finally {
      toggleSpinner(actionElem);
    }
  }
}
