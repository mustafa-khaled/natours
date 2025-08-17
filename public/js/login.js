/* eslint-disable */

const BASE_URL = 'http://127.0.0.1:3000';
const form = document.querySelector('.form');

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `${BASE_URL}/api/v1/users/login`,
      data: { email, password },
    });
    console.log(res);
  } catch (err) {
    console.error(err?.response?.data || err.message);
  }
};

// ✅ only attach if form exists
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    // Pass email and password separately
    login(emailInput, passwordInput);
  });
}
