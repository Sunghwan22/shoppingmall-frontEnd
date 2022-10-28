/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class ProductService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchProduct(productId) {
    const url = `${baseurl}/products/${productId}`;
    const { data } = await axios.get(url);

    const product = data;

    return product;
  }
}

export const productService = new ProductService();
