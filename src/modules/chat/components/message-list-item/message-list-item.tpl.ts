export default `
<li data-key="{{data.chatId}}{{data.id}}">
  {{> message class="chat__message" data=data user=user}}
</li>
`;
