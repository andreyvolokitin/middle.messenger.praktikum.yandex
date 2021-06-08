/*
* todo: заменить на нормальный компонент
* */

const authForm = document.querySelector('.js-auth__form');

function getFormData(form) {
  return new FormData(form);
}

if (authForm) {
  document
    .querySelector('.js-auth__test-feature')
    .addEventListener('click', (e) => {
      const filledEntries = [...getFormData(authForm)].filter((entry) => entry[1]);

      console.log(Object.fromEntries(filledEntries));
    });
}
