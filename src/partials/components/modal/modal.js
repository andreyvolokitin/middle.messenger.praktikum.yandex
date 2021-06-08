/*
* todo: заменить на нормальный компонент
* */

const MODAL_CLASS = 'js-modal';
const VISIBLE_CLASS = 'is-visible';

function toggleModal(modal, force) {
  if (!modal) {
    return;
  }

  const isOpened = modal.classList.toggle(VISIBLE_CLASS, force);

  isOpened && modal.focus();
}
function hideAllModals() {
  document.querySelectorAll(`.${MODAL_CLASS}.${VISIBLE_CLASS}`).forEach((modal) => {
    toggleModal(modal, false);
  });
}


document.addEventListener('click', (e) => {
  const modalTrigger = e.target.closest('.js-modal-trigger');
  const clickedModal = e.target.closest(`.${MODAL_CLASS}`);
  const modalCloser = e.target.closest('.js-modal__close, [data-cancel]');

  if (modalTrigger) {
    e.preventDefault();
    const modal = document.querySelector(modalTrigger.dataset.target);

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
