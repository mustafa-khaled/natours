/* eslint-disable */

import '@babel/polyfill';
import { login, logout } from './login';
import { displayMap } from './load-map';

// DOM elements
const loginForm = document.querySelector('.form');
const logoutBtn = document.querySelector('.nav__el--logout');

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
