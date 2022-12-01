import { wishApiService } from '../services/WishApiService';
import Store from './Store';

export default class WishStore extends Store {
  constructor() {
    super();

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
}

export const wishStore = new WishStore();
