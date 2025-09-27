/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const BASE_URL = 'http://localhost:3000/api';

export const updateUserData = async (name, email) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/v1/users/updateMe`,
      {
        name,
        email,
      },
      {
        withCredentials: true,
      },
    );

    if (res.data.status === 'success') {
      showAlert('success', `Profile updated successfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
