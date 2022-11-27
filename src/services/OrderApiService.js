import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class OrderApiService {
  async createOrder(orderInformation, accessToken) {
    const url = `${baseurl}/orders`;

    const data = await axios.post(url, { ...orderInformation }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }
}

export const orderApiService = new OrderApiService();
