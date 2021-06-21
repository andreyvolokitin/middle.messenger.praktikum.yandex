import ChatInitial from '../../src/pages/chat-initial';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((data: Record<string, unknown>) => {
  const chatInitial = new ChatInitial({
    chats: data.chats as Record<string, unknown>[],
  });

  mountInto('body', chatInitial.element);
});
