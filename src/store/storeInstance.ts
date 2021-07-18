import Store from './Store';
import actions from './actions';
// import STORAGE_KEY from '../shared/const/storageKey';

const store = new Store(
  actions,
  {
    chats: null,
    user: null,
    messages: null,
  }
  // JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null') || {}
);

// eslint-disable-next-line
//@ts-ignore
window.store = store;

export default store;
