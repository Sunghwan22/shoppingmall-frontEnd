/* eslint-disable class-methods-use-this */
import axios from 'axios';
import config from '../../config';

const baseurl = config.apiBaseUrl;

export default class UserAPIService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  async fetchUser(accessToken) {
    const url = `${baseurl}/session/me`;
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log(data);

    const { recipient, phoneNumber, address } = data;

    return { recipient, phoneNumber, address };
  }

  async postSession({ identifier, password }) {
    const url = `${baseurl}/session`;

    const { data } = await axios.post(url, { identifier, password });

    return {
      accessToken: data.accessToken,
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
    };
  }

  async kakaoLogin(oauthCode) {
    const url = `${baseurl}/oauth/kakao-token`;

    const { data } = await axios.get(url, {
      params: {
        oauthCode,
      },
    });

    return data;
  }

  async updateAddress(deliveryInformation, accessToken) {
    const url = `${baseurl}/users/address`;

    await axios.patch(url, deliveryInformation, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

export const userApiService = new UserAPIService();
