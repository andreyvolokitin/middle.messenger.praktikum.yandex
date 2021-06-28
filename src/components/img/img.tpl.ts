export default `
<img
    class="{{class}}"
    src="{{src}}"
    width="{{width}}"
    height="{{height}}"
    srcset="{{reverse (replaceFirst (reverse src) '.' '.x2@')}} 2x"
    alt="{{default alt ""}}"
/>

`;
