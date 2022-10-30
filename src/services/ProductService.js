/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class ProductService {
  async fetchProduct(productId) {
    const url = `${baseurl}/products/${productId}`;
    const { data } = await axios.get(url);

    const product = data;

    return product;
  }

  async fetchWishes(prodcutId, accessToken) {
    const url = `${baseurl}/products/wishes/${prodcutId}`;

    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${{ accessToken }}`,
      },
    });

    const wishes = data;

    return wishes;
  }
}

export const productService = new ProductService();
