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

  async fetchProducts(number) {
    const url = `${baseurl}/products`;

    const { data } = await axios.get(url, {
      params: {
        page: number,
      },
    });

    return data;
  }
}

export const productApiService = new ProductApiService();
