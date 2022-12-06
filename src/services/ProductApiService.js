/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class ProductApiService {
  async fetchProduct(productId) {
    const url = `${baseurl}/products/${productId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchProducts({ page }) {
    const url = `${baseurl}/products`;

    const { data } = await axios.get(url, {
      params: {
        page,
      },
    });

    return data;
  }

  async fetchWishItems(accessToken) {
    const url = `${baseurl}/user/me/wishItems`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { wishItems } = data;

    return wishItems;
  }

  async deleteCartItem(productId, accessToken) {
    const url = `${baseurl}/wishItems/${productId}`;

    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export const productApiService = new ProductApiService();
