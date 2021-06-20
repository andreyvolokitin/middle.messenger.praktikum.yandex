export default `
<div class="{{#if backURL}}page_inner{{/if}} {{#if centered}}page_centered{{/if}} {{#if scroll}}page_scroll{{/if}} page">
  {{#if backURL}}
    <a href="{{backURL}}" tabindex="-1" title="Назад" class="page__back">
      <object type="no/suchtype">
        {{> button class="page__back-decoration" tag="a" href=backURL icon="back" iconScale=1.5 theme="2" }}
      </object>
    </a>
  {{/if}}
  {{#if centered}}
    <div class="page__centerer page__content">
      {{> @partial-block}}
    </div>
  {{else}}
    {{#if backURL}}
      <div class="page__content">
        {{> @partial-block}}
      </div>
    {{else}}
      {{> @partial-block}}
    {{/if}}
  {{/if}}
</div>
`;
