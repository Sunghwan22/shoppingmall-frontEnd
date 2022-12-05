import numberFormat from '../utils/NumberFormat';

export default function OrderProduct({
  orderProducts,
}) {
  if (!orderProducts.length) {
    return <p>now Loading</p>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>상품정보</th>
            <th>배송비</th>
            <th>수량</th>
            <th>상품금액</th>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((orderProduct) => (
            <tr key={orderProduct.id}>
              <td>
                <img
                  src={orderProduct.image}
                  alt="productImage"
                  width="150px"
                />
                {orderProduct.productName}
                /
                {orderProduct.description}
              </td>
              <td>
                {numberFormat(orderProduct.deliveryFee)}
                원
              </td>
              <td>
                {orderProduct.quantity}
                개
              </td>
              <td>
                {numberFormat(orderProduct.totalPayment)}
                원
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
