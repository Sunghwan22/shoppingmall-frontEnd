export default function ProductReviews(
  {
    reviews, totalRating, reviewImages,
  },
) {
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
    </div>
  );
}
