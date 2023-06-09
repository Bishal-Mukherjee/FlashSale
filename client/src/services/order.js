import axios from 'axios';
import { SERVER_URL } from './url';

export const getorders = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      url: `${SERVER_URL}/orders/getorders`,
      method: 'GET',
      headers: {
        token,
      },
    });
    return response.data.orders;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const placeorder = async ({ product }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      url: `${SERVER_URL}/orders/placeorder`,
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
