/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class WishApiService {
  async fetchProductWishes(productId) {
    const url = `${baseurl}/wishes/products/${productId}`;

    const { data } = await axios.get(url);

    return data.wishes;
  }

  async create(productId, accessToken) {
    const url = `${baseurl}/wishes/products/${productId}`;

    const { data } = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data.wishes;
  }
}

export const wishApiService = new WishApiService();
