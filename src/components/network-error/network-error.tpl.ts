export default `
<div class="network-error">
  <div class="network-error__type">{{type}}</div>
  <div class="network-error__clarification">{{clarification}}</div>
  <div class="network-error__recover">
    {{> button attrs="data-router data-action='back'" theme="4" text="Перейти назад"}}
  </div>
</div>

`;
