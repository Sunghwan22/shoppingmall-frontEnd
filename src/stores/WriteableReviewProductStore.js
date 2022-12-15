import { orderApiService } from '../services/OrderApiService';
import Store from './Store';

export default class WriteableReviewProductStore extends Store {
  constructor() {
    super();
    this.writeableReviewProducts = [];
    this.writeableReviewProduct = {};
    this.pageNumbers = [];
  }

  async fetchWriteableProducts({ accessToken, page = 1 }) {
    const data = await orderApiService.fetchWriteableReviewProducts({ accessToken, page });

    this.writeableReviewProducts = data.orders;

    this.pageNumbers = [...Array(data.pages)].map((number, index) => index + 1);

    this.publish();
  }

  async fetchWriteableProduct(id) {
    this.writeableReviewProduct = await orderApiService.fetchWriteableProduct(id);

    this.publish();
  }
}

export const writeableReviewProductStore = new WriteableReviewProductStore();
