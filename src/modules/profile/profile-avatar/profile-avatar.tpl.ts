export default `
    {{> avatar
        tag="a"
        class="js-modal-trigger profile__pic"
        size="10rem"
        theme="1"
        url=avatar
        attrs="
          data-target='#profile-avatar-update-modal'
          data-label='Поменять аватар'
        "
    }}
`;
