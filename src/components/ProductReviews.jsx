import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

/* eslint-disable max-len */
export default function ProductReviews(
  {
    reviews, totalRating, reviewImages, recommendations,
    onClickRecommendation,
  },
) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  const handleClickRecommendation = (reviewId) => {
    if (!accessToken) {
      navigate('/login');
    }

    onClickRecommendation(accessToken, reviewId);
  };

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
          {reviews.length}
        </p>
        <p>
          평점 비율
        </p>
      </div>
      <div>
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
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
                BEST
                {' '}
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
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
