export default `
<img
    class="{{class}}"
    src="{{resourceURL src}}"
    width="{{width}}"
    height="{{height}}"
    srcset="{{resourceURL (reverse (replaceFirst (reverse src) '.' '.x2@'))}} 2x"
    alt="{{default alt ""}}"
/>

`;
