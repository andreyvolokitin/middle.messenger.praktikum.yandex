export default `
{{#> page backURL="/user-info" scroll=1}}
  {{> profile edit="password" user=userData}}
{{/page}}

`;