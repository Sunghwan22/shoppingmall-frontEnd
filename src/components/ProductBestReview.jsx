export default function ProductBestReview(
  {
    bestReviews, reviews, totalRating, reviewImages, onClickReview,
  },

  handleClickBestReview = (reviewId) => {
    onClickReview(reviewId);
  },
) {
  if (bestReviews.length === 0) {
    return <p>베스트 리뷰로 등록된 리뷰가 없습니다</p>;
  }

  return (
    <div>
      <p>
        리뷰 수
        {' '}
        {reviews.length}
        {' '}
        사용자 총 평점
        {totalRating}
        /
        5
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
                src={reviewImages.find((reviewImage) => reviewImage.reviewId === bestReview.id).url}
                alt="reviewImage"
                width="50px"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
