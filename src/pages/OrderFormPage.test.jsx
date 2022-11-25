import { render, screen } from '@testing-library/react';

import OrderFormPage from './OrderFormPage';

const navigate = jest.fn();

let product;
let quantity;
let totalPayment;
let selectedProductOption;

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),

  useLocation: () => ({
    state: {
      product,
      quantity,
      totalPayment,
      selectedProductOption,
    },
  }),
}));

const context = describe;

describe('OrderFormPage', () => {
  function renderOrderFormPage() {
    render(<OrderFormPage />);
  }

  context('주문할 상품 정보 확인', () => {
    product = {
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

    quantity = 1;
    totalPayment = 1000000;
    selectedProductOption = {
      addAmount: 4000, description: '블랙',
    };
  });

  it('주문할 상품에 대한 정보를 확인 할 수 있다.', () => {
    renderOrderFormPage();

    screen.getByText('아이폰14/블랙');
    screen.getByText('3,000원');
    screen.getByText('1개');
    screen.getByText('1,000,000원');
  });
});
