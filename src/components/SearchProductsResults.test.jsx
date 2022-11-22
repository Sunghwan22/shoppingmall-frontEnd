import { fireEvent, render, screen } from '@testing-library/react';
import SearchProductsResults from './Products';

const context = describe;

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
    reviewNumber: 1500,
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
    productImages: [{ url: 'images', isThumbnailImage: true },
      { url: 'productImage', isThumbnailImage: false }],
    createdAt: '2022-11-20',
    reviewNumber: 155,
    wishNumbers: 100,
  },
];

const pageNumbers = [1, 2];
const onClickProduct = jest.fn();
const onClickPageNumber = jest.fn();

describe('SearchProductsResults', () => {
  function renderSearchProductResult() {
    render(<SearchProductsResults
      products={products}
      pageNumbers={pageNumbers}
      onClickProduct={onClickProduct}
      onClickPageNumber={onClickPageNumber}
    />);
  }

  context('검색 조건에 맞는 상품을 보여줌', () => {
    it('상품의 이름과 썸네일 찜하기 갯수를 보여줌', () => {
      renderSearchProductResult();

      screen.getByText('아이폰 14');
      screen.getAllByAltText('productThumbnailImages');
      screen.getByText(/1,500,000 원 배달비 3,000 원/);
      screen.getAllByText(/리뷰 155/);
      screen.getAllByText(/찜하기 100/);
    });
  });

  context('상품의 상세 정보를 보고싶음', () => {
    it('상품 클릭시 onClickProduct함수 실행', () => {
      renderSearchProductResult();

      fireEvent.click(screen.getByText('아이폰 14'));

      expect(onClickProduct).toBeCalledWith(1);
    });
  });

  context('상품의 상세 정보를 보고싶음', () => {
    it('상품 클릭시 onClickProduct함수 실행', () => {
      renderSearchProductResult();

      fireEvent.click(screen.getByText('아이폰 14'));

      expect(onClickProduct).toBeCalledWith(1);
    });
  });

  context('다음 페이지의 상품을 보고 싶음', () => {
    it('2페이지 버튼 클릭시 handleClickPageNumber함수 실행', () => {
      renderSearchProductResult();

      fireEvent.click(screen.getByText('2'));

      expect(onClickPageNumber).toBeCalledWith(2);
    });
  });
});
