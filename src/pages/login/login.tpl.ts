export default `
{{#> page centered=1 scroll=1}}
  {{#> auth stage="login" heading="Вход"}}
    <div class="gap-y-xl">
      <div class="gap-y-lg">
        {{> input
        value=""
        name="login"
        id="login"
        hint="Логин"
        required="true"
        autocomplete="username"
        float=1
        }}
      </div>
      <div class="gap-y-lg">
        {{> input
        name="password"
        id="password"
        hint="Пароль"
        required="true"
        type="password"
        autocomplete="current-password"
        float=1
        }}
      </div>
    </div>
    <div class="gap-y-xs">
      {{> button type="submit" display="block" text="Авторизоваться"}}
    </div>
    <div class="gap-y-xs">
      {{> button tag="a" href="/signup" attrs="data-router" display="block" theme="4" text="Нет аккаунта?"}}
    </div>
  {{/auth}}
{{/page}}

`;
