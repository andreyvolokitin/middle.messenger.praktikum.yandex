import Block from '../../modules/block';
import template from './dropdown.tpl';
import debounce from '../../utils/debounce';
import onEscapePress from '../../utils/onEscapePress';

const VISIBLE_CLASS = 'is-visible';
const ACTIVE_TRIGGER_CLASS = 'is-active';
const TRIGGER_SUFFIX = '-trigger';
const CANCEL_SUFFIX = '-cancel';

const triggers = new WeakMap();
const instances = new WeakMap();

function toggle(dropdown: HTMLElement | null, targetTrigger: HTMLElement | null, force?: boolean) {
  if (!dropdown) {
    return;
  }

  const triggerSet = triggers.get(dropdown);
  let isOpened;

  if (targetTrigger) {
    if (typeof force === 'undefined' && targetTrigger.classList.contains(ACTIVE_TRIGGER_CLASS)) {
      dropdown.classList.remove(VISIBLE_CLASS);
      isOpened = false;
    }

    if (typeof force === 'undefined' && !targetTrigger.classList.contains(ACTIVE_TRIGGER_CLASS)) {
      dropdown.classList.add(VISIBLE_CLASS);
      isOpened = true;
    }
  } else {
    isOpened = dropdown.classList.toggle(VISIBLE_CLASS, force);
  }

  if (triggerSet) {
    triggerSet.forEach((savedTrigger: HTMLElement) => {
      if (savedTrigger === targetTrigger) {
        savedTrigger.classList.toggle(ACTIVE_TRIGGER_CLASS, force);
      } else {
        savedTrigger.classList.remove(ACTIVE_TRIGGER_CLASS);
      }
    });
  }
  if (isOpened) {
    dropdown.focus();
  }
}

interface DropdownProps extends Props {
  id: string;
  class?: string;
  settings?: {
    indent?: number;
    position?: 'left top' | 'right top' | 'left bottom' | 'right bottom';
  };
}

export default class Dropdown extends Block {
  static TEMPLATE = template;

  static DEPS = {};

  static klass = 'js-dropdown';

  private readonly _settings: Record<string, unknown> = {
    indent: 5,
    position: 'left top',
  };

  constructor(props: DropdownProps, children: Children) {
    super(props, children);

    this._settings = {
      ...this._settings,
      ...props.settings,
    };

    instances.set(this.element, this);
  }

  positionAt(target: HTMLElement): void {
    const dropdownRect = this.element.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const { indent, position } = this._settings;
    const pos = (position as string).split(' ');
    let { left } = targetRect;
    let top = targetRect.bottom + (indent as number);
    const isOverflowX = left + dropdownRect.width > window.innerWidth;
    const isOverflowY =
      targetRect.bottom + dropdownRect.height + (indent as number) > window.innerHeight;

    if (pos[0] === 'right' || isOverflowX) {
      left = targetRect.left - (dropdownRect.width - targetRect.width);
    }

    if (pos[1] === 'bottom' || isOverflowY) {
      top = targetRect.top - (dropdownRect.height + (indent as number));
    }

    this.element.style.left = `${left + window.scrollX}px`;
    this.element.style.top = `${top + window.scrollY}px`;
  }

  toggle(target: HTMLElement): void {
    toggle(this.element, target);
    this.positionAt(target);
  }

  open(target: HTMLElement): void {
    toggle(this.element, target, true);
    this.positionAt(target);
  }

  close(): void {
    toggle(this.element, null, false);
  }
}

function hideAllDropdowns() {
  document
    .querySelectorAll(`.${Dropdown.klass}.${VISIBLE_CLASS}`)
    .forEach((dropdown: HTMLElement) => toggle(dropdown, null, false));
}

document.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const dropdownTrigger = target.closest(`.${Dropdown.klass}${TRIGGER_SUFFIX}`) as HTMLElement;
  const clickedDropdown = target.closest(`.${Dropdown.klass}`) as HTMLElement;
  const clickedCancel = target.closest(`.${Dropdown.klass}${CANCEL_SUFFIX}`) as HTMLElement;

  if (dropdownTrigger) {
    const targetDropdown = document.querySelector(
      dropdownTrigger.dataset.target as string
    ) as HTMLElement;
    const instance = instances.get(targetDropdown);

    if (triggers.has(targetDropdown)) {
      triggers.get(targetDropdown).add(dropdownTrigger);
    } else {
      triggers.set(targetDropdown, new Set([dropdownTrigger]));
    }

    instance.toggle(dropdownTrigger);
  } else if (!clickedDropdown) {
    hideAllDropdowns();
  } else if (clickedCancel) {
    const instance = instances.get(clickedCancel.closest(`.${Dropdown.klass}`) as HTMLElement);

    instance.close();
  }
});

window.addEventListener('resize', debounce(150, hideAllDropdowns, true));
window.addEventListener('orientationchange', debounce(0, hideAllDropdowns));
onEscapePress(hideAllDropdowns);
