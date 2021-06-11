/*
 * todo: заменить на нормальный компонент
 * */

const MODAL_CLASS = 'js-modal';
const VISIBLE_CLASS = 'is-visible';

function toggleModal(modal: HTMLElement | null, force?: boolean) {
  if (!modal) {
    return;
  }

  const isOpened = modal.classList.toggle(VISIBLE_CLASS, force);

  if (isOpened) {
    modal.focus();
  }
}
function hideAllModals() {
  document.querySelectorAll(`.${MODAL_CLASS}.${VISIBLE_CLASS}`).forEach((modal: HTMLElement) => {
    toggleModal(modal, false);
  });
}

document.addEventListener('click', (e) => {
  if (!e.target) {
    return;
  }

  const target = e.target as HTMLElement;
  const modalTrigger = target.closest('.js-modal-trigger') as HTMLElement;
  const clickedModal = target.closest(`.${MODAL_CLASS}`) as HTMLElement;
  const modalCloser = target.closest('.js-modal__close, [data-cancel]') as HTMLElement;

  if (modalTrigger) {
    e.preventDefault();
    const modal = document.querySelector(modalTrigger.dataset.target as string) as HTMLElement;

    toggleModal(modal, true);
  } else if (!clickedModal) {
    hideAllModals();
  }

  if (modalCloser) {
    toggleModal(modalCloser.closest(`.${MODAL_CLASS}`), false);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideAllModals();
  }
});
