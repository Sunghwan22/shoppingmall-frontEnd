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

    const { name, phoneNumber, address } = data;

    return { name, phoneNumber, address };
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
}

export const userApiService = new UserAPIService();
