/* eslint-disable max-len */
import { cartService } from '../services/CartService';
import { productApiService } from '../services/ProductApiService';
import Store from './Store';

export default class ProductStore extends Store {
  constructor() {
    super();

    this.product = {};
    this.products = [];

    this.options = [];

    this.thumbnailImage = {};
    this.subProductImages = [];

    this.selectedProductOption = {};

    this.totalPayment = 0;

    this.quantity = 1;

    this.selectOptionPrice = 0;

    this.guideMessage = '';

    this.pageNumbers = [];
    this.totalProductsNumber = 0;

    this.listeners = new Set();
  }

  async fetchProduct(productId) {
    this.product = await productApiService.fetchProduct(productId);

    this.subProductImages = this.product.productImages.filter((productImage) => (
      productImage.thumbnailImage === false
    ));

    this.thumbnailImage = this.product.productImages.find((productImage) => (
      productImage.thumbnailImage === true
    ));

    this.options = this.product.options;

    this.resetQuantityAndTotalPayment();

    this.publish();
  }

  async addCartItem(productId, accessToken) {
    if (Object.keys(this.selectedProductOption).length === 0
        || this.guideMessage === '옵션 미선택') {
      this.guideMessage = '옵션을 선택해주세요';
      this.publish();
      return;
    }

    await cartService.createCartItem(
      productId,
      accessToken,
      this.quantity,
      this.selectedOption,
    );

    this.publish();
  }

  async checkOption() {
    if (Object.keys(this.selectedProductOption).length === 0
    || this.selectedProductOption === '옵션을 선택해주세요'
        || this.guideMessage === '옵션 미선택') {
      this.guideMessage = '옵션을 선택해주세요';

      this.publish();
    }
  }

  async fetchProducts() {
    const data = await productApiService.fetchProducts();

    this.products = data.products;

    this.pageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.publish();
  }

  async changeProductsPageNumber(number) {
    this.products = await productApiService.changePageNumber(number);

    this.publish();
  }

  selectOption(amount, productOption) {
    this.totalPayment = this.product.price + amount;

    this.selectOptionPrice = this.product.price + amount;

    this.quantity = 1;

    this.selectedProductOption = productOption;

    this.guideMessage = '';

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
    this.selectedProductOption = {};

    this.totalPayment = 0;
    this.quantity = 1;

    this.guideMessage = '옵션 미선택';

    this.publish();
  }
}

export const productStore = new ProductStore();
