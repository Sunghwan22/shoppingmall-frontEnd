/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class ProductService {
  async fetchProduct(productId) {
    const url = `${baseurl}/products/${productId}`;

    const { data } = await axios.get(url);

    return data;
  }

  async fetchWishes(productId, accessToken) {
    const url = `${baseurl}/products/wishes`;

    const { data } = await axios.post(url, { productId }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const wishNumber = data;

    return wishNumber;
  }
}

export const productService = new ProductService();
