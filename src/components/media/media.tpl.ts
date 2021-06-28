export default `
<div
    class="{{class}} media"
    data-type="{{default type "image"}}"
>
  <div style="" class="media__content">
    {{#or (is type null) (is type "image")}}
      {{> img class="media__item" src=url width=width height=height}}
    {{/or}}
    {{#is type "video"}}
      <video class="media__item" src="{{url}}"></video>
    {{/is}}
  </div>
  <div class="media__ui"></div>
</div>

`;
