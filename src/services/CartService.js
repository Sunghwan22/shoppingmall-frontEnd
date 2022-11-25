import axios from 'axios';
import config from '../../config';
import APIService from './APIService';

const baseurl = config.apiBaseUrl;

export default class CartService extends APIService {
  constructor() {
    super();
  }

  async createCartItem(productId, accessToken, quantity, option) {
    const url = `${baseurl}/cart/product/${productId}`;

    const { data } = await axios.post(url, { quantity, option }, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return data;
  }
}

export const cartService = new CartService();
