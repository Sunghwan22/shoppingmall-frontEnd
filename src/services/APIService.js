export default class APIService {
  constructor() {
    this.accessToken = '';
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  getAccessToken() {
    return this.accessToken;
  }
}

export const apiService = new APIService();
