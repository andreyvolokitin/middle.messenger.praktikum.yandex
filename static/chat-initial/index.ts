import ChatInitial from '../../src/pages/chat-initial';
import mountInto from '../../src/utils/mountInto';
import getData from '../../src/utils/getData';

getData().then((data: Record<string, unknown>) => {
  console.time('chat-initial');

  const chatInitial = new ChatInitial({
    chats: data.chats as Record<string, unknown>[],
  });
  console.timeEnd('chat-initial');

  mountInto('body', chatInitial.element);
});
