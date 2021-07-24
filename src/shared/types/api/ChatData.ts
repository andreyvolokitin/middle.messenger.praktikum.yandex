/* eslint-disable camelcase */
type ChatData = {
  id: number;
  title: string;
  avatar: string;
  unreadCount: number;
  lastMessage: {
    user: {
      firstName: string;
      secondName: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
  selected?: boolean;
};
