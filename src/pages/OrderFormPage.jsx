import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import OrderAddress from '../components/OrderAddress';
import OrderProduct from '../components/OrderProduct';
import useOrderFormStore from '../hooks/UseOrderFormStore';
import useUserStore from '../hooks/useUserStore';
import numberFormat from '../utils/NumberFormat';

export default function OrderFormPage() {
  const location = useLocation();

  const userStore = useUserStore();
  const orderFormStore = useOrderFormStore();
  // const orderStore = useOrderStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userStore.fetchUser(accessToken);
  }, []);

  const { name, phoneNumber, address } = userStore;
  const { newAddress } = orderFormStore;

  const {
    product, quantity, totalPayment, selectedProductOption,
  } = location.state;

  const onChangeAddress = ({ changedAddress }) => {
    orderFormStore.changeAddress(changedAddress);
  };

  const onChangedetailAddress = ({ detailAddress }) => {
    orderFormStore.changeDetailAddress(detailAddress);
  };

  const handleClickPayment = () => {
    orderStore.order();
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
        newAddress={newAddress}
        onChangeAddress={onChangeAddress}
        onChangedetailAddress={onChangedetailAddress}
      />
      <p>
        결제금액
        {' '}
        {numberFormat(product.deliveryFee + totalPayment)}
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
