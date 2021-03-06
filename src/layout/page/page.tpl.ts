export default `
<div class="{{#if inner}}page_inner{{/if}} {{#if centered}}page_centered{{/if}} {{#if scroll}}page_scroll{{/if}} page">
  {{#if inner}}
    <button tabindex="-1" title="Назад" data-router data-action="back" class="page__back">
      <object type="no/suchtype">
        {{> button class="page__back-decoration" attrs="data-router data-action='back'" icon="back" iconScale=1.5 theme="2" }}
      </object>
    </button>
  {{/if}}
  {{#if centered}}
    <div class="page__centerer page__content">
      {{> @partial-block}}
    </div>
  {{else}}
    {{#if inner}}
      <div class="page__content">
        {{> @partial-block}}
      </div>
    {{else}}
      {{> @partial-block}}
    {{/if}}
  {{/if}}
</div>
`;
