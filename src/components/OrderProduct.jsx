import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  padding-bottom: 4em;
  border-bottom: 2px solid #D9D9D9;
`;

const Table = styled.table`
  width: 100%;
  font-size: 1.1em;
  
  
  th {
    font-weight: bold;
    padding-bottom: 2em;
  }
  
  tbody {
    td {
      vertical-align: middle;
      text-align: center;
      align-items: center;
    }
  }
`;

const ProductInfo = styled.th`
  width: 40%;
`;

const DeleveryFee = styled.th`
  width: 20%;
`;

const Quantity = styled.th`
  width: 20%;
`;

const Price = styled.th`
  width: 20%;
`;

const ProductImageAndName = styled.td`
  display: flex;
  align-items: center;
  padding-left: 2em;
`;

const ProductName = styled.p`
  padding-left: 2em;
  font-weight: bold;
`;

export default function OrderProduct({
  orderProducts,
}) {
  if (!orderProducts.length) {
    return <p>now Loading</p>;
  }

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <ProductInfo>상품정보</ProductInfo>
            <DeleveryFee>배송비</DeleveryFee>
            <Quantity>수량</Quantity>
            <Price>상품금액</Price>
          </tr>
        </thead>
        <tbody>
          {orderProducts.map((orderProduct) => (
            <tr
              key={orderProduct.productId}
            >
              <ProductImageAndName>
                <img
                  src={orderProduct.image}
                  alt="productImage"
                  width="200px"
                />
                <ProductName>
                  {orderProduct.name}
                  /
                  {orderProduct.description}
                </ProductName>
              </ProductImageAndName>
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
      </Table>
    </Container>
  );
}
