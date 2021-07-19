export default `
<div>
  {{#> modal _alias="add-user-modal" currentChat=currentChat id="add-user-modal" heading="Добавить пользователя"}}
    <form data-chat="{{currentChat.id}}" class="js-add-user" action="#">
      <div class="gap-y-lg">
        {{> input
            class="js-add-user__input"
            name="add-user"
            id="add-user"
            hint="Логин"
            required="true"
            float=1
        }}
      </div>
      <div class="gap-y-gen">
        {{> button
            display="block"
            type="submit"
            text="Добавить"
        }}
      </div>
    </form>
  {{/modal}}
  {{#> modal _alias="delete-user-modal" currentChat=currentChat id="delete-user-modal" heading="Удалить пользователя"}}
    <form data-chat="{{currentChat.id}}" class="js-delete-user" action="#">
      <div class="gap-y-lg">
        {{> input
            class="js-delete-user__input"
            name="delete-user"
            id="delete-user"
            hint="Логин"
            required="true"
            float=1
        }}
      </div>
      <div class="gap-y-gen">
        {{> button
            display="block"
            type="submit"
            text="Удалить"
        }}
      </div>
    </form>
  {{/modal}}
  {{#> modal _alias="delete-chat-modal" currentChat=currentChat id="delete-chat-modal" heading="Удалить чат"}}
    <form data-chat="{{currentChat.id}}" class="js-delete-chat" action="#">
      <div class="gap-y-gen">
        <p>Хотите удалить чат?</p>
      </div>
      <div class="field-row gap-y-gen">
        {{> button class="field-row__field" text="Отмена" theme="0" attrs="data-cancel='true'"}}
        {{> button class="field-row__field" type="submit" text="Да"}}
      </div>
    </form>
  {{/modal}}
</div>
`;
