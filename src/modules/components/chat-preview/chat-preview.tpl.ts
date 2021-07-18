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
          {{> time raw=data.last_message.time value=data.last_message.time}}
        </div>
      {{/unless}}
    </div>
    {{#unless compact}}
      <div class="chat-preview__content-row">
        <div class="chat-preview__content-slot">
          <p class="chat-preview__txt">
            {{truncate data.last_message.content 200}}
          </p>
        </div>
        <div class="chat-preview__content-slot_unread chat-preview__content-slot">
          {{#if data.unread_count}}
            {{> badge value=data.unread_count}}
          {{/if}}
        </div>
      </div>
    {{/unless}}
  </div>
</{{default tag "div"}}>

`;
