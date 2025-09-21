/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const BASE_URL = 'http://localhost:3000/api';

export const login = async (email, password) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/v1/users/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message || 'Logged in successfully');
  }
};

export const logout = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/v1/users/logout`);

    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (err) {
    showAlert('error', 'Error: Logging out! Try again.');
  }
};
