import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class CartApiService {
  async createCartItem(productId, accessToken, quantity, option, totalPayment) {
    const url = `${baseurl}/carts/products/${productId}/cartItems`;

    console.log(totalPayment);

    const { data } = await axios.post(url, { quantity, option, totalPayment }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async fetchCartItems({ accessToken, page }) {
    const url = `${baseurl}/carts`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        page,
      },
    });

    return data;
  }
}

export const cartApiService = new CartApiService();
