import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import OrderAddress from '../components/OrderAddress';
import OrderProduct from '../components/OrderProduct';
import useOrderFormStore from '../hooks/UseOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/NumberFormat';

export default function OrderFormPage() {
  const location = useLocation();

  const userStore = useUserStore();
  const orderFormStore = useOrderFormStore();
  const orderStore = useOrderStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userStore.fetchUser(accessToken);
  }, []);

  const { name, phoneNumber, address } = userStore;
  const { newAddress, deliveryRequest, detailAddress } = orderFormStore;

  const {
    image,
    description,
    productName,
    deliveryFee,
    quantity,
    totalPayment,
    productId,
  } = location.state;

  const orderPayment = totalPayment + deliveryFee;

  const onChangeAddress = (changedAddress) => {
    orderFormStore.changeAddress(changedAddress);
  };

  const onChangedetailAddress = (changedDetailAddress) => {
    orderFormStore.changeDetailAddress(changedDetailAddress);
  };

  const onChangeDeliveryRequest = (request) => {
    orderFormStore.changeDeliveryRequest(request);
  };

  const handleClickPayment = async () => {
    if (!detailAddress) {
      return;
    }

    if (!Object.keys(newAddress).length === 0) {
      const kakaoPayUrl = await orderStore.requestOrder({
        name,
        phoneNumber,
        productId,
        quantity,
        orderPayment,
        newAddress,
        deliveryRequest,
        detailAddress,
        description,
      }, accessToken);

      window.location.href = kakaoPayUrl;

      return;
    }

    const kakaoPayUrl = await orderStore.requestOrder({
      name,
      phoneNumber,
      productId,
      quantity,
      orderPayment,
      address,
      deliveryRequest,
      detailAddress,
      description,
    }, accessToken);

    window.location.href = kakaoPayUrl;
  };

  return (
    <div>
      <OrderProduct
        image={image}
        deliveryFee={deliveryFee}
        description={description}
        productName={productName}
        quantity={quantity}
        totalPayment={totalPayment}
      />
      <OrderAddress
        name={name}
        phoneNumber={phoneNumber}
        address={address}
        onChangeAddress={onChangeAddress}
        detailAddress={detailAddress}
        onChangedetailAddress={onChangedetailAddress}
        onChangeDeliveryRequest={onChangeDeliveryRequest}
      />
      <p>
        결제금액
        {' '}
        {numberFormat(orderPayment)}
        원
      </p>
      <button
        type="button"
        onClick={handleClickPayment}
      >
        결제하기
      </button>
    </div>
  );
}
