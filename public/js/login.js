/* eslint-disable */

const BASE_URL = 'http://127.0.0.1:3000/api';

const login = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/v1/users/login`, {
      email,
      password,
    });

    console.log(res);
  } catch (err) {
    throw new Error(err.response.data.message);
  }
};

document.querySelector('.form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email').value;
  const passwordInput = document.getElementById('password').value;

  login(emailInput, passwordInput);
});
