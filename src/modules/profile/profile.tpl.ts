export default `
<div class="profile">
  <header class="profile__head">
    {{> profile-avatar avatar=user.avatar}}
  </header>
  {{> profile-content action=action user=user}}
</div>

{{#> modal _alias="profile-avatar-update-modal" id="profile-avatar-update-modal" heading="Загрузка аватара"}}
  <form class="js-profile-avatar-update" action="#">
    <div class="gap-y-gen">
      {{#> button
          tag="label"
          class="focused-within filepick"
          tabindex="-1"
          theme="4"
          display="block"
          text="Выбрать аватар"
      }}
        <input
            class="filepick__input sr-only"
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
          text="Поменять"
      }}
    </div>
  </form>
{{/modal}}

`;
