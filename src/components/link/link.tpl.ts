export default `
<a
  href="{{default href "#"}}"
  class="{{class}} {{#if action}}link_action{{/if}} link_{{default theme "default"}} link"
  {{{attrs}}}
>
  {{text}}
</a>

`;
