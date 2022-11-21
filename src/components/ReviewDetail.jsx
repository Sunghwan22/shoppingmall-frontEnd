import { v4 } from 'uuid';

export default function ReviewDetail({
  review, onClickExitReviewDetail,
}) {
  const handleClickExit = () => {
    onClickExitReviewDetail();
  };

  return (
    <div>
      <ul>
        {review.reviewImages.map((reviewImage) => (
          <img
            key={v4()}
            src={reviewImage.url}
            alt="reviewImage"
            width="50"
          />
        ))}
      </ul>
      평점
      {review.rating}
      {review.userNickName}
      {review.createdAt}
      <p>
        {review.content}
      </p>
      <button
        type="button"
        onClick={handleClickExit}
      >
        X
      </button>
    </div>
  );
}
