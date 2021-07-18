// USER_ADD
// USER_DELETE
// MESSAGE_ADD
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

    state.currentChat = null;
  },

  MESSAGES_LOAD(payload: { chatId: number; data: MessageData[] }, state: StateTree): void {
    const { chatId, data } = payload;

    if (!state.messages) {
      state.messages = {};
    }

    (state.messages as Record<string, unknown>)[chatId] = sortById(data) as MessageData[];
  },
  MESSAGE_ADD(_payload: Record<string, unknown>, _state: StateTree): void {
    console.log(_payload);
  },
};