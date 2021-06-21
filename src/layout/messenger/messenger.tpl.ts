export default `
<main class="messenger">
  <div tabindex="-1" class="{{#isnt currentChat null}}is-closed{{/isnt}} js-messenger__sidebar messenger__sidebar">
    <header class="messenger__sidebar-head">
      <div class="messenger__sidebar-actions">
        {{#isnt currentChat null}}
          {{> button
              class="js-messenger__sidebar-close messenger__sidebar-close"
              icon="close"
              theme="1"
              title="Hide sidebar"
          }}
        {{/isnt}}
        {{> button tag="a" href="/user-info" icon="user" theme="1" title="Ваш профиль"}}
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
    <div class="messenger__sidebar-body scrollbar">
      {{> chat-list chats=chats currentChat=currentChat}}
    </div>
  </div>
  <div class="messenger__chat">
    {{> chat currentChat=currentChat}}
  </div>
</main>
`;