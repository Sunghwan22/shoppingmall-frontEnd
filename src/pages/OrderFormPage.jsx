import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import OrderAddress from '../components/OrderAddress';
import OrderProduct from '../components/OrderProduct';
import useUserStore from '../hooks/useUserStore';

export default function OrderFormPage() {
  const location = useLocation();

  const userStore = useUserStore();

  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    userStore.fetchUser(accessToken);
  }, []);

  const { name, phoneNumber, address } = userStore;

  const {
    product, quantity, totalPayment, selectedProductOption,
  } = location.state;

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
      />
    </div>
  );
}
