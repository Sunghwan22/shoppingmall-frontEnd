import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class CartService {
  async createCartItem(productId, accessToken, quantity, option) {
    const url = `${baseurl}/carts/products/${productId}cartItems`;// 이거는 그러면 cartItem컨트롤러인가 cart컨트롤러인가

    const { data } = await axios.post(url, { quantity, option }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }
}

export const cartService = new CartService();
