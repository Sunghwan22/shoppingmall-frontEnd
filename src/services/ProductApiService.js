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

  async searchProduct(word) {
    const url = `${baseurl}/products/search`;

    const { data } = await axios.get(url, {
      params: {
        word,
      },
    });

    return data;
  }
}

export const productApiService = new ProductApiService();
