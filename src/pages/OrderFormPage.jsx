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

const Container = styled.div`
  width: 100%;
  padding-inline: 15%;
  padding-top: 4em;
`;

const H2 = styled.h2`
  font-size: 1.5em;
  padding-bottom: 1.5em;
  font-weight: bold;
`;

const TotalOrderPayment = styled.div`
  font-size: 1.5em;
  display: flex;
  justify-content: flex-end;
  padding-top: 2.5em;
  
  p:first-child {
    font-weight: bold;
    padding-right: 2em;
  }

  p:nth-child(2) {
    font-weight: bold;
    padding-right: 2em;
  }
`;

const KakaoPayButton = styled.button`
  background: url(${Image});
  background-repeat: no-repeat;
  background-size : contain;
  padding : 4em;
  border: none;
  cursor: pointer;
  color: transparent;
`;

const Buttons = styled.div`
  width: 100%;
  padding-top: 3em;
  display: flex;
  justify-content: center; 
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
    <Container>
      <H2>주문/결제</H2>
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
      <TotalOrderPayment>
        <p>
          총 상품금액:
        </p>
        <p>
          {' '}
          {numberFormat(totalOrderPayment)}
          원
        </p>
      </TotalOrderPayment>
      <Buttons>
        <KakaoPayButton
          type="button"
          onClick={handleClickPayment}
        >
          결제하기
        </KakaoPayButton>
      </Buttons>
    </Container>
  );
}
