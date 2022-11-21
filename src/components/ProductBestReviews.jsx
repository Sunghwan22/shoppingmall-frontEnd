import styled from 'styled-components';

const PageList = styled.ul`
    display: flex;   
`;

export default function ProductBestReviews(
  {
    bestReviews, totalRating, onClickBestReview,
    totalReviewsNumber, bestReviewPageNumbers, onClickRecommendation,
    onClickBestReviewPageNumbers,
  },

) {
  const handleClickBestReview = (reviewId) => {
    onClickBestReview(reviewId);
  };

  const handleClickPageNumber = (number) => {
    onClickBestReviewPageNumbers(number);
  };

  const handleClickRecommendation = (reviewId) => {
    onClickRecommendation(reviewId);
  };

  if (bestReviews.length === 0) {
    return <p>베스트 리뷰로 등록된 리뷰가 없습니다</p>;
  }

  return (
    <div>
      <p>
        리뷰 수
        {' '}
        {totalReviewsNumber}
        {' '}
        사용자 총 평점
        {' '}
        {totalRating}
        /5
      </p>
      <ul>
        {bestReviews.map((bestReview) => (
          <li key={bestReview.id}>
            <button
              type="button"
              onClick={() => handleClickBestReview(bestReview.id)}
            >
              <span>
                ★★★★★
                {' '}
                {bestReview.rating}
                {' '}
              </span>
              <p>
                {bestReview.userNickName}
                {' '}
                {bestReview.createdAt}
                {' '}
                {bestReview.optionName}
              </p>
              <p>
                BEST
                {' '}
                {bestReview.content}
              </p>
              <img
                src={bestReview.reviewImages.length !== 0 ? bestReview.reviewImages[0].url
                  : 'productImage'}
                alt="reviewImage"
                width="50px"
              />
            </button>
            <button
              type="button"
              onClick={() => handleClickRecommendation(bestReview.id)}
            >
              추천
              {bestReview.recommendations.length}
            </button>
          </li>
        ))}
      </ul>
      <PageList>
        {bestReviewPageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => handleClickPageNumber(number)}
              id={`bestReview-pageNumber${number}`}
              data-testid={`bestReview-pageNumber${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </PageList>
    </div>
  );
}
