import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import OrderAddress from '../components/OrderAddress';
import OrderProduct from '../components/OrderProduct';
import useOrderFormStore from '../hooks/UseOrderFormStore';
import useOrderStore from '../hooks/useOrderStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/NumberFormat';

export default function OrderFormPage() {
  const location = useLocation();
  const navigate = useNavigate();

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
    product, quantity, totalPayment, selectedProductOption,
  } = location.state;

  const orderPayment = totalPayment + product.deliveryFee;

  const onChangeAddress = (changedAddress) => {
    orderFormStore.changeAddress(changedAddress);
  };

  const onChangedetailAddress = (changedDetailAddress) => {
    orderFormStore.changeDetailAddress(changedDetailAddress);
  };

  const onChangeDeliveryRequest = (request) => {
    orderFormStore.changeDeliveryRequest(request);
  };

  const handleClickPayment = () => {
    if (!detailAddress) {
      return;
    }

    if (!Object.keys(newAddress).length === 0) {
      orderStore.requestOrder({
        name,
        phoneNumber,
        product,
        quantity,
        orderPayment,
        newAddress,
        deliveryRequest,
        detailAddress,
      }, accessToken);
      return;
    }

    orderStore.requestOrder({
      name, phoneNumber, product, quantity, orderPayment, address, deliveryRequest, detailAddress,
    }, accessToken);

    navigate('/orderConfirmPage');
  };

  return (
    <div>
      <OrderProduct
        product={product}
        quantity={quantity}
        totalPayment={totalPayment}
        selectedProductOption={selectedProductOption}
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
