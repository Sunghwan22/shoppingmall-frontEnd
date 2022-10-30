/* eslint-disable max-len */
import { productService } from '../services/ProductService';

export default class ProductStore {
  constructor() {
    this.product = {};

    this.thumbnailUrl = {};

    this.productOptions = [];

    this.totalPayment = 0;

    this.quantity = 1;

    this.selectOptionPrice = 0;

    this.listeners = new Set();
  }

  async fetchProduct(productId) {
    this.product = await productService.fetchProduct(productId);

    this.thumbnailUrl = this.product.productImages.find((productImage) => productImage.thumbnailImage).url;

    this.productOptions = this.product.options;

    this.publish();
  }

  async fetchwishes(prodcutId, accessToken) {
    this.product.wishes = await productService.fetchWishes(prodcutId, accessToken);

    this.publish();
  }

  selectOption(amount) {
    this.totalPayment = this.product.price + amount;

    this.selectOptionPrice = this.product.price + amount;

    this.quantity = 1;

    this.publish();
  }

  addQuantity() {
    if (this.quantity >= this.product.maximumQuantity) {
      return;
    }

    this.quantity += 1;

    this.totalPayment += this.selectOptionPrice;

    this.publish();
  }

  reduceQuantity() {
    if (this.quantity === 1) {
      return;
    }

    this.quantity -= 1;

    this.totalPayment -= this.selectOptionPrice;

    this.publish();
  }

  resetQuantityAndTotalPayment() {
    this.totalPayment = 0;
    this.quantity = 1;

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
