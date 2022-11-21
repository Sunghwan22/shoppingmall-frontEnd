import { fireEvent, render, screen } from '@testing-library/react';
import ProductBestReviews from './ProductBestReviews';

let bestReviews = [
  {
    id: 1,
    productId: 1,
    rating: 5,
    userId: 1,
    optionName: '블랙1',
    content: '이것은 상품 리뷰 입니다1',
    isBestReview: true,
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

const totalRating = 4;
const totalReviewsNumber = 2;
const bestReviewPageNumbers = [1];

const onClickRecommendation = jest.fn();
const onClickBestReviewPageNumbers = jest.fn();
const onClickBestReview = jest.fn();

const context = describe;

describe(('ProductBestReviews'), () => {
  function renderBestReviews() {
    render(<ProductBestReviews
      bestReviews={bestReviews}
      totalRating={totalRating}
      totalReviewsNumber={totalReviewsNumber}
      bestReviewPageNumbers={bestReviewPageNumbers}
      onClickRecommendation={onClickRecommendation}
      onClickBestReviewPageNumbers={onClickBestReviewPageNumbers}
      onClickBestReview={onClickBestReview}
    />);
  }

  context(('베스트 리뷰 확인하기'), () => {
    it(('리뷰 내용 확인'), () => {
      renderBestReviews();

      screen.getByText(/리뷰 수 2/);
      screen.getByText(/사용자 총 평점 4/);

      screen.getByText(/블랙1/);
      screen.getByText(/블랙2/);
      screen.getByText(/BEST 이것은 상품 리뷰 입니다1/);
      screen.getByText(/BEST 이것은 상품 리뷰 입니다2/);
      screen.getAllByAltText('reviewImage');
    });
  });

  it(('리뷰 클릭 시 onClickBestReview함수 실행'), () => {
    renderBestReviews();

    fireEvent.click(screen.getByText(/이것은 상품 리뷰 입니다1/));

    expect(onClickBestReview).toBeCalled();
  });

  it(('리뷰 추천 하기 클릭 시 onClickRecommendation함수 실행'), () => {
    renderBestReviews();

    fireEvent.click(screen.getByRole('button', { name: /추천0/ }));

    expect(onClickRecommendation).toBeCalled();
  });

  it(('페이지 버튼 클릭시 onClickBestReviewPageNumbers함수 실행'), () => {
    renderBestReviews();

    fireEvent.click(screen.getByRole('button', { name: '1' }));

    expect(onClickBestReviewPageNumbers).toBeCalledWith(1);
  });

  it(('베스트 리뷰가 없을 경우'), () => {
    bestReviews = [];

    render(<ProductBestReviews
      bestReviews={bestReviews}
    />);

    screen.getByText('베스트 리뷰로 등록된 리뷰가 없습니다');
  });
});
