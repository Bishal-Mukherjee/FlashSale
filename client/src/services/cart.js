import axios from 'axios';
import { SERVER_URL } from './url';

export const getcart = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      url: `${SERVER_URL}/orders/getcart`,
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

export const addtocart = async ({ product }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      url: `${SERVER_URL}/orders/addtocart`,
      method: 'POST',
      headers: {
        token,
      },
      data: { product },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
