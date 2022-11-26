import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OrderAddress from '../components/OrderAddress';
import OrderProduct from '../components/OrderProduct';
import useUserStore from '../hooks/useUserStore';

export default function OrderFormPage() {
  const location = useLocation();

  const userStore = useUserStore();

  useEffect(() => {
    userStore.fetchUser();
  }, []);

  const { name, phoneNumber, address } = userStore;

  console.log(name, phoneNumber, address);

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
      <OrderAddress />
    </div>
  );
}
