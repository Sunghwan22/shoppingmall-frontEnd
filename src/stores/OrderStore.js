import { orderApiService } from '../services/OrderApiService';
import Store from './Store';

export default class OrderStore extends Store {
  constructor() {
    super();

    this.paymentResult = {};
  }

  async requestOrder({
    name,
    phoneNumber,
    orderProducts,
    totalOrderPayment,
    address,
    deliveryRequest,
    detailAddress,
  }, accessToken) {
    const orderInformation = {
      name,
      phoneNumber,
      orderProducts,
      totalOrderPayment,
      address,
      deliveryRequest,
      detailAddress,
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
