export default `
{{#> page}}
  {{> messenger chats=chats currentChat=currentChat}}
  {{#> dropdown id="chat-actions-dropdown"}}
    {{> button
        class="js-modal-trigger js-dropdown-cancel"
        theme="3"
        display="block"
        text="Добавить пользователя"
        attrs="
            data-target=#add-user-modal
        "
    }}
    {{> button
        class="js-modal-trigger js-dropdown-cancel"
        theme="3"
        display="block"
        text="Удалить пользователя"
        attrs="
            data-target=#remove-user-modal
        "
    }}
    {{> button
        class="js-modal-trigger js-dropdown-cancel"
        theme="3"
        display="block"
        text="Удалить чат"
        attrs="
            data-target=#delete-chat-modal
        "
    }}
  {{/dropdown}}
  {{#> modal id="add-user-modal" heading="Добавить пользователя"}}
    <form class="js-add-user" action="#">
      <div class="gap-y-gen">
        {{> input
            class="js-add-user__input"
            name="add-user"
            id="add-user"
            hint="Логин"
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
  {{#> modal id="remove-user-modal" heading="Удалить пользователя"}}
    <form class="js-remove-user" action="#">
      <div class="gap-y-gen">
        {{> input
            class="js-remove-user__input"
            name="add-user"
            id="add-user"
            hint="Логин"
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
  {{#> modal id="delete-chat-modal" heading="Удалить чат"}}
    <form class="js-delete-chat" action="#">
      <div class="gap-y-gen">
        <p>Хотите удалить чат?</p>
      </div>
      <div class="field-row gap-y-gen">
        {{> button class="field-row__field" text="Отмена" theme="0" attrs="data-cancel='true'"}}
        {{> button class="field-row__field" type="submit" text="Да"}}
        {{> button class="field-row__field" type="submit" text="Да, для всех"}}
      </div>
    </form>
  {{/modal}}


{{/page}}
`;
