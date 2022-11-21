import { wishApiService } from '../services/WishApiService';

export default class WishStore {
  constructor() {
    this.productWishes = [];

    this.listeners = new Set();
  }

  async fetchProductWishes(productId) {
    this.productWishes = await wishApiService.fetchProductWishes(productId);

    this.publish();
  }

  async createWishes(productId, accessToken) {
    try {
      this.productWishes = await wishApiService.create(productId, accessToken);
    } catch (error) {
      const { message } = error.response.data;
      this.errorMessage = message;
    }

    this.publish();
  }

  subscribe(listener) {
    this.listeners.add(listener);

    this.publish();
  }

  unSubscribe(listener) {
    this.listeners.delete(listener);

    this.publish();
  }

  publish() {
    this.listeners.forEach((listener) => listener());
  }
}

export const wishStore = new WishStore();
