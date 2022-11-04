/* eslint-disable max-len */
import { cartService } from '../services/CartService';
import { productService } from '../services/ProductService';

export default class ProductStore {
  constructor() {
    this.product = {};

    this.thumbnailUrl = {};
    this.productImages = [];

    this.productOptions = [];
    this.selectedOption = {};

    this.reviews = [];
    this.bestReviews = [];

    this.totalRating = 0;
    this.totalPayment = 0;

    this.quantity = 1;
    this.reviewImages = [];

    this.selectOptionPrice = 0;

    this.listeners = new Set();
  }

  async fetchProduct(productId) {
    this.product = await productService.fetchProduct(productId);

    this.thumbnailUrl = this.product.images.find((productImage) => productImage.thumbnailImage).url;
    this.productImages = this.product.images.filter((productImage) => (productImage.thumbnailImage === false));

    this.productOptions = this.product.options;

    this.reviews = this.product.reviews;
    this.bestReviews = this.product.reviews.filter((review) => review.bestReview === true);
    this.bestReviews.length = 4;

    this.reviewImages = this.product.reviewImages;

    this.totalRating = this.product.reviews.reduce((accumulator, review) => accumulator + review.rating, 0)
    / this.reviews.length;

    this.publish();
  }

  async fetchwishes(productId, accessToken) {
    const wishNumber = await productService.fetchWishes(productId, accessToken);

    const number = wishNumber.wishNumber;

    this.product.wishes = number;

    this.publish();
  }

  async addCartItem(productId, accessToken) {
    await cartService.createCartItem(
      productId,
      accessToken,
      this.quantity,
      this.selectedOption,
    );

    this.publish();
  }

  selectOption(amount, productOption) {
    this.totalPayment = this.product.price + amount;

    this.selectOptionPrice = this.product.price + amount;

    this.quantity = 1;

    this.selectedOption = productOption;

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
