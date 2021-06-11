/*
 * todo: заменить на нормальный компонент
 * */

import debounce from '../../../utils/debounce';

const VISIBLE_CLASS = 'is-visible';

const dropdowns = new WeakMap();

function toggleDropdown(dropdown: HTMLElement | null, force?: boolean) {
  if (!dropdown) {
    return;
  }

  const toggle = dropdowns.get(dropdown);
  const isOpened = dropdown.classList.toggle(VISIBLE_CLASS, force);

  if (toggle) {
    toggle.classList.toggle('is-active', force);
  }
  if (isOpened) {
    dropdown.focus();
  }
}
function hideAllDropdowns() {
  document.querySelectorAll(`.js-dropdown.${VISIBLE_CLASS}`).forEach((dropdown: HTMLElement) => {
    toggleDropdown(dropdown, false);
  });
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const dropdownToggle = target.closest('.js-dropdown-toggle') as HTMLElement;
  const clickedDropdown = target.closest('.js-dropdown') as HTMLElement;

  if (dropdownToggle) {
    const targetDropdown = document.querySelector(
      dropdownToggle.dataset.target as string
    ) as HTMLElement;

    dropdowns.set(targetDropdown, dropdownToggle);
    toggleDropdown(targetDropdown);

    const toggleBrect = dropdownToggle.getBoundingClientRect();
    const dropdownBrect = targetDropdown.getBoundingClientRect();

    targetDropdown.style.top = `${toggleBrect.top + toggleBrect.height}px`;
    targetDropdown.style.left = `${toggleBrect.right - dropdownBrect.width}px`;
  } else if (!clickedDropdown) {
    hideAllDropdowns();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hideAllDropdowns();
  }
});

window.addEventListener('resize', debounce(150, hideAllDropdowns, true));
window.addEventListener('orientationchange', debounce(0, hideAllDropdowns));
