import styled from 'styled-components';

const Container = styled.div`
  padding-inline: 15%;
  width: 100%;
  
`;

const PageList = styled.ul`
    display: flex;   
    justify-content: center;
    padding-bottom: 2em;
    border-bottom: 1px solid #D9D9D9;
    padding-top: 1em;

    li {
      button {
        border: none;
        background-color: transparent;
        font-size : 1.2em;
        padding-right: 1em;
        cursor: pointer;
      }
    }
`;

const TotalReviewNumber = styled.div`
    width: 100%;
    display: flex;
    padding-bottom: 1em;
    border-bottom: 1px solid #D9D9D9;

    div {
      width: 20%;
      display: flex;
    }
    
    p {
      padding-top: .67em;
      padding-right: .5em;
      color: #727272;
      font-size: 1em;
    }

    span {
      font-size: 2em;
      font-weight: bold;
    }
`;

const ReviewList = styled.ul`
    display: grid;
    padding-top: 1em; 
    grid-template-columns: 1fr 1fr;
`;

const Review = styled.li`
  display: flex;
  align-items: flex-start;
  padding-bottom: 1em;

  button {
    text-align: start;
    padding: 1em;
    border: none;
    background-color: transparent;
    cursor : pointer;
  }
`;

const UserReviewRating = styled.span`
  font-weight: bold;
  font-size: 1.5em;
  padding-left: 1em;
`;

const UserReviewRatingBox = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 1em;
  font-size: 1.5em;
`;

const UserInformation = styled.div`
  display: flex;
  
  p {
    padding-right: .6em;
    padding-left: .4em;
    padding-bottom: .5em;
    color: #727272;
    font-size: 1.2em;
    padding-bottom : 1em;
  }
`;

const ReviewContent = styled.div`
  display: flex;
  color: #727272;
  
  p:first-child {
    color: red;
    font-weight: bold;
    padding-right: 1em;
    font-size: 1.2em;
  }

  p:nth-child(2) {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 20em;
    word-break: break-all;
    font-size: 1em;
    height: 1em;
  }
`;

const Image = styled.img`
  border-radius: 1em;
`;

const Recommendation = styled.button`
  margin-top: 1.5em;
  margin-right: 1em;
  font-size: 1.2em;
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
    <Container>
      <TotalReviewNumber>
        <div>
          <p>
            리뷰 수
          </p>
          <span>
            {' '}
            {totalReviewsNumber}
          </span>
        </div>
        <div>
          <p>
            {' '}
            사용자 총 평점
          </p>
          <span>
            {totalRating}
            /5
          </span>
        </div>
      </TotalReviewNumber>
      <ReviewList>
        {bestReviews.map((bestReview) => (
          <Review key={bestReview.id}>
            <button
              type="button"
              onClick={() => handleClickBestReview(bestReview.id)}
            >
              <UserReviewRatingBox>
                <span>
                  ★★★★★
                  {' '}
                  {' '}
                </span>
                <UserReviewRating>
                  {bestReview.rating}
                </UserReviewRating>
              </UserReviewRatingBox>
              <UserInformation>
                <p>
                  {bestReview.userNickName}
                </p>
                <p>
                  {bestReview.createdAt}
                </p>
                <p>
                  {bestReview.optionName}
                </p>
              </UserInformation>
              <ReviewContent>
                <p>
                  BEST
                </p>
                <p>
                  {bestReview.content}
                </p>
              </ReviewContent>
            </button>
            <Recommendation
              type="button"
              onClick={() => handleClickRecommendation(bestReview.id)}
            >
              추천
              {bestReview.recommendations.length}
            </Recommendation>
            <Image
              src={bestReview.reviewImages.length !== 0 ? bestReview.reviewImages[0].url
                : 'productImage'}
              alt="reviewImage"
              width="150px"
              height="150px" // 버튼을 누르면 리뷰의 밑에 나와야 하니까 어떻게 해야할까?
            />
          </Review>
        ))}
      </ReviewList>
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
    </Container>
  );
}
