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

    await this.fetchCartItems({
      accessToken,
      page: this.currentPage,
    });

    this.checkItems = [];

    this.publish();
  }

  async findCartItem(cartItemId) {
    const cartItem = await this.cartItems.find((element) => element.id === cartItemId);

    console.log(cartItem);

    return cartItem;
  }
}

export const cartStore = new CartStore();
