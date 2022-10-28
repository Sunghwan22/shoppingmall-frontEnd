import { apiService } from '../services/ProductService';

export default class ProductStore {
  constructor() {
    this.product = {};

    this.listeners = new Set();
  }

  async fetchProduct(productId) {
    this.product = await apiService.fetchProduct(productId);

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

export const productStore = new ProductStore();
