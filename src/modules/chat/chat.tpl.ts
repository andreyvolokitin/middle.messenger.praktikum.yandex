export default `
<div class="js-chat chat">
  {{#isnt currentChat null}}
    <header class="chat__toolbar">
      <div class="chat__toolbar-slot_nav chat__toolbar-slot">
        {{> button
            theme="1"
            icon="menu"
            class="js-messenger-sidebar-open"
        }}
      </div>
      <div class="chat__toolbar-slot_main chat__toolbar-slot">
        {{> chat-preview tag="div" picSize="3.25rem" compact=1 chatData=currentChat}}
      </div>
      <div class="chat__toolbar-slot_actions chat__toolbar-slot">
        {{> button
            class="js-dropdown-trigger"
            icon="kebab-vertical"
            theme="1"
            title="Действия с чатом"
            attrs="data-target=#chat-actions-dropdown"
        }}
      </div>

    </header>
    <div class="chat__messages scrollbar">
      {{#each currentChat.messages as |message|}}
        {{#with (itemAt ../currentChat.messages (subtract @index 1))}}
          {{#and (gt @index 0) (isnt (isSameDate this.date message.date) true)}}
            </div>
          {{/and}}
          {{#or (eq @index 0) (isnt (isSameDate this.date message.date) true)}}
            <div class="chat__messages-day">
              <div class="chat__messages-day-header">
                {{> time class="chat__messages-day-label" value="23 ноября"}}
              </div>
              <ul class="chat__messages-list nolist">
          {{/or}}
        {{/with}}
          <li>
            {{> message class="chat__message" message=message}}
          </li>
      {{/each}}
          </ul>
        </div>
    </div>

    <form class="js-chat__input-form chat__input" action="#">
      <div class="chat__input-slot">
        {{#> button
            tag="label"
            class="focused-within"
            tabindex="-1"
            icon="paperclip"
            iconScale=1.5
            theme="1"
            title="Прикрепить любой файл"
        }}
          <input class="js-chat__attach-input sr-only" type="file" />
        {{/button}}
      </div>
      <div class="chat__input-slot_field chat__input-slot">
        {{> input
            area=1
            fixed=1
            theme="1"
            class="js-chat__input-field chat__input-field"
            name="message"
            id="chat-input-field"
            hint="Сообщение"
            attrs="data-height-limit=150"
        }}
      </div>
      <div class="chat__input-slot">
        {{> button
            icon="forward"
            iconScale=1.5
            theme="2"
            title="Отправить сообщение"
            type="submit"
        }}
      </div>
    </form>
  {{else}}
    <div class="chat__empty-msg">
      Выберите чат, чтобы отправить сообщение
    </div>
  {{/isnt}}
</div>

`;
