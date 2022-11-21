import ReviewStore from './ReviewStore';

const context = describe;

let reviewStore;

describe('ReviewStore', () => {
  beforeEach(() => {
    reviewStore = new ReviewStore();
  });

  context('일반 리뷰 불러오기', () => {
    it('일반 리뷰를 fetchReviews함수로 API서버에서 불러옴', async () => {
      const productId = 1;

      await reviewStore.fetchReviews(productId);

      const { reviews } = reviewStore;

      expect(reviews.length).toBe(2);
      expect(reviews[0].isBestReview).toBeFalsy();
      expect(reviews[1].isBestReview).toBeFalsy();
    });
  });

  context('베스트 리뷰 불러오기', () => {
    it('베스트 리뷰를 fetchBestReviews함수로 API서버에서 불러옴', async () => {
      const productId = 1;

      await reviewStore.fetchBestReviews(productId);

      const { bestReviews } = reviewStore;

      expect(bestReviews.length).toBe(2);
      expect(bestReviews[0].isBestReview).toBeTruthy();
      expect(bestReviews[1].isBestReview).toBeTruthy();
    });
  });

  context('1페이지의 일반리뷰 불러오기', () => {
    it('일반 리뷰를 changePageNumber함수로 API서버에서 불러옴', async () => {
      const productId = 1;
      const page = 1;

      await reviewStore.changePageNumber(productId, page);

      const { reviews } = reviewStore;

      expect(reviews.length).toBe(2);
      expect(reviews[0].isBestReview).toBeFalsy();
      expect(reviews[1].isBestReview).toBeFalsy();
    });
  });

  context('1페이지의 베스트리뷰 불러오기', () => {
    it('베스트 리뷰를 changeBestReviewPage함수로 API서버에서 불러옴', async () => {
      const productId = 1;
      const page = 1;

      await reviewStore.changeBestReviewPageNumber(productId, page);

      const { bestReviews } = reviewStore;

      expect(bestReviews.length).toBe(2);
      expect(bestReviews[0].isBestReview).toBeTruthy();
      expect(bestReviews[1].isBestReview).toBeTruthy();
    });
  });

  context('리뷰 상세 보기', () => {
    it('리뷰에 대한 상세 정보를 fetchReview함수로 API서버에서 불러옴', async () => {
      const reviewId = 1;

      await reviewStore.fetchReview(reviewId);

      const { review } = reviewStore;

      expect(review).toStrictEqual(
        {
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
            { userId: 2 },
          ],
          createAt: '2022-11-11',
        },
      );
    });
  });

  context('리뷰 추천하기', () => {
    it('베스트 리뷰중 첫번쨰 리뷰에 추천', async () => {
      const productId = 1;
      const reviewId = 5;

      await reviewStore.fetchBestReviews(productId);

      await reviewStore.fetchRecommendation('AccessToken', reviewId, productId);

      const { bestReviews } = reviewStore;

      expect(bestReviews.length).toBe(2);
      expect(bestReviews[0].id).toBe(5);
      expect(bestReviews[0].isBestReview).toBeTruthy();
      expect(bestReviews[1].isBestReview).toBeTruthy();

      expect(bestReviews[0].recommendations.length).toBe(1);
    });

    it('일반 리뷰 중 첫번쨰 리뷰에 추천', async () => {
      const productId = 1;
      const reviewId = 5;

      await reviewStore.fetchReviews(productId);

      await reviewStore.fetchRecommendation('AccessToken', reviewId, productId);

      const { reviews } = reviewStore;

      expect(reviews.length).toBe(2);
      expect(reviews[0].id).toBe(5);
      expect(reviews[0].isBestReview).toBeFalsy();
      expect(reviews[1].isBestReview).toBeFalsy();

      expect(reviews[0].recommendations.length).toBe(1);
    });
  });

  context('리뷰상세페이지 보기', () => {
    it('리뷰 디테일을 트루로 설정', async () => {
      const productId = 1;
      const page = 1;

      await reviewStore.changePageNumber(productId, page);

      const { reviews } = reviewStore;

      expect(reviews.length).toBe(2);
      expect(reviews[0].isBestReview).toBeFalsy();
      expect(reviews[1].isBestReview).toBeFalsy();
    });
  });
});
