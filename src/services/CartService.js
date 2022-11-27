import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class CartService {
  async createCartItem(productId, accessToken, quantity, option) {
    const url = `${baseurl}/cart/product/${productId}`;

    const { data } = await axios.post(url, { quantity, option }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }
}

export const cartService = new CartService();
