/* eslint-disable no-param-reassign */
import sortById from '../utils/sortById';
import cloneDeep from '../utils/cloneDeep';

export default {
  PATH_PARAM_CHANGED(payload: Record<string, string>, state: StateTree): void {
    if (!state.pathParams) {
      state.pathParams = {};
    }

    const param = Object.keys(payload)[0];

    if (param) {
      Object.assign(state.pathParams, payload);

      switch (param) {
        case 'selectedChatId':
          this.CHAT_SELECT({ id: Number(payload[param]) }, state);
          break;

        default:
          break;
      }
    } else {
      Object.keys(state.pathParams).forEach(
        (key) => delete (state.pathParams as Record<string, string>)[key]
      );
      this.CHAT_DESELECT_SELECTED({}, state);
    }
  },

  PROFILE_LOAD(payload: ParsedJSON, state: StateTree): void {
    state.user = payload;
  },
  PROFILE_AVATAR_SET(payload: Record<string, string>, state: StateTree): void {
    const user = state.user as UserData;

    if (!user) {
      return;
    }

    user.avatar = payload.avatar;
  },

  CHATS_LOAD(payload: ChatData[], state: StateTree): void {
    const selectedChatId =
      state.pathParams && Number((state.pathParams as Record<string, string>).selectedChatId);

    if (selectedChatId) {
      const selectedChat = payload.find((item) => item.id === selectedChatId);

      if (selectedChat) {
        selectedChat.selected = true;
        state.currentChat = cloneDeep(selectedChat) as ChatData;
      }
    }

    state.chats = sortById(payload, 'descending') as ChatData[];
  },
  CHAT_DELETE(payload: Record<string, unknown>, state: StateTree): void {
    const chats = state.chats as ChatData[];

    if (!chats) {
      return;
    }

    this.CHAT_DESELECT_SELECTED({}, state);
    state.chats = chats.filter(
      (chat) => chat.id !== (payload.result as Record<string, unknown>).id
    );
  },
  CHAT_ADD(payload: ChatData, state: StateTree): void {
    const chats = state.chats as ChatData[];

    if (!chats) {
      state.chats = [payload];
    } else {
      chats.push(payload);
    }
  },
  CHAT_SELECT(payload: { id: number }, state: StateTree): void {
    const chats = state.chats as ChatData[];

    if (!chats) {
      return;
    }

    const selectedChat = chats.find((chat) => chat.id === payload.id);
    const previousChat = chats.find((chat) => chat.selected);

    if (previousChat) {
      previousChat.selected = false;
    }

    if (selectedChat) {
      selectedChat.selected = true;
      state.currentChat = cloneDeep(selectedChat) as ChatData;
    }
  },
  CHAT_DESELECT_SELECTED(_payload: Record<string, unknown>, state: StateTree): void {
    const chats = state.chats as ChatData[];

    if (!chats) {
      return;
    }

    const previousChat = chats.find((chat) => chat.selected);

    if (previousChat) {
      previousChat.selected = false;
    }

    if (state.messages) {
      Object.keys(state.messages).forEach((key) => {
        (state.messages as Record<string, Nullable<MessageData[]>>)[key] = null;
      });
    }

    state.currentChat = null;
  },

  MESSAGES_LOAD(payload: { chatId: number; data: MessageData[] }, state: StateTree): void {
    const { chatId, data } = payload;
    const { currentChat } = state;

    if (!state.messages) {
      state.messages = {};
    }

    (state.messages as Record<string, MessageData[]>)[chatId] = sortById(data) as MessageData[];

    if (currentChat) {
      const affectedChat = (state.chats as ChatData[]).find(
        (chat) => chat.id === (currentChat as ChatData).id
      ) as ChatData;

      affectedChat.unread_count = 0;
    }
  },
  MESSAGE_ADD(payload: { chatId: number; data: MessageData }, state: StateTree): void {
    const { chatId, data } = payload;
    const { chats, currentChat } = state;
    const affectedChat = (chats as ChatData[]).find((chat) => chat.id === chatId) as ChatData;
    const affectedChatClone = cloneDeep(affectedChat) as ChatData;
    const { last_message: lastMessage, unread_count: unreadCount } = affectedChatClone;

    if (state.messages && (state.messages as Record<string, MessageData[]>)[chatId]) {
      (state.messages as Record<string, MessageData[]>)[chatId].push(data);
    }

    affectedChat.last_message = Object.assign(lastMessage || {}, {
      content: data.content,
      time: data.time,
      user: data.user_id, // извините
    });

    if (!currentChat || (currentChat as ChatData).id !== chatId) {
      affectedChat.unread_count = unreadCount + 1;
    }
  },
};
