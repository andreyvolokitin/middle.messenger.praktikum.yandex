export default `
<div class="auth">
  <h4 class="heading">{{heading}}</h4>
  <form action="#" data-href="/chat-initial" class="js-auth__form auth__form">
    {{> @partial-block}}
  </form>
</div>

`;
