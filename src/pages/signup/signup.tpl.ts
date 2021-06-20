export default `
{{#> page centered=1 scroll=1}}
  {{#> auth heading="Регистрация"}}
    <div class="gap-y-xl">
      <div class="gap-y-lg">
        {{> input required="true" name="email" id="email" hint="E-mail" type="email" autocomplete="email" float=1}}
      </div>
      <div class="gap-y-lg">
        {{> input required="true" name="login" id="login" hint="Логин" autocomplete="username" float=1}}
      </div>
      <div class="gap-y-lg">
        {{> input required="true" value="" name="first_name" id="first_name" hint="Имя" autocomplete="given-name" float=1}}
      </div>
      <div class="gap-y-lg">
        {{> input required="true" name="last_name" id="last_name" hint="Фамилия" autocomplete="family-name" float=1}}
      </div>
      <div class="gap-y-lg">
        {{> input required="true" name="phone" id="phone" hint="Телефон" type="tel" pattern="\\+7\\([0-9]{3}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}" autocomplete="tel" float=1}}
      </div>
      <div class="gap-y-lg">
        {{> input required="true"  name="password" id="password" hint="Пароль" type="password" autocomplete="new-password" float=1}}
      </div>
      <div class="gap-y-lg">
        {{> input required="true"  name="password_repeat" id="password_repeat" hint="Повторите пароль" type="password" autocomplete="new-password" float=1}}
      </div>
    </div>
    <div class="gap-y-xs">
      {{> button type="submit" display="block" text="Зарегистрироваться"}}
    </div>
    <div class="gap-y-xs">
      {{> button tag="a" href="/" display="block" theme="4" text="Войти"}}
    </div>
  {{/auth}}
{{/page}}

`;
