/* eslint-disable camelcase */
type MessageData = {
  chatId: number;
  time: string;
  type: string;
  userId: string;
  content: string;
  file?: FileData;
};
