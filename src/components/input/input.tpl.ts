export default `
<div
    class="{{wrapperClass}} input_{{default theme "default"}} input"
    data-display="{{default display "default"}}"
>
  <{{#if area}}textarea{{else}}input{{/if}}
      class="{{class}} {{#and float hint (isnt display "inline")}}input__field_float{{/and}} input__field"
      id="{{id}}"
    {{#if name}}
      name="{{name}}"
    {{/if}}
    {{#if hint}}
      placeholder="{{hint}}"
    {{/if}}
    {{#if autocomplete}}
      autocomplete="{{autocomplete}}"
    {{/if}}
    {{#unless area}}
      value="{{value}}"
      type="{{default type "text"}}"
    {{/unless}}
    {{#if disabled}}
      disabled
    {{/if}}
    {{#if fixed}}
      data-fixed
    {{/if}}
    {{#if pattern}}
      pattern="{{{pattern}}}"
    {{/if}}
    {{#if required}}
      required
    {{/if}}
    {{{attrs}}}
  >{{~#if area~}}{{value}}</textarea>{{/if}}
    {{#is display "inline"}}
      {{!
        Инпуты могут иметь \`placeholder\`, но он может не умещаться в дефолтную ширину тега <input>,
        которую ему назначает браузер. Для этого в компонет добавлен \`.input__spacer\`, который по идее
        должен содержать текст плэйсхолдера и тем самым задавать размер контейнера, от которого его будет
        брать инпут.

        Компонент инлайн-инпута использует \`display: inline-flex\` на контейнере для прокидывания
        базовой линии <input> в родительский текст.

        В результате внутри флекс-контейнера появляестьются 2 элемента, влияющие на его ширину:
        - \`.input__spacer\` должен задавать ширину
        - \`input\` должен занимать эту ширину

        И оба должны располагаться на своей строке. Но при этом контейнер занимает ширину, равную сумме их ширин,
        а не наибольгую ширину одного из них.

        Для этого спейсер должен содержать текст плэйсхолдера, за вычетом примерной дефолтной ширины тега <input>,
        которую ему назначает браузер (~19). Если плэйсхолдер содержит меньше букв, чем это значение, то он
        не нужен.
      }}
      <div class="input__spacer">
        {{#gt (length hint) 19}}
          {{truncate hint (subtract (length hint) 19)}}
        {{/gt}}
      </div>
    {{/is}}

    {{#and float hint (isnt display "inline")}}
      <label class="input__hint" for="{{id}}">{{hint}}</label>
    {{/and}}
</div>

`;
