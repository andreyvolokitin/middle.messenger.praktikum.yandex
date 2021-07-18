export default `
{{#> dropdown user=user currentChat=currentChat class="js-chat-actions-dropdown" id="chat-actions-dropdown"}}
  {{#eq user.id currentChat.created_by}}
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
  {{/eq}}
  {{> button
      class="js-dropdown-cancel"
      theme="3"
      display="block"
      text="Действие"
  }}
{{/dropdown}}
`;
