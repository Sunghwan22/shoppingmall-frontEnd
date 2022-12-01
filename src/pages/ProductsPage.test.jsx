import { fireEvent, render, screen } from '@testing-library/react';
import ProductsPage from './ProductsPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),
}));

let products;
let pageNumbers;

const fetchProducts = jest.fn();
const changeProductsPageNumber = jest.fn();

jest.mock('../hooks/useProductStore', () => () => ({
  products,
  pageNumbers,
  fetchProducts,
  changeProductsPageNumber,
}));

let productWishes;

const createWishes = jest.fn();

jest.mock('../hooks/useWishStore', () => () => ({
  productWishes,
  createWishes,
}));

describe('ProductsPage', () => {
  products = [
    {
      id: 1,
      productNumber: 12,
      name: '아이폰 14',
      maker: '애플',
      category: '전자기기',
      views: 1000,
      cumulativesales: 150,
      price: 1500000,
      stock: 100,
      deliveryFee: 3000,
      maximumQuantity: '50',
      description: '이것은 아이폰 14입니다',
      productImage: { url: 'https://test-s3-image.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-10-20+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.55.03.png', isThumbnailImage: true },
      createdAt: '2022-11-20',
      reviewNumber: 155,
      wishNumber: 100,
    },
    {
      id: 2,
      productNumber: 13,
      name: '아이폰 13',
      maker: '애플',
      category: '전자기기',
      views: 1000,
      cumulativesales: 150,
      price: 1000000,
      deliveryFee: 3000,
      stock: 100,
      maximumQuantity: '50',
      description: '이것은 아이폰 13입니다',
      productImage: { url: 'https://test-s3-image.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-10-20+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.55.03.png', isThumbnailImage: true },
      createdAt: '2022-11-20',
      reviewNumber: 155,
      wishNumber: 120,
    },
  ];

  pageNumbers = [1, 2];

  function renderProductsPage() {
    render(<ProductsPage />);
  }

  context('상품 목록 불러오기', () => {
    it('페이지가 마운트 될 때 fetchproducts함수 실행', async () => {
      renderProductsPage();

      expect(fetchProducts).toBeCalled();
    });
  });

  context('상품 클릭', () => {
    it('onClickProduct함수 실행', () => {
      renderProductsPage();

      fireEvent.click(screen.getByText('아이폰 14'));

      expect(navigate).toBeCalledWith('/product/1');
    });
  });

  context('상품 찜하기', () => {
    it('onClickWishes함수 실행', () => {
      localStorage.setItem('accessToken', JSON.stringify('ACCESS.TOKEN'));

      renderProductsPage();

      fireEvent.click(screen.getByText('찜하기 100'));

      expect(createWishes).toBeCalledWith(1, 'ACCESS.TOKEN');
    });
  });

  context('상품 목록 페이지 전환', () => {
    it('fetchProducts함수 실행', () => {
      renderProductsPage();

      fireEvent.click(screen.getByText('2'));

      expect(fetchProducts).toBeCalledWith({ page: 2 });
    });
  });
});
