export default `
<div class="profile__content">
    <h4 class="profile__name heading">{{user.first_name}}</h4>
    <form data-action="{{action}}" class="js-profile__form" action="#">
      <table class="profile__table">
        <tbody class="profile__table-body">
        {{#or (is action null) (is action "edit")}}
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">Почта</span>
              {{else}}
                <label for="email" class="profile__field">Почта</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">{{user.email}}&#8203;</span>
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
              {{#is action null}}
                <span class="profile__field">Логин</span>
              {{else}}
                <label for="login" class="profile__field">Логин</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">{{user.login}}&#8203;</span>
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
              {{#is action null}}
                <span class="profile__field">Имя</span>
              {{else}}
                <label for="first_name" class="profile__field">Имя</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">{{user.first_name}}&#8203;</span>
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
              {{#is action null}}
                <span class="profile__field">Фамилия</span>
              {{else}}
                <label for="second_name" class="profile__field">Фамилия</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">{{user.second_name}}&#8203;</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="second_name"
                    id="second_name"
                    display="inline"
                    theme="2"
                    value=user.second_name
                    required="true"
                    hint="Фамилия"
                    type="text"
                }}
              {{/is}}
            </td>
          </tr>
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">Имя в чате</span>
              {{else}}
                <label for="display_name" class="profile__field">Имя в чате</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">{{user.display_name}}&#8203;</span>
              {{else}}
                {{> input
                    wrapperClass="profile__input"
                    name="display_name"
                    id="display_name"
                    display="inline"
                    theme="2"
                    value=user.display_name
                    hint="Имя в чате"
                    type="text"
                }}
              {{/is}}
            </td>
          </tr>
          {{! todo: использовать хэлпер для форматирования номера телефона}}
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">Телефон</span>
              {{else}}
                <label for="phone" class="profile__field">Телефон</label>
              {{/is}}
            </th>
            <td class="profile__table-cell">
              {{#is action null}}
                <span class="profile__field">{{user.phone}}&#8203;</span>
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
        {{#is action "edit-password"}}
          <tr class="profile__table-row">
            <th class="profile__table-cell">
              <label for="oldPassword" class="profile__field">Старый пароль</label>
            </th>
            <td class="profile__table-cell">
              {{> input
                  wrapperClass="profile__input"
                  name="oldPassword"
                  id="oldPassword"
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
              <label for="newPassword" class="profile__field">Новый пароль</label>
            </th>
            <td class="profile__table-cell">
              {{> input
                  wrapperClass="profile__input"

                  name="newPassword"
                  id="newPassword"
                  display="inline"
                  theme="2"
                  autocomplete="new-password"
                  hint="Новый пароль"
                  required="true"
                  type="password"
              }}
            </td>
          </tr>
        {{/is}}
        </tbody>
        <tfoot class="profile__table-tfoot">
        {{#is action null}}
          <tr class="profile__table-row">
            <td colspan="2" class="profile__table-cell">
              {{> button
                  tag="a"
                  theme="5"
                  href="/profile/edit" attrs="data-router"
                  text="Изменить данные"
              }}
            </td>
          </tr>
          <tr class="profile__table-row">
            <td colspan="2" class="profile__table-cell">
              {{> button
                  tag="a"
                  theme="5"
                  href="/profile/password/edit" attrs="data-router"
                  text="Изменить пароль"
              }}
            </td>
          </tr>
          <tr class="profile__table-row">
            <td colspan="2" class="profile__table-cell">
              {{> button
                  theme="6"
                  class="js-profile__logout"
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
`;
