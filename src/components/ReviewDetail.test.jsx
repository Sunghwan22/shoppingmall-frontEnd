import { fireEvent, render, screen } from '@testing-library/react';
import ReviewDetail from './ReviewDetail';

const review = {
  id: 1,
  productId: 1,
  rating: 5,
  userId: 1,
  optionName: '블랙',
  content: '이것은 상품 리뷰 입니다',
  isBestReview: true,
  userNickName: '유저닉네임',
  reviewImages: [
    { url: 'image' },
  ],
  recommendations: [
    { userId: 1 },
  ],
  createdAt: '2022-11-11',
};

const onClickExitReviewDetail = jest.fn();

const context = describe;

describe(('리뷰 상세 페이지'), () => {
  context(('리뷰 상세 페이지 확인 하기'), () => {
    it(('리뷰 이미지 및 내용 확인 하기'), () => {
      render(<ReviewDetail
        review={review}
        onClickExitReviewDetail={onClickExitReviewDetail}
      />);

      screen.getByText('이것은 상품 리뷰 입니다');
      screen.getByText(/유저닉네임/);
      screen.getByText(/5/);
      screen.getByText(/2022-11-11/);

      screen.getByAltText('reviewImage');
    });
  });

  context(('리뷰 상세 보기 나가기'), () => {
    it(('X버튼을 누르면 onClickExitReviewDetail함수 실행'), () => {
      render(<ReviewDetail
        review={review}
        onClickExitReviewDetail={onClickExitReviewDetail}
      />);

      fireEvent.click(screen.getByText('X'));

      expect(onClickExitReviewDetail).toBeCalled();
    });
  });
});
