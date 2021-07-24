export default `
<article
    class="{{class}} {{#isnt data.file null}}message_no-text{{/isnt}} {{#is data.userId user.id}}message_self{{/is}} message"
    {{#if data.file}}
      data-attach="{{#if (startsWith data.file.contentType 'image/')}}media{{else}}file{{/if}}"
    {{/if}}
>
  <div {{#if data.file.width}}style="width: {{data.file.width}}px;"{{/if}} class="message__content">
    {{#if data.file}}
      <a data-type="{{#if (startsWith data.file.contentType 'image/')}}media{{else}}file{{/if}}" href="{{resourceURL data.file.path}}" class="message__attach block-link">
        {{#is (startsWith data.file.contentType "image/") true}}
          {{> media
              class="message__attach-media"
              url=data.file.path
              width=data.file.width
              height=data.file.height
          }}
        {{/is}}
        {{#isnt (startsWith data.file.contentType "image/") true}}
          {{> file class="message__attach-file" url=data.file.path name=data.file.filename size=data.file.contentSize}}
        {{/isnt}}
      </a>
    {{/if}}
    {{#and data.content (is data.file null)}}
      <span class="message__text">
        {{data.content}}
        <span class="message__meta">
          {{#is data.userId user.id}}
            <span data-seen="{{#if data.isRead}}true{{else}}false{{/if}}" class="message__status"></span>
          {{/is}}
          {{> time class="message__time" value=data.time}}
        </span>
      </span>
    {{else}}
      <span class="message__meta">
        {{#is data.userId user.id}}
          <span data-seen="{{#if data.isRead}}true{{else}}false{{/if}}" class="message__status"></span>
        {{/is}}
        {{> time class="message__time" value=data.time}}
      </span>
    {{/and}}
  </div>
</article>

`;
