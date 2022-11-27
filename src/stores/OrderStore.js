import { orderApiService } from '../services/OrderApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();
  }

  async requestOrder({
    name,
    phoneNumber,
    product,
    quantity,
    orderPayment,
    address,
    deliveryRequest,
    detailAddress,
  }, accessToken) {
    const orderInformation = {
      name,
      phoneNumber,
      product,
      quantity,
      orderPayment,
      address,
      deliveryRequest,
      detailAddress,
    };

    await orderApiService.createOrder(orderInformation, accessToken);

    this.publish();
  }
}

export const orderStore = new OrderStore();
