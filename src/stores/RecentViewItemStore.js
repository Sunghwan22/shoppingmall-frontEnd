import { productApiService } from '../services/ProductApiService';
import Store from './Store';

export default class RecentViewItemStore extends Store {
  constructor() {
    super();

    this.recentViewItems = [];
  }

  async fetchRecentViewItems(recentlyViewProduct) {
    this.recentViewItems = await productApiService.fetchRecentViewItems(recentlyViewProduct);

    this.publish();
  }
}

export const recentViewItemStore = new RecentViewItemStore();
