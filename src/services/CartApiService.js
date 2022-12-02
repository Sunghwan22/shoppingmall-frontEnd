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

  async deleteCartItems(cartItemsId) {
    console.log(cartItemsId);

    const url = `${baseurl}/carts/cartItems`;

    await axios.delete(url, { data: { cartItemsId } });
  }
}

export const cartApiService = new CartApiService();
