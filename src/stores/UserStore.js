/* eslint-disable consistent-return */
import { userApiService } from '../services/UserAPIService';
import Store from './Store';

export default class UserStore extends Store {
  constructor() {
    super();

    this.name = '';
    this.phoneNumber = '';
    this.address = {};

    this.errorMessage = '';
  }

  async fetchUser(accessToken) {
    console.log('임시방편');

    const { name, phoneNumber, address } = await userApiService.fetchUser(accessToken);

    this.name = name;
    this.phoneNumber = phoneNumber;
    this.address = address;

    this.publish();
  }

  async login({ identifier, password }) {
    try {
      const {
        accessToken, name, phoneNumber, address,
      } = await userApiService.postSession({ identifier, password });

      this.name = name;
      this.phoneNumber = phoneNumber;
      this.address = address;

      return accessToken;
    } catch (e) {
      const error = e.response.data;
      this.errorMessage = error.message;
      this.publish();
    }
  }

  async sendAuthcode(authCode) {
    const data = await userApiService.kakaoLogin(authCode);

    this.publish();

    return data;
  }
}

export const userStore = new UserStore();
