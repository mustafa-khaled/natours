/* eslint-disable */

import axios from 'axios';

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
      alert('Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
    // throw new Error(err.response.data.message);
  }
};
