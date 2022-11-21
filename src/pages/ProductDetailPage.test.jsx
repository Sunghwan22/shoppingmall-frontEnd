import {
  act, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import ProductDetailPage from './ProductDetailPage';

const context = describe;

const navigate = jest.fn();
let productId;

jest.mock('react-router-dom', () => ({
  useNavigate: () => (
    navigate
  ),

  useLocation: () => ({
    state: {
      productId,
    },
  }),
}));

let product;
let totalPayment;
let quantity;
let options;
let thumbnailImage;
let subProductImages;
let guideMessage;

const addQuantity = jest.fn();
const reduceQuantity = jest.fn();
const resetQuantityAndTotalPayment = jest.fn();
const addCartItem = jest.fn();
const fetchProduct = jest.fn();
const selectOption = jest.fn();

jest.mock('../hooks/useProductStore', () => () => ({
  product,
  totalPayment,
  quantity,
  options,
  thumbnailImage,
  subProductImages,
  guideMessage,
  addQuantity,
  reduceQuantity,
  resetQuantityAndTotalPayment,
  addCartItem,
  fetchProduct,
  selectOption,
}));

let reviews;
let review;
let bestReviews;
let totalRating;
let totalReviewsNumber;
let isBestReviewDetail;
let isReviewDetail;
let bestReviewPageNumbers;
let pageNumbers;

const fetchRecommendation = jest.fn();
const changePageNumber = jest.fn();
const changeBestReviewPageNumber = jest.fn();
const fetchBestReview = jest.fn();
const fetchReview = jest.fn();
const exitReviewDetail = jest.fn();
const exitBestReviewDetail = jest.fn();
const fetchReviews = jest.fn();
const fetchBestReviews = jest.fn();

jest.mock('../hooks/useReviewStore', () => () => ({
  reviews,
  review,
  bestReviews,
  totalRating,
  totalReviewsNumber,
  isBestReviewDetail,
  isReviewDetail,
  pageNumbers,
  bestReviewPageNumbers,

  fetchReviews,
  fetchBestReviews,
  fetchRecommendation,
  changePageNumber,
  changeBestReviewPageNumber,
  fetchBestReview,
  fetchReview,
  exitReviewDetail,
  exitBestReviewDetail,
}));

let productWishes;
const fetchProductWishes = jest.fn();
const createWishes = jest.fn();

jest.mock('../hooks/useWishStore', () => () => ({
  productWishes,
  fetchProductWishes,
  createWishes,
}));

describe('ProductDetailPage', () => {
  function renderProductDetailPage() {
    render((
      <ProductDetailPage />
    ));
  }

  context('상품 상세 페이지 접속 시 상품 정보 가져오기', () => {
    productId = 1;
    product = {
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
      productImages: [{ url: 'imageUrl', isThumbnailImage: true },
        { url: 'imageUrl', isThumbnailImage: false }],
    };

    thumbnailImage = { url: 'imageUrl', isThumbnailImage: true };
    options = [{ addAmount: 3000, description: '블랙' },
      { addAmount: 5000, description: '화이트' }];
    subProductImages = [{ url: 'imageUrl', isThumbnailImage: false }];

    review = {
      id: 5,
      productId: 1,
      rating: 5,
      userId: 1,
      optionName: '블랙',
      content: '이것은 상품 리뷰 입니다1',
      isBestReview: false,
      userNickName: '유저닉네임',
      reviewImages: [
        { url: 'image' },
      ],
      recommendations: [
        { userId: 2 },
      ],
      createAt: '2022-11-11',
    };

    reviews = [
      {
        id: 15,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다2',
        isBestReview: false,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
        ],
        createAt: '2022-11-11',
      },
      {
        id: 10,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다3',
        isBestReview: false,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
          { userId: 2 },
        ],
        createAt: '2022-11-11',
      },
      {
        id: 11,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다3',
        isBestReview: false,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
          { userId: 2 },
        ],
        createAt: '2022-11-11',
      },
      {
        id: 12,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다3',
        isBestReview: false,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
          { userId: 2 },
        ],
        createAt: '2022-11-11',
      },
    ];

    bestReviews = [
      {
        id: 1,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다4',
        isBestReview: true,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
          { userId: 2 },
        ],
        createAt: '2022-11-11',
      },
      {
        id: 2,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다5',
        isBestReview: true,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
          { userId: 2 },
        ],
        createAt: '2022-11-11',
      },
      {
        id: 3,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다5',
        isBestReview: true,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
          { userId: 2 },
        ],
        createAt: '2022-11-11',
      },
      {
        id: 4,
        productId: 1,
        rating: 5,
        userId: 1,
        optionName: '블랙',
        content: '이것은 상품 리뷰 입니다5',
        isBestReview: true,
        userNickName: '유저닉네임',
        reviewImages: [
          { url: 'image' },
        ],
        recommendations: [
          { userId: 2 },
        ],
        createAt: '2022-11-11',
      },
    ];

    bestReviewPageNumbers = [1];
    pageNumbers = [1, 2];

    productWishes = [];
  });

  it('상품 정보를 가져오기 위한 fetchProduct 실행', () => {
    renderProductDetailPage();

    expect(fetchProduct).toBeCalled();

    waitFor(() => {
      expect(fetchProduct).toBeCalled();
    });
  });

  it('상품 옵션을 선택 후 다시 초기화', async () => {
    renderProductDetailPage();

    fireEvent.change(screen.getByLabelText('상품 옵션'), {
      target: { value: '{"addAmount":3000,"description":"블랙"}' },
    });

    await act(() => {
      expect(selectOption).toBeCalled();
    });

    fireEvent.change(screen.getByLabelText('상품 옵션'), {
      target: { value: '옵션을 선택해주세요' },
    });

    await act(() => {
      expect(resetQuantityAndTotalPayment).toBeCalled();
    });
  });

  it('상품 옵션 선택 후 수량 변경', async () => {
    renderProductDetailPage();

    fireEvent.change(screen.getByLabelText('상품 옵션'), {
      target: { value: '{"addAmount":3000,"description":"블랙"}' },
    });

    fireEvent.click(screen.getByText('+'));

    await act(() => {
      expect(addQuantity).toBeCalled();
    });

    fireEvent.click(screen.getByText('-'));

    await act(() => {
      expect(reduceQuantity).toBeCalled();
    });
  });

  it('로그인 하지 않고 상품 옵션 선택 후 장바구니 추가', async () => {
    renderProductDetailPage();

    fireEvent.change(screen.getByLabelText('상품 옵션'), {
      target: { value: '{"addAmount":3000,"description":"블랙"}' },
    });

    fireEvent.click(screen.getByText('장바구니'));

    await act(() => {
      expect(addCartItem).not.toBeCalled();
    });
  });

  it('로그인 후 상품 옵션 선택 후 장바구니 추가', async () => {
    localStorage.setItem('accessToken', JSON.stringify('ACCESS TOKEN'));
    renderProductDetailPage();

    fireEvent.change(screen.getByLabelText('상품 옵션'), {
      target: { value: '{"addAmount":3000,"description":"블랙"}' },
    });

    fireEvent.click(screen.getByText('장바구니'));

    await act(() => {
      expect(addCartItem).toBeCalled();
    });
  });

  context('상품 상세 페이지 접속 시 리뷰에 대한 정보 불러오기', () => {
    it('베스트 리뷰 와 일반 리뷰 불러오기', async () => {
      renderProductDetailPage();

      await act(() => {
        expect(fetchReviews).toBeCalled();
        expect(fetchBestReviews).toBeCalled();
      });
    });

    it('리뷰 추천 하기', async () => {
      renderProductDetailPage();

      fireEvent.click(screen.getByRole('button', { name: /추천0/ }));

      await act(() => {
        expect(fetchRecommendation).toBeCalled();
      });
    });

    it('리뷰 상세 보기 및 상세보기 나가기', async () => {
      isReviewDetail = true;

      renderProductDetailPage();

      fireEvent.click(screen.getByText('X'));

      await act(() => {
        expect(exitReviewDetail).toBeCalled();
      });
    });

    it('베스트 리뷰 페이지 전환하기', async () => {
      renderProductDetailPage();

      fireEvent.click(screen.getByTestId('bestReview-pageNumber1'));

      await act(() => {
        expect(changeBestReviewPageNumber).toBeCalled();
      });
    });

    it('일반 리뷰 2페이지로 전환하기', async () => {
      isReviewDetail = false;

      renderProductDetailPage();

      fireEvent.click(screen.getByText('2'));

      await act(() => {
        expect(changePageNumber).toBeCalled();
      });
    });
  });

  context('상품 찜하기 정보 가져오기', () => {
    it('상품 상세 페이지 접속 시 fetchproductWishes 실행', () => {
      renderProductDetailPage();

      expect(fetchProductWishes).toBeCalled();
    });

    it('상품 찜하기 클릭 시 createWishes 실행', () => {
      renderProductDetailPage();

      fireEvent.click(screen.getByText(/찜하기/));

      expect(createWishes).toBeCalled();
    });
  });
});
