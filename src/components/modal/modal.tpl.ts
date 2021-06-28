export default `
<div
    class="{{class}} js-modal modal scrollbar"
    id="{{id}}"
    tabindex="-1"
>
  <div class="modal__inner">
    <div class="modal__block">
      <header class="modal__heading">
        {{> button class="js-modal__close modal__close" icon="close" theme="1" title="Закрыть"}}
        <h4 class="heading">{{heading}}</h4>
      </header>
      {{> @partial-block}}
    </div>
  </div>
</div>

`;
