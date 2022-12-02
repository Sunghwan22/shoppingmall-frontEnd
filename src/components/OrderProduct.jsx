import numberFormat from '../utils/NumberFormat';

export default function OrderProduct({
  image, description, productName
  , quantity, totalPayment, deliveryFee,
}) {
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
          <tr>
            <td>
              <img
                src={image}
                alt="productImage"
                width="150px"
              />
              {productName}
              /
              {description}
            </td>
            <td>
              {numberFormat(deliveryFee)}
              원
            </td>
            <td>
              {quantity}
              개
            </td>
            <td>
              {numberFormat(totalPayment)}
              원
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
