export default `
<{{default tag "div"}}
  class="{{class}} {{#if compact}}chat-preview_compact{{/if}} chat-preview {{#or (is tag null) (is tag "a")}}block-link{{/or}} sider"
  {{#is tag "a"}}
    href="{{default href "#"}}"
  {{/is}}
>
  <div class="sider__side">
    {{> avatar class="js-dropdown-trigger" attrs="data-target=#chat-actions-dropdown" size=picSize url=chatData.avatar}}
  </div>
  <div class="chat-preview__content sider__main">
    <div class="chat-preview__content-row">
      <div class="chat-preview__content-slot">
        <h5 class="chat-preview__head heading">{{chatData.name}}</h5>
      </div>
      {{#unless compact}}
        <div class="chat-preview__content-slot_date chat-preview__content-slot">
          {{! todo: использовать хэлпер для форматирования дат}}
          {{> time value="12:30"}}
        </div>
      {{/unless}}
    </div>
    {{#unless compact}}
      <div class="chat-preview__content-row">
        <div class="chat-preview__content-slot">
          <p class="chat-preview__txt">
            {{#withLast chatData.messages}}
              {{truncate this.text 200}}
            {{/withLast}}
          </p>
        </div>
        <div class="chat-preview__content-slot_unread chat-preview__content-slot">
          {{#if chatData.unread}}
            {{> badge value=chatData.unread}}
          {{/if}}
        </div>
      </div>
    {{/unless}}
  </div>
</{{default tag "div"}}>

`;