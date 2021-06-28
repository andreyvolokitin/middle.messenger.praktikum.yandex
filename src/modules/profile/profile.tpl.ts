export default `
<div class="profile">
  <header class="profile__head">
    {{> avatar
        tag="a"
        class="js-modal-trigger profile__pic"
        size="10rem"
        theme="1"
        url=user.pic
        attrs="
          data-target='#upload-avatar-modal'
          data-label='Поменять аватар'
        "
    }}
    <h4 class="profile__name heading">{{user.first_name}}</h4>
  </header>
  <div class="profile__content">
    <form class="js-profile__form" action="#">
      <table class="profile__table">
        <tbody class="profile__table-body">
        {{#or (is edit null) (is edit "data")}}
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">Почта</span>
              {{else}}
                <label for="email" class="profile__field">Почта</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">{{user.email}}</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="email"
                    id="email"
                    display="inline"
                    theme="2"
                    value=user.email
                    required="true"
                    hint="Почта"
                    type="email"
                }}
              {{/is}}
            </td>
          </tr>
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">Логин</span>
              {{else}}
                <label for="login" class="profile__field">Логин</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">{{user.login}}</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="login"
                    id="login"
                    display="inline"
                    theme="2"
                    value=user.login
                    required="true"
                    hint="Логин"
                    type="text"
                }}
              {{/is}}
            </td>
          </tr>
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">Имя</span>
              {{else}}
                <label for="first_name" class="profile__field">Имя</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">{{user.first_name}}</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="first_name"
                    id="first_name"
                    display="inline"
                    theme="2"
                    value=user.first_name
                    required="true"
                    hint="Имя"
                    type="text"
                }}
              {{/is}}
            </td>
          </tr>
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">Фамилия</span>
              {{else}}
                <label for="last_name" class="profile__field">Фамилия</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">{{user.last_name}}</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="last_name"
                    id="lsst_name"
                    display="inline"
                    theme="2"
                    value=user.last_name
                    required="true"
                    hint="Фамилия"
                    type="text"
                }}
              {{/is}}
            </td>
          </tr>
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">Имя в чате</span>
              {{else}}
                <label for="nickname" class="profile__field">Имя в чате</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">{{user.nickname}}</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="nickname"
                    id="nickname"
                    display="inline"
                    theme="2"
                    value=user.nickname
                    required="true"
                    hint="Имя в чате"
                    type="text"
                }}
              {{/is}}
            </td>
          </tr>
          {{! todo: использовать хэлпер для форматирования номера телефона}}
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">Телефон</span>
              {{else}}
                <label for="phone" class="profile__field">Телефон</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is edit null}}
                <span class="profile__field">{{user.phone}}</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="phone"
                    id="phone"
                    display="inline"
                    theme="2"
                    value=user.phone
                    required="true"
                    hint="Телефон"
                    type="tel" pattern="\\+7\\([0-9]{3}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}"
                }}
              {{/is}}
            </td>
          </tr>
        {{/or}}
        {{#is edit "password"}}
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              <label for="password-old" class="profile__field">Старый пароль</label>
            </th>
            <td class="profile__table-cell">
              {{> input
                  wrapperClass="profile__input"
                  name="password-old"
                  id="password-old"
                  display="inline"
                  theme="2"
                  value=user.password
                  required="true"
                  autocomplete="current-password"
                  hint="Старый пароль"
                  type="password"
              }}
            </td>
          </tr>
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              <label for="password-new" class="profile__field">Новый пароль</label>
            </th>
            <td class="profile__table-cell">
              {{> input
                  wrapperClass="profile__input"

                  name="password-new"
                  id="password-new"
                  display="inline"
                  theme="2"
                  autocomplete="new-password"
                  hint="Новый пароль"
                  required="true"
                  type="password"
              }}
            </td>
          </tr>
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              <label for="password-new-repeat" class="profile__field">Повторите новый пароль</label>
            </th>
            <td class="profile__table-cell">
              {{> input
                  wrapperClass="profile__input"

                  name="password-new-repeat"
                  id="password-new-repeat"
                  display="inline"
                  theme="2"
                  autocomplete="new-password"
                  hint="Повторите новый пароль"
                  required="true"
                  type="password"
              }}
            </td>
          </tr>
        {{/is}}
        </tbody>
        <tfoot class="profile__table-tfoot">
        {{#is edit null}}
          <tr class="profile__table-row">
            <td colspan="2" class="profile__table-cell">
              {{> button
                  tag="a"
                  theme="5"
                  href="/user-info_edit"
                  text="Изменить данные"
              }}
            </td>
          </tr>
          <tr class="profile__table-row">
            <td colspan="2" class="profile__table-cell">
              {{> button
                  tag="a"
                  theme="5"
                  href="/user-info_change-password"
                  text="Изменить пароль"
              }}
            </td>
          </tr>
          <tr class="profile__table-row">
            <td colspan="2" class="profile__table-cell">
              {{> button
                  tag="a"
                  theme="6"
                  href="/"
                  text="Выйти"
              }}
            </td>
          </tr>
        {{else}}
          <tr class="profile__table-row">
            <td colspan="2" class="profile__table-cell">
              {{> button type="submit" text="Сохранить"}}
            </td>
          </tr>
        {{/is}}
        </tfoot>
      </table>
    </form>
  </div>
</div>

{{#> modal id="upload-avatar-modal" heading="Загрузка аватара"}}
  {{> upload-avatar}}
{{/modal}}

`;
