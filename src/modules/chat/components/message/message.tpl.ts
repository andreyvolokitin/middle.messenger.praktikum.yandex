export default `
<article
    class="{{class}} {{#isnt data.file null}}message_no-text{{/isnt}} {{#is data.user_id user.id}}message_self{{/is}} message"
    {{#if data.file}}
      data-attach="{{data.file.content_type}}"
    {{/if}}
>
  <div {{#if data.file.width}}style="width: {{data.file.width}}px;"{{/if}} class="message__content">
    {{#if data.file}}
      <a data-type="{{data.file.content_type}}" href="{{resourceURL data.file.path}}" class="message__attach block-link">
        {{#is data.file.content_type "media"}}
          {{> media
              class="message__attach-media"
              url=data.file.path
              width=data.file.width
              height=data.file.height
          }}
        {{/is}}
        {{#is data.file.content_type "file"}}
          {{> file class="message__attach-file" url=data.file.path name=data.file.filename size=data.file.content_size}}
        {{/is}}
      </a>
    {{/if}}
    {{#if data.content}}
      <span class="message__text">
        {{data.content}}
        <span class="message__meta">
          {{#is data.user_id user.id}}
            <span data-seen="{{data.is_read}}" class="message__status"></span>
          {{/is}}
          {{> time class="message__time" value=data.time}}
        </span>
      </span>
    {{else}}
      <span class="message__meta">
        {{#is data.user_id user.id}}
          <span data-seen="{{data.is_read}}" class="message__status"></span>
        {{/is}}
        {{> time class="message__time" value=data.time}}
      </span>
    {{/if}}
  </div>
</article>

`;
