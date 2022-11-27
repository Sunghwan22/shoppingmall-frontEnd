import Store from './Store';

export default class OrderFormStore extends Store {
  constructor() {
    super();

    this.newAddress = {};
    this.deliveryRequest = '';
  }

  changeAddress(address) {
    this.newAddress = address;

    this.publish();
  }

  changeDeliveryRequest(request) {
    this.deliveryRequest = request;

    this.publish();
  }

  changeDetailAddress(detailAddress) {
    this.newAddress.detailAddress = detailAddress;

    this.publish();
  }
}

export const orderFormStore = new OrderFormStore();
