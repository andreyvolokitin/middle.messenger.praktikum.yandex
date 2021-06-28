export default `
<{{default tag "div"}}
  class="{{class}} file"
  {{#is tag "a"}}
    href="{{default url "#"}}"
  {{/is}}
  data-type="{{default type "default"}}"
>
  <div class="file__name">{{filename url}}</div>
  <div class="file__size">{{size}}</div>
</{{default tag "div"}}>

`;
