import Store from './Store';
import actions from './actions';

const store = new Store(actions, {
  chats: null,
  user: null,
  messages: null,
});

export default store;
