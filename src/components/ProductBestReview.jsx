export default function ProductBestReview(
  {
    bestReviews, reviews, totalRating, reviewImages,
  },

) {
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
            <button type="button">
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
