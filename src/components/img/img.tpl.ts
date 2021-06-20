export default `
<img
    class="{{class}}"
    src="{{url}}"
    width="{{width}}"
    height="{{height}}"
    srcset="{{reverse (replaceFirst (reverse url) '.' '.x2@')}} 2x"
    alt="{{default alt ""}}"
/>

`;
