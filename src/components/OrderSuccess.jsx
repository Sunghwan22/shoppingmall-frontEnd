import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useOrderStore from '../hooks/useOrderStore';
import numberFormat from '../utils/NumberFormat';

export default function OrderSuccess() {
  const orderStore = useOrderStore();

  const location = useLocation();

  const pgToken = location.search.split('=')[1];

  useEffect(() => {
    orderStore.fetchPayResult(pgToken);
  }, []);

  const { paymentResult } = orderStore;

  if (!paymentResult.tid) {
    return (
      <div>
        <p>카카오페이 결제가 실패하였습니다</p>
        <div>
          <p>에러 코드</p>
          <p>-2</p>
        </div>
        <div>
          <p>에러 내용</p>
          <p>tid can not be null</p>
        </div>
      </div>
    );
  }

  if (!paymentResult.amount) {
    return <p>nowLoading</p>;
  }

  return (
    <div>
      <p>카카오페이 결제가 정상적으로 완료되었습니다</p>
      <div>
        <p>결제일시</p>
        <p>{paymentResult.approved_at}</p>
      </div>
      <div>
        <p>주문번호</p>
        <p>{paymentResult.partner_order_id}</p>
      </div>
      <div>
        <p>상품명</p>
        <p>{paymentResult.item_name}</p>
      </div>
      <div>
        <p>결제금액</p>
        <p>
          {numberFormat(paymentResult.amount.total)}
          원
        </p>
      </div>
    </div>
  );
}
