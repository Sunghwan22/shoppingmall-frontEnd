export default function ReviewDetail({
  review, recommendations, reviewImage, onClickRecommendation,
  onClickExitReviewDetail,
}) {
  const handleClickExit = () => {
    onClickExitReviewDetail();
  };

  const handleClickRecommendation = (reviewId) => {
    onClickRecommendation(reviewId);
  };

  return (
    <div>
      <p>
        <img
          src={reviewImage.url}
          alt="reviewImage"
          width="75px"
        />
        <p>
          평점
          {review.rating}
          {review.userNickName}
          {review.createdAt}
        </p>
        <p>
          {review.content}
        </p>
        <button
          type="button"
          onClick={() => handleClickRecommendation(review.id)}
        >
          추천
          {recommendations.filter(
            (recommendation) => recommendation.reviewId === review.id,
          ).length}
        </button>
        <button
          type="button"
          onClick={handleClickExit}
        >
          X
        </button>
      </p>
    </div>
  );
}
