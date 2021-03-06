export default `
{{#if selected}}
<li data-key="{{data.id}}" class="is-current chat-list__item">
{{else}}
<li data-key="{{data.id}}" class="chat-list__item">
  <a href="/chats/{{data.id}}" data-router class="chat-list__link block-link">
{{/if}}
    {{> chat-preview picSize="4.375rem" data=data}}
{{#unless selected}}
  </a>
{{/unless}}
</li>
`;
