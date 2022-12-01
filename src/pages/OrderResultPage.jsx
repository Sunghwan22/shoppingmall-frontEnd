import { useLocation } from 'react-router-dom';
import OrderedAddress from '../components/OrderedAddress';
import OrderProduct from '../components/OrderProduct';

export default function OrderResultPage() {
  const location = useLocation();

  const {
    name,
    phoneNumber,
    product,
    quantity,
    totalPayment,
    selectedProductOption,
    address,
    deliveryRequest,
    detailAddress,
  } = location.state;

  return (
    <div>
      <OrderProduct
        product={product}
        quantity={quantity}
        totalPayment={totalPayment}
        selectedProductOption={selectedProductOption}
      />
      <h2>주문이 정상적으로 완료되었습니다</h2>
      <OrderedAddress
        name={name}
        phoneNumber={phoneNumber}
        address={address}
        deliveryRequest={deliveryRequest}
        detailAddress={detailAddress}
      />
    </div>
  );
}
