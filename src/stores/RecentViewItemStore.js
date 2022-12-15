import { productApiService } from '../services/ProductApiService';
import Store from './Store';

export default class RecentViewItemStore extends Store {
  constructor() {
    super();

    this.recentViewItems = [];
  }

  async fetchRecentViewItems(deleteArray) {
    if (deleteArray.length === 2) {
      this.recentViewItems = [];
      this.publish();
      return;
    }

    this.recentViewItems = await productApiService.fetchRecentViewItems(deleteArray);

    this.publish();
  }
}

export const recentViewItemStore = new RecentViewItemStore();
