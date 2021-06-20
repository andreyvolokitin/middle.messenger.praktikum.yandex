export default `
<form class="js-upload-avatar upload-avatar" action="#">
  <div class="gap-y-gen error_big error">Ошибка сети, повторите</div>
  <div class="gap-y-xs">
    <progress class="js-upload-avatar__progress upload-avatar__progress"></progress>
    <div>
      <span class="js-upload-avatar__file upload-avatar__file"></span>
    </div>
  </div>

  <div class="gap-y-gen">
    {{#> button
        tag="label"
        class="focused-within"
        tabindex="-1"
        theme="4"
        display="block"
        text="Выбрать файл"
    }}
      <input
          class="js-upload-avatar__input sr-only"
          accept="image/jpeg, image/png, image/gif, image/tiff, .jpg, .jpeg, .png, .gif, .tif, .tiff"
          type="file"
      />
    {{/button}}
  </div>
  <div class="gap-y-gen">
    {{> button
        display="block"
        type="submit"
        text="Поменять"
    }}
    <div class="error">Выберите файл</div>
  </div>
</form>

`;
