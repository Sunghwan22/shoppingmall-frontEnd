import styled from 'styled-components';

/* eslint-disable max-len */
const PageList = styled.ul`
  display: flex;
`;

export default function ProductReviews(
  {
    reviews, totalRating, reviewImages, recommendations,
    onClickRecommendation, pageNumbers, onClickPageNumber,
    totalReviewsNumber, onClickBestReview,
  },
) {
  const handleClickRecommendation = (reviewId, number) => {
    onClickRecommendation(reviewId, number);
  };

  const handleClickPageNumber = (number) => {
    onClickPageNumber(number);
  };

  const handleClickReview = (reviewId) => {
    onClickBestReview(reviewId);
  };

  if (reviews.length === 0) {
    return <p>작성된 리뷰가 없습니다</p>;
  }

  return (
    <div>
      <h2>상품 리뷰</h2>
      <div>
        <p>사용자 총 평점</p>
        {' '}
        {totalRating}
        /
        5
        <p>
          전체 리뷰 수
          {' '}
          {totalReviewsNumber}
        </p>
        <p>
          평점 비율
        </p>
      </div>
      <div>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <button
                type="button"
                onClick={() => handleClickReview(review.id)}
              >
                <img
                  src={reviewImages.find((reviewImage) => reviewImage.reviewId === review.id).url}
                  alt="reviewImage"
                  width="40px"
                />
                <span>
                  ★★★★★
                  {' '}
                  {review.rating}
                  {' '}
                </span>
                <p>
                  {review.userNickName}
                  {' '}
                  {review.createdAt}
                  {' '}
                  {review.optionName}
                </p>
                <p>
                  {' '}
                  {review.content}
                </p>
              </button>
              <button
                type="button"
                onClick={() => handleClickRecommendation(review.id)}
              >
                추천
                {recommendations.filter(
                  (recommendation) => recommendation.reviewId === review.id,
                ).length}
              </button>
            </li>
          ))}
        </ul>
        <PageList>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                type="button"
                onClick={() => handleClickPageNumber(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </PageList>
      </div>
    </div>
  );
}
