import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import OrderAddress from '../components/OrderAddress';
import OrderProduct from '../components/OrderProduct';
import useOrderFormStore from '../hooks/UseOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/NumberFormat';
import Image from '../assets/payment_icon_yellow_large.png';

const KakaoPayButton = styled.button`
  background: url(${Image});
  background-repeat: no-repeat;
  background-size : contain;
  padding : 1em;
  border: none;
  cursor: pointer;
  color: transparent;
`;

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
    orderProducts,
    totalOrderPayment,
  } = location.state;

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
    if (!detailAddress || !name || !phoneNumber) {
      return;
    }

    if (!newAddress && !address) {
      return;
    }

    if (!Object.keys(newAddress).length === 0) {
      const kakaoPayUrl = await orderStore.requestOrder({
        name,
        phoneNumber,
        orderProducts,
        totalOrderPayment,
        newAddress,
        deliveryRequest,
        detailAddress,
      }, accessToken);

      window.location.href = kakaoPayUrl;

      return;
    }

    const kakaoPayUrl = await orderStore.requestOrder({
      name,
      phoneNumber,
      orderProducts,
      totalOrderPayment,
      address,
      deliveryRequest,
      detailAddress,
    }, accessToken);

    window.location.href = kakaoPayUrl;
  };

  return (
    <div>
      <OrderProduct
        orderProducts={orderProducts}
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
        총 결제금액
        {' '}
        {numberFormat(totalOrderPayment)}
        원
      </p>
      <KakaoPayButton
        type="button"
        onClick={handleClickPayment}
      >
        결제하기
      </KakaoPayButton>
    </div>
  );
}
