export default `
<li data-key="{{data.chat_id}}{{data.id}}">
  {{> message class="chat__message" data=data user=user}}
</li>
`;
