import numberFormat from '../utils/NumberFormat';

export default function OrderProduct({
  product, quantity, totalPayment, selectedProductOption,
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
                src={product.productImages.find((productImage) => (
                  productImage.thumbnailImage === true
                )).url}
                alt="productImage"
                width="150px"
              />
              {product.productName}
              /
              {selectedProductOption.description}
            </td>
            <td>
              {numberFormat(product.deliveryFee)}
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
