/*
* todo: заменить на нормальный компонент
* */

const UPLOADING_CLASS = 'is-uploading';
const UPLOADED_CLASS = 'is-uploaded';

const uploadAvatar = document.querySelector('.js-upload-avatar');

if (uploadAvatar) {
  const uploadAvatarInput = uploadAvatar.querySelector('.js-upload-avatar__input');
  const uploadAvatarFile = uploadAvatar.querySelector('.js-upload-avatar__file');
  const uploadAvatarProgress = uploadAvatar.querySelector('.js-upload-avatar__progress');

  function renderProgress(progress) {
    uploadAvatarProgress.value = progress;

    if (progress < 1) {
      requestAnimationFrame(() => {
        renderProgress(progress + .01);
      });
    } else {
      uploadAvatar.classList.add(UPLOADED_CLASS);
      uploadAvatar.classList.remove(UPLOADING_CLASS);
    }
  }

  uploadAvatarInput.addEventListener('change', (e) => {
    uploadAvatar.classList.add(UPLOADING_CLASS);
    uploadAvatar.classList.remove(UPLOADED_CLASS);
    renderProgress(0);
    uploadAvatarFile.textContent = e.target.files[0].name;
  });
}
