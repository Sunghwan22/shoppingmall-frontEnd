import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class CartApiService {
  async createCartItem(productId, accessToken, quantity, option, totalPayment) {
    const url = `${baseurl}/carts/products/${productId}/cartItems`;

    const { data } = await axios.post(url, { quantity, option, totalPayment }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async fetchCartItems(accessToken) {
    const url = `${baseurl}/carts`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async deleteCartItems(cartItemsId) {
    const url = `${baseurl}/carts/cartItems`;

    await axios.delete(url, { data: { cartItemsId } });
  }

  async fetchCartItem(cartItemId) {
    const url = `${baseurl}/carts/cartItems/${cartItemId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async updateCartItem(
    cartItemId,
    addAmount,
    description,
    quantity,
    totalPrice,
  ) {
    const url = `${baseurl}/carts/cartItems/${cartItemId}`;

    await axios.patch(url, {
      addAmount, description, quantity, totalPrice,
    });
  }
}

export const cartApiService = new CartApiService();
