import { render, screen } from '@testing-library/react';
import OrderProduct from './OrderProduct';

const product = {
  id: 1,
  productNumber: 12,
  productName: '아이폰14',
  maker: '애플',
  category: '전자기기',
  views: 1000,
  cumulativesales: 120,
  price: 1000000,
  stock: 100,
  maximumQuantity: '50',
  description: '이것은 아이폰 13입니다',
  deliveryFee: '3000',
  options: [{ addAmount: 3000, description: '블랙' },
    { addAmount: 5000, description: '화이트' }],
  productImages: [{ url: 'imageUrl', thumbnailImage: true },
    { url: 'imageUrl', thumbnailImage: false }],
};

const quantity = 1;
const totalPayment = 1500000;
const selectedProductOption = {
  addAmount: 4000, description: '블랙',
};

const context = describe;

describe('OrderProduct', () => {
  function renderOrderProduct() {
    render(<OrderProduct
      product={product}
      quantity={quantity}
      totalPayment={totalPayment}
      selectedProductOption={selectedProductOption}
    />);
  }

  context('주문할 상품 정보확인하기', () => {
    it('주문할 상품의 정보를 확인 할 수 있다', () => {
      renderOrderProduct();

      screen.getByText('상품정보');
      screen.getByText('배송비');
      screen.getByText('수량');
      screen.getByText('상품금액');

      screen.getByAltText('productImage');
      screen.getByText('아이폰14/블랙');
      screen.getByText('3,000원');
      screen.getByText('1개');
      screen.getByText('1,500,000원');
    });
  });
});
