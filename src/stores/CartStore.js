import { cartApiService } from '../services/CartApiService';
import Store from './Store';

export default class CartStore extends Store {
  constructor() {
    super();

    this.cartItems = [];

    this.cartItemsTotalNumber = 0;
    this.pageNumbers = 0;
  }

  async fetchCartItems({ accessToken, page = 1 }) {
    const data = await cartApiService.fetchCartItems({ accessToken, page });

    this.cartItems = data.cartItems;

    this.cartItemsTotalNumber = data.totalNumbers;

    this.pageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.publish();
  }
}

export const cartStore = new CartStore();
