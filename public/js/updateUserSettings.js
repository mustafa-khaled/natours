/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

const BASE_URL = 'http://localhost:3000/api';

export const updateUserSettings = async (data, type) => {
  try {
    const url = type === 'password' ? 'updateMyPassword' : 'updateMe';

    const res = await axios.patch(
      `${BASE_URL}/v1/users/${url}`,
      {
        ...data,
      },
      {
        withCredentials: true,
      },
    );

    if (res.data.status === 'success') {
      showAlert('success', `${type.toUpperCase()}: updated successfully`);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
