/* eslint-disable */

export function hideAlert() {
  const alertElement = document.querySelector('.alert');
  if (alertElement) alertElement.parentElement.removeChild(alertElement);
}

// type can be 'success', 'error'
export function showAlert(type, message) {
  hideAlert();

  const markup = `<div class="alert alert--${type}">${message}</div>`;

  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(() => hideAlert, 5000);
}
