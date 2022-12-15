import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class OrderApiService {
  async createOrder(orderInformation, accessToken) {
    const url = `${baseurl}/orders`;

    const { data } = await axios.post(url, orderInformation, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return data;
  }

  async fetchPayResult(pgToken) {
    const url = `${baseurl}/orders/kakaoPaySuccess`;

    const { data } = await axios.get(url, {
      params: {
        pg_token: pgToken,
      },
    });

    return data;
  }

  async fetchWriteableReviewProducts({ accessToken, page }) {
    const url = `${baseurl}/user/me/writeableReviewProducts`;

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

  async fetchWriteableProduct(id) {
    const url = `${baseurl}/user/me/writeableReviewProducts/${id}`;

    const { data } = await axios.get(url);

    console.log(data);

    return data;
  }
}

export const orderApiService = new OrderApiService();
