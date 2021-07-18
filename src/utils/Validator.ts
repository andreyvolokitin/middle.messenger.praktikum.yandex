import addEventListener from './addEventListener';

const HAS_ERROR_CLASS = 'has-error';
const ERROR_CLASS = 'error';

export default class Validator {
  public options: Record<string, unknown>;

  public form: HTMLFormElement;

  public elements: Element[];

  public valid: boolean;

  private _handlers: (() => void)[];

  constructor(
    form: HTMLFormElement,
    options = {
      ignoreSelector: '.ignore',
    }
  ) {
    this.options = options;
    this.form = form;
    this.form.setAttribute('novalidate', 'true');
    this.elements = [...form.elements];
    this.valid = true;

    this._handlers = [
      addEventListener(this.form, 'submit', (e) => this.onSubmit(e)),
      addEventListener(this.form, 'reset', () => this.onReset()),
      addEventListener(this.form, 'focusin', (e: FocusEvent) =>
        this.validateField(e.target as HTMLFormElement)
      ),
      addEventListener(this.form, 'focusout', (e: FocusEvent) =>
        this.validateField(e.target as HTMLFormElement)
      ),
      addEventListener(this.form, 'input', (e: FocusEvent) =>
        this.validateField(e.target as HTMLFormElement)
      ),
    ];
  }

  private _isValidatableField(field: HTMLFormElement): boolean {
    return !(
      field.matches(
        `
        button,
        label,
        input[type="submit"],
        input[type="image"],
        input[type="button"],
        input[type="reset"],
        ${this.options.ignoreSelector}
        `
      ) ||
      !field.form ||
      field.disabled ||
      field.readOnly
    );
  }

  onSubmit(e: Event): void {
    const isValidForm = this.validateForm();

    if (!isValidForm) {
      e.preventDefault();
    }
  }

  onReset(): void {
    this.elements.forEach((elem: HTMLFormElement) => this.toggleError(elem, '', false));
  }

  toggleError(field: HTMLElement, errorText: string | false, force: boolean): void {
    const inputWrap = field.closest('.input');
    let errorElem;

    if (field.nextElementSibling && field.nextElementSibling.matches(`.${ERROR_CLASS}`)) {
      errorElem = field.nextElementSibling;
    }

    if (inputWrap) {
      inputWrap.classList.toggle(HAS_ERROR_CLASS, force);
    } else {
      field.classList.toggle(HAS_ERROR_CLASS, force);
    }

    if (force) {
      if (errorElem) {
        errorElem.textContent = errorText || '';
      } else {
        field.insertAdjacentHTML('afterend', `<div class="${ERROR_CLASS}">${errorText}</div>`);
      }
    } else if (errorElem) {
      errorElem.parentNode!.removeChild(errorElem);
    }
  }

  validateField(field: HTMLFormElement): Record<string, unknown> | true {
    if (!this._isValidatableField(field)) {
      return true;
    }

    const { validity } = field;

    const errors = {} as Record<string, unknown>;

    Object.keys(this.rules.validity).forEach((rule) => {
      if (!validity[rule]) {
        return;
      }

      let msg;

      if (typeof (this.rules.validity as Record<string, unknown>)[rule] === 'string') {
        msg = (this.rules.validity as Record<string, unknown>)[rule];
      } else {
        msg = ((this.rules.validity as Record<string, unknown>)[rule] as Record<string, unknown>)[
          field.type
        ];
      }

      errors[rule] = msg;
    });

    const errorNames = Object.keys(errors);

    if (errorNames.length) {
      this.toggleError(field, errors[errorNames[0]] as string, true);
    } else {
      this.toggleError(field, false, false);
    }

    return errorNames.length ? errors : true;
  }

  validateForm(): boolean {
    let allValid = true;

    this.valid = true;

    this.elements.forEach((elem: HTMLFormElement) => {
      const result = this.validateField(elem);

      if (result !== true) {
        allValid = false;
        this.valid = false;
      }
    });

    return allValid;
  }

  rules = {
    validity: {
      patternMismatch: {
        tel: 'Укажите телефон в формате +7(232)232-23-23',
      },
      typeMismatch: {
        email: 'Верно укажите email',
      },
      valueMissing: 'Укажите значение',
    },
    custom: {},
  };

  destroy(): void {
    this._handlers.forEach((remove) => remove && remove());
    this._handlers = [];
  }
}
