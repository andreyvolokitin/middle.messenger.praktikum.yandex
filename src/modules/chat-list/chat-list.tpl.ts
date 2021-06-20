export default `
<nav class="chat-list">
  <ul class="chat-list__list nolist">
    {{#each chats as |chatData|}}
      {{#is ../currentChat.id chatData.id}}
        <li class="is-current chat-list__item">
      {{else}}
        <li class="chat-list__item">
        <a href="/chat-view" class="chat-list__link block-link">
      {{/is}}
          {{> chat-preview picSize="4.375rem" chatData=chatData}}
      {{#isnt ../currentChat.id chatData.id}}
        </a>
      {{/isnt}}
        </li>
    {{/each}}
  </ul>
</nav>
`;
