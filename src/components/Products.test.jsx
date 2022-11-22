import { render, screen } from '@testing-library/react';
import Products from './Products';

const products = [
  {
    id: 1,
    productNumber: 12,
    productName: '아이폰 14',
    maker: '애플',
    category: '전자기기',
    views: 1000,
    cumulativesales: 150,
    price: 1500000,
    stock: 100,
    maximumQuantity: '50',
    description: '이것은 아이폰 14입니다',
    deliveryFee: '3000',
    options: [{ addAmount: 3000, description: '블랙' },
      { addAmount: 5000, description: '화이트' }],
    productImages: [{ url: 'https://test-s3-image.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-10-20+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.55.03.png', isThumbnailImage: true },
      { url: 'imageUrl', isThumbnailImage: false }],
    createdAt: '2022-11-20',
    reviewNumber: 155,
    wishNumbers: 100,
  },
  {
    id: 2,
    productNumber: 13,
    productName: '아이폰 13',
    maker: '애플',
    category: '전자기기',
    views: 1000,
    cumulativesales: 150,
    price: 1000000,
    stock: 100,
    maximumQuantity: '50',
    description: '이것은 아이폰 13입니다',
    deliveryFee: '3000',
    options: [{ addAmount: 3000, description: '블랙' },
      { addAmount: 5000, description: '화이트' }],
    productImages: [{ url: 'https://test-s3-image.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-10-20+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.55.03.png', isThumbnailImage: true },
      { url: 'productImage', isThumbnailImage: false }],
    createdAt: '2022-11-20',
    reviewNumber: 155,
    wishNumbers: 120,

  },
];

const productPageNumbers = [1, 2];

const onClickProduct = jest.fn();
const onClickPageNumber = jest.fn();
const onClickWishes = jest.fn();

const context = describe;

describe('Products', () => {
  function renderProducts() {
    render(<Products
      products={products}
      productPageNumbers={productPageNumbers}
      onClickProduct={onClickProduct}
      onClickPageNumber={onClickPageNumber}
      onClickWishes={onClickWishes}
    />);
  }

  context('상품 목록 확인하기', () => {
    it('상품 정보 확인 하기', () => {
      renderProducts();

      screen.getByText('');
    });
  });
});
