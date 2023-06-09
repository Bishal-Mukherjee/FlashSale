import axios from 'axios';
import { SERVER_URL } from './url';

export const login = async ({ email, password }) => {
  try {
    const response = await axios({
      url: `${SERVER_URL}/users/login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { email, password },
    });
    const { token, user } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return response.data.user;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getprofile = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      url: `${SERVER_URL}/users/profile`,
      method: 'GET',
      headers: {
        token,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const editprofile = async ({ address }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      url: `${SERVER_URL}/users/editprofile`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      data: { address },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getallusers = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      url: `${SERVER_URL}/users/getallusers`,
      method: 'GET',
      headers: {
        token,
      },
    });

    console.log(response.data);

    if (response.data.users) {
      return { users: response.data.users };
    }
    return {
      users: [],
      message: 'Access denied',
    };
  } catch (err) {
    console.log(err);
    return err;
  }
};
