export default `
<img
    class="{{class}}"
    src="{{resourceURL src}}"
    width="{{width}}"
    height="{{height}}"
    {{#if retina}}
      srcset="{{resourceURL (reverse (replaceFirst (reverse src) '.' '.x2@'))}} 2x"
    {{/if}}
    alt="{{default alt ''}}"
/>

`;
