export default `
<div class="auth">
  <h4 class="heading">{{heading}}</h4>
  <form action="#" data-action="{{stage}}" class="js-auth__form auth__form">
    {{> @partial-block}}
  </form>
</div>

`;
