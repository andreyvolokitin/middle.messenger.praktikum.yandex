export default `
<{{default tag "figure"}}
  class="{{class}} avatar_{{default theme "default"}} avatar"
  {{#and width height (is size null)}}
    style="width: {{width}};"
  {{/and}}
  {{#if size}}
    style="width: {{size}};"
  {{/if}}
  {{#is tag "a"}}
    href="{{default href "#"}}"
  {{/is}}
  {{{attrs}}}
>
  <div
      class="avatar__pic {{#if retina}}avatar__pic_retina{{/if}}"
      style="
        {{#if url}}
          background-image:url({{resourceURL url}});
          {{#if retina}}
            --at2x: url({{resourceURL (reverse (replaceFirst (reverse url) '.' '.x2@'))}});
          {{/if}}
        {{/if}}
        {{#and width height (is size null)}}
          padding-top: {{multiply 100 (divide (float height) (float width))}}%;
        {{/and}}
        {{#if size}}
          padding-top: 100%;
        {{/if}}
      "
    {{#if url}}
      data-populated="true"
    {{/if}}
  >
    {{#if url}}
      {{> img class="avatar__img" src=url}}
    {{/if}}
  </div>
</{{default tag "figure"}}>

`;
