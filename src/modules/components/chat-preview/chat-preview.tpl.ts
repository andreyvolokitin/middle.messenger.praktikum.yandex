export default `
<{{default tag "div"}}
  class="{{class}} {{#if compact}}chat-preview_compact{{/if}} chat-preview {{#or (is tag null) (is tag "a")}}block-link{{/or}} sider"
  {{#is tag "a"}}
    href="{{default href "#"}}"
  {{/is}}
  {{{attrs}}}
>
  <div class="sider__side">
    {{> avatar size=picSize url=data.avatar}}
  </div>
  <div class="chat-preview__content sider__main">
    <div class="chat-preview__content-row">
      <div class="chat-preview__content-slot">
        <h5 class="chat-preview__head heading">{{data.title}}</h5>
      </div>
      {{#unless compact}}
        <div class="chat-preview__content-slot_date chat-preview__content-slot">
          {{> time raw=data.lastMessage.time value=data.lastMessage.time}}
        </div>
      {{/unless}}
    </div>
    {{#unless compact}}
      <div class="chat-preview__content-row">
        <div class="chat-preview__content-slot">
          <p class="chat-preview__txt">
            {{truncate data.lastMessage.content 200}}
          </p>
        </div>
        <div class="chat-preview__content-slot_unread chat-preview__content-slot">
          {{#if data.unreadCount}}
            {{> badge value=data.unreadCount}}
          {{/if}}
        </div>
      </div>
    {{/unless}}
  </div>
</{{default tag "div"}}>

`;
