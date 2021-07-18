export default `
<{{default tag "div"}}
  class="{{class}} file"
  {{#is tag "a"}}
    href="{{default (resourceURL url) "#"}}"
  {{/is}}
  data-type="{{default type "default"}}"
>
  <div class="file__name">{{name}}</div>
  <div class="file__size">{{size}}</div>
</{{default tag "div"}}>

`;
