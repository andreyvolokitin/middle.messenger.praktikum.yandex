export default `
<ul class="js-message-list chat__messages-list nolist">
  {{#each messages as |data|}}
    {{> message-list-item data=data}}
  {{/each}}
</ul>
`;
