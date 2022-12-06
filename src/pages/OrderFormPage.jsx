import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userStore.fetchUser(accessToken);
  }, []);

  const { phoneNumber, address, recipient } = userStore;
  const { deliveryRequest } = orderFormStore;

  const {
    orderProducts,
    totalOrderPayment,
  } = location.state;

  const onChangeAddress = (changedAddress) => {
    orderFormStore.changeAddress(changedAddress);
  };

  const onChangeDeliveryRequest = (request) => {
    orderFormStore.changeDeliveryRequest(request);
  };

  const handleClickPayment = async () => {
    if (!recipient || !phoneNumber
      || !address.zoneCode || !address.fullAddress
      || !address.detailAddress) {
      return;
    }

    const kakaoPayUrl = await orderStore.requestOrder({
      recipient,
      phoneNumber,
      orderProducts,
      totalOrderPayment,
      address,
      deliveryRequest,
    }, accessToken);

    window.location.href = kakaoPayUrl;
  };

  const onClickEditAddress = () => {
    navigate('/edit-orderAddress');
  };

  return (
    <div>
      <OrderProduct
        orderProducts={orderProducts}
      />
      <OrderAddress
        recipient={recipient}
        phoneNumber={phoneNumber}
        address={address}
        onChangeAddress={onChangeAddress}
        onChangeDeliveryRequest={onChangeDeliveryRequest}
        onClickEditAddress={onClickEditAddress}
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
