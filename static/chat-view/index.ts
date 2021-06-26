import ChatView from '../../src/pages/chat-view';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((data: Record<string, unknown>) => {
  const chatView = new ChatView({
    chats: data.chats as Record<string, unknown>[],
    currentChat: (data.chats as Record<string, unknown>[])[1],
  });

  mountInto('body', chatView.element);
});
