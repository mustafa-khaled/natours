/* eslint-disable */

import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './load-map';
import { updateUserSettings } from './updateUserSettings';

// DOM elements
const loginForm = document.querySelector('.form--login');
const logoutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;
    login(emailInput, passwordInput);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('location-list');
  if (!container) return;

  let locations;
  try {
    const data = container.dataset.locations;
    locations = JSON.parse(data);
  } catch (err) {
    console.error('Error parsing locations:', err);
    return;
  }

  displayMap(locations);
});

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateUserSettings({ name, email }, 'profile');
  });

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const savePasswordBtn = document.querySelector('.btn--save-password');
    savePasswordBtn.textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateUserSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    savePasswordBtn.textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
