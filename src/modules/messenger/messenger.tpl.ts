export default `
<main class="messenger">
  <div tabindex="-1" class="js-messenger__sidebar messenger__sidebar {{#if currentChat}}is-chat-selected{{/if}}">
    <header class="messenger__sidebar-head">
      <div class="messenger__sidebar-actions">
        {{> button
              class="js-messenger__sidebar-close messenger__sidebar-close"
              icon="close"
              theme="1"
              title="Hide sidebar"
          }}
        {{> button
            class="js-dropdown-trigger"
            icon="menu"
            theme="1"
            title="Меню"
            attrs="data-target=#menu-dropdown"
        }}
      </div>
      <div class="messenger__sidebar-search">
        <form class="js-chat-list__search-form" action="#">
          {{> input
              class="js-chat-list__search"
              type="search"
              name="chat-list-search"
              id="chat-list-search"
              hint="Поиск"
              theme="1"
          }}
        </form>
      </div>
    </header>
    <div class="js-messenger__chatlist-container messenger__sidebar-body scrollbar">
      {{> chat-list chats=chats}}
    </div>
  </div>
  <div class="js-messenger__chat messenger__chat">
    {{> chat user=user currentChat=currentChat}}
  </div>
</main>

{{#> dropdown id="menu-dropdown"}}
  {{> button
    class="js-dropdown-cancel"
    tag="a"
    href="/profile"
    attrs="data-router"
    icon="user"
    theme="3"
    display="block"
    text="Профиль"
  }}

  {{> button
      class="js-modal-trigger js-dropdown-cancel"
      theme="3"
      display="block"
      text="Создать чат"
      icon="add"
      attrs="
          data-target=#chat-create-modal
      "
  }}
{{/dropdown}}

{{#> modal _alias="chat-create-modal" id="chat-create-modal" heading="Создать чат"}}
  <form class="js-create-chat" action="#">
    <div class="gap-y-lg">
      {{> input
          class="js-create-chat__name-input"
          name="new-chat-name"
          id="new-chat-name"
          required="true"
          hint="Название чата"
          float=1
      }}
    </div>
    <div class="gap-y-lg">
      {{#> button
          tag="label"
          class="focused-within filepick"
          tabindex="-1"
          theme="4"
          display="block"
          text="Выбрать аватар"
      }}
        <input
            class="js-create-chat__avatar-input filepick__input sr-only"
            name="avatar"
            id="avatar"
            required
            accept="image/jpeg, image/png, image/gif, image/tiff, .jpg, .jpeg, .png, .gif, .tif, .tiff"
            type="file"
        />
        <div class="filepick__icon"></div>
      {{/button}}
    </div>
    <div class="gap-y-gen">
      {{> button
          display="block"
          type="submit"
          text="Создать"
      }}
    </div>
  </form>
{{/modal}}
{{> chat-actions-dropdown user=user currentChat=currentChat}}
{{> chat-admin-modals user=user currentChat=currentChat}}

`;
