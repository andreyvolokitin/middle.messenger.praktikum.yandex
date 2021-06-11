/*
 * todo: заменить на нормальный компонент
 * */

function getFormData(form: HTMLFormElement) {
  return Object.fromEntries([...new FormData(form)].filter((entry) => entry[1]));
}
