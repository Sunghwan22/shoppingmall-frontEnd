import { useLocation } from 'react-router-dom';
import OrderProduct from '../components/OrderProduct';

export default function OrderFormPage() {
  const location = useLocation();

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

    </div>
  );
}