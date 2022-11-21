import { fireEvent, render, screen } from '@testing-library/react';
import ProductReviews from './ProductReviews';

let reviews = [
  {
    id: 1,
    productId: 1,
    rating: 5,
    userId: 1,
    optionName: '블랙1',
    content: '이것은 상품 리뷰 입니다1',
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
    id: 2,
    productId: 1,
    rating: 4,
    userId: 1,
    optionName: '블랙2',
    content: '이것은 상품 리뷰 입니다2',
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

const totalRating = 4;
const totalReviewsNumber = 2;
const pageNumbers = [1];

const onClickRecommendation = jest.fn();
const onClickPageNumber = jest.fn();
const onClickReview = jest.fn();

const context = describe;

describe(('ProductReviews'), () => {
  function renderBestReviews() {
    render(<ProductReviews
      reviews={reviews}
      totalRating={totalRating}
      totalReviewsNumber={totalReviewsNumber}
      pageNumbers={pageNumbers}
      onClickRecommendation={onClickRecommendation}
      onClickPageNumber={onClickPageNumber}
      onClickReview={onClickReview}
    />);
  }

  context(('베스트 리뷰 확인하기'), () => {
    it(('리뷰 내용 확인'), () => {
      renderBestReviews();

      screen.getByText(/리뷰 수 2/);
      screen.getByText(/사용자 총 평점 4/);

      screen.getByText(/블랙1/);
      screen.getByText(/블랙2/);
      screen.getByText(/이것은 상품 리뷰 입니다1/);
      screen.getByText(/이것은 상품 리뷰 입니다2/);
      screen.getAllByAltText('reviewImage');
    });
  });

  it(('리뷰 클릭 시 onClickReview함수 실행'), () => {
    renderBestReviews();

    fireEvent.click(screen.getByText(/이것은 상품 리뷰 입니다1/));

    expect(onClickReview).toBeCalled();
  });

  it(('리뷰 추천 하기 클릭 시 onClickRecommendation함수 실행'), () => {
    renderBestReviews();

    fireEvent.click(screen.getByRole('button', { name: /추천0/ }));

    expect(onClickRecommendation).toBeCalled();
  });

  it(('페이지 버튼 클릭시 onClickReviewPageNumbers함수 실행'), () => {
    renderBestReviews();

    fireEvent.click(screen.getByRole('button', { name: '1' }));

    expect(onClickPageNumber).toBeCalledWith(1);
  });

  it(('리뷰가 없을 경우'), () => {
    reviews = [];

    render(<ProductReviews
      reviews={reviews}
    />);

    screen.getByText('작성된 리뷰가 없습니다');
  });
});
