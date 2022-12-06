import { orderApiService } from '../services/OrderApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.paymentResult = {};
  }

  async requestOrder({
    recipient,
    phoneNumber,
    orderProducts,
    totalOrderPayment,
    address,
    deliveryRequest,
  }, accessToken) {
    const orderInformation = {
      recipient,
      phoneNumber,
      orderProducts,
      totalOrderPayment,
      address,
      deliveryRequest,
    };

    const kakaoPayUrl = await orderApiService.createOrder(orderInformation, accessToken);

    this.publish();

    return kakaoPayUrl;
  }

  async fetchPayResult(pgToken) {
    const data = await orderApiService.fetchPayResult(pgToken);

    this.paymentResult = data;

    this.publish();
  }
}

export const orderStore = new OrderStore();
