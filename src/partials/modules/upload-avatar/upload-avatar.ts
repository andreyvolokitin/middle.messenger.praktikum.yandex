/*
 * todo: заменить на нормальный компонент
 * */

const UPLOADING_CLASS = 'is-uploading';
const UPLOADED_CLASS = 'is-uploaded';

const uploadAvatar = document.querySelector('.js-upload-avatar');

if (uploadAvatar) {
  const uploadAvatarInput = uploadAvatar.querySelector(
    '.js-upload-avatar__input'
  ) as HTMLInputElement;
  const uploadAvatarFile = uploadAvatar.querySelector('.js-upload-avatar__file') as HTMLElement;
  const uploadAvatarProgress = uploadAvatar.querySelector(
    '.js-upload-avatar__progress'
  ) as HTMLProgressElement;

  // eslint-disable-next-line no-inner-declarations
  function renderProgress(progress: number) {
    if (!uploadAvatar || !uploadAvatarProgress) {
      return;
    }

    uploadAvatarProgress.value = progress;

    if (progress < 1) {
      requestAnimationFrame(() => {
        renderProgress(progress + 0.01);
      });
    } else {
      uploadAvatar.classList.add(UPLOADED_CLASS);
      uploadAvatar.classList.remove(UPLOADING_CLASS);
    }
  }

  uploadAvatarInput.addEventListener('change', (e) => {
    const targetInput = e.target as HTMLInputElement;

    if (!targetInput || !targetInput.files) {
      return;
    }

    uploadAvatar.classList.add(UPLOADING_CLASS);
    uploadAvatar.classList.remove(UPLOADED_CLASS);
    renderProgress(0);
    uploadAvatarFile.textContent = targetInput.files[0].name;
  });
}
