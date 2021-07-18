export default `
<nav class="chat-list">
  <ul class="js-chat-list chat-list__list nolist">
    {{#each chats as |data|}}
      {{> chat-list-item selected=data.selected data=data}}
    {{/each}}
  </ul>
</nav>
`;
