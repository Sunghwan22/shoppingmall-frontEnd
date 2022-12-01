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
    productId,
    quantity,
    orderPayment,
    address,
    deliveryRequest,
    detailAddress,
    selectedProductOption,
  }, accessToken) {
    const orderInformation = {
      name,
      phoneNumber,
      productId,
      address,
      quantity,
      orderPayment,
      deliveryRequest,
      detailAddress,
      selectedProductOption,
    };

    const data = await orderApiService.createOrder(orderInformation, accessToken);

    this.publish();

    return data.kakaoPayUrl;
  }

  async fetchPayResult(pgToken) {
    const data = await orderApiService.fetchPayResult(pgToken);

    this.paymentResult = data;

    this.publish();
  }
}

export const orderStore = new OrderStore();
