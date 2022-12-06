import { productApiService } from '../services/ProductApiService';
import Store from './Store';

export default class WishItemStore extends Store {
  constructor() {
    super();
    this.wishItems = [];
  }

  async fetchWishItems(accessToken) {
    this.wishItems = await productApiService.fetchWishItems(accessToken);

    this.publish();
  }

  async deleteWishItem(productId, accessToken) {
    await productApiService.deleteCartItem(productId, accessToken);

    this.publish();
  }
}

export const wishItemStore = new WishItemStore();
