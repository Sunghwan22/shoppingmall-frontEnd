import { cartApiService } from '../services/CartApiService';
import Store from './Store';

export default class CartStore extends Store {
  constructor() {
    super();

    this.cartItems = [];
    this.checkItems = [];

    this.cartItemsTotalNumber = 0;
    this.pageNumbers = [];
    this.currentPage = 1;

    this.selectedProductOption = {};
    this.guideMessage = '';

    this.productPrice = 0;
    this.totalPrice = 0;
    this.quantity = 1;

    this.cartItem = {};
    this.options = [];
  }

  async fetchCartItems({ accessToken, page = 1 }) {
    const data = await cartApiService.fetchCartItems({ accessToken, page });

    this.cartItems = data.cartItems;

    this.cartItemsTotalNumber = data.totalNumbers;

    this.pageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.currentPage = page;

    this.publish();
  }

  Singlecheck(checked, cartItemId) {
    if (checked) {
      this.checkItems = [...this.checkItems, cartItemId];
    }

    if (!checked) {
      this.checkItems = this.checkItems.filter((element) => element !== cartItemId);
    }

    this.publish();
  }

  wholeCheck(checked) {
    if (checked) {
      const idArray = [];
      this.cartItems.forEach((element) => idArray.push(element.id));
      this.checkItems = [...idArray];
    }

    if (!checked) {
      this.checkItems = [];
    }

    this.publish();
  }

  async deleteCartItems(accessToken) {
    await cartApiService.deleteCartItems(this.checkItems);

    this.publish();

    if (this.cartItems.length !== 1) {
      await this.fetchCartItems({
        accessToken,
        page: this.currentPage,
      });
    }

    await this.fetchCartItems({
      accessToken,
      page: this.currentPage - 1,
    });

    this.checkItems = [];

    this.publish();
  }

  async fetchCartItem(cartItemId) {
    const data = await cartApiService.fetchCartItem(cartItemId);

    this.cartItem = data.cartItem;

    this.options = data.options;

    this.productPrice = data.price;

    this.publish();
  }

  async updateCartItem(cartItemId) {
    if (Object.keys(this.selectedProductOption).length === 0
      || this.selectedProductOption === '옵션을 선택해주세요'
          || this.guideMessage === '옵션 미선택') {
      this.guideMessage = '옵션을 선택해주세요';

      this.publish();
      return;
    }

    await cartApiService.updateCartItem(
      cartItemId,
      this.selectedProductOption.addAmount,
      this.selectedProductOption.description,
      this.quantity,
      this.totalPrice,
    );

    this.publish();
  }

  selectOption(productOption) {
    this.totalPrice = this.productPrice + productOption.addAmount;

    this.selectOptionPrice = this.productPrice + productOption.addAmount;

    this.quantity = 1;

    this.selectedProductOption = productOption;

    this.guideMessage = '';

    this.publish();
  }

  addQuantity() {
    this.quantity += 1;

    this.totalPrice += this.selectOptionPrice;

    this.publish();
  }

  reduceQuantity() {
    if (this.quantity === 1) {
      return;
    }

    this.quantity -= 1;

    this.totalPrice -= this.selectOptionPrice;

    this.publish();
  }

  resetQuantityAndTotalPayment() {
    this.selectedProductOption = {};

    this.totalPrice = 0;
    this.quantity = 1;

    this.guideMessage = '옵션 미선택';

    this.publish();
  }
}

export const cartStore = new CartStore();
