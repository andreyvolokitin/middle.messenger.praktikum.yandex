export default `
<span style="--scale: {{default scale 1}}" class="{{class}} icon">
  <svg class="icon__svg">
    <use xlink:href="{{append "/assets/img/icons.svg#" name}}"></use>
  </svg>
</span>
`;
