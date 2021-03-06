export default `
{{!
  Нельзя устанавливать шаблону параметр tag="input" (и другие: https://developer.mozilla.org/en-US/docs/Web/CSS/Replaced_element),
  т.к. <input> не может иметь содержимого.
}}
<{{default tag "button"}}
  class="{{class}} button_{{default theme "default"}} button"
  data-display="{{default display "default"}}"
  {{#or (is tag null) (is tag "button")}}
    type="{{default type "button"}}"
  {{/or}}
  {{#and (isnt tag null) (isnt tag "a") (isnt tag "button")}}
    tabindex="{{default tabindex "0"}}"
  {{/and}}
  {{#is tag "a"}}
    href="{{default href "#"}}"
  {{/is}}
  {{#if title}}
    title="{{title}}"
  {{/if}}
  {{#if disabled}}
    disabled
  {{/if}}
  draggable="false"
  {{{attrs}}}
>
  {{#if icon}}
    <span class="button__icon">
      {{> icon name=icon scale=iconScale }}
    </span>
  {{/if}}

  {{#if text}}
    <span class="button__text">{{text}}</span>
  {{/if}}

  {{> @partial-block}}

</{{default tag "button"}}>

`;
