import styled from 'styled-components';
import BallonImage from '../assets/Ballon.png';

const Container = styled.div`
  padding-inline : 15%;
  padding-top: 2em;
`;

const H2 = styled.h2`
  font-size: 1.5em;
  
`;

const PageList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  
  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    margin-right: 1em;
    font-size: 1.1em;
    width: 100%;
  }

  li {
    display: flex;
    align-items: center;
  }
`;

const ReviewGeneralInformation = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 2em;
  padding-top: 2em;
  padding-bottom: 1em;
`;

const TotalRating = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    padding-bottom: 1em;
  }

  p:first-child {
    color: #727272;
  }

  p:last-child {
    font-weight: bold;
    font-size: 2em;
  }
`;

const TotalReviews = styled.div`
   display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    padding-bottom: 1em;
  }

  p:first-child {
    color: #727272;
  }

  p:last-child {
    padding-top: .5em;
    font-weight: bold;
    font-size: 2em;
  }
`;

const RatingPercentage = styled.div`
  
`;

const List = styled.ul`
  width: 100%;

  li {
    width: 100%;
  }
`;

const Review = styled.div`
  width: 100%;
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 2em;
  height: 10em;
  cursor: pointer;
`;

const Content = styled.div`
  font-size: 1.2em;
  padding-left: 2em;

  p {
    padding-bottom: 1em;
    color: #727272;
  }
`;

const UserInformation = styled.div`
  padding-top: 1em;
  display: flex;
  font-size: .9em;
  color: #727272;
`;

const Rating = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

const Button = styled.button`
    font-size: 1.5em;
    border: 1px solid #727272;
    padding: .4em;
    border-radius: .5em;
    background-color: transparent;
    cursor: pointer;
`;

const ReviewContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ProductReviews(
  {
    reviews, totalRating, onClickRecommendation, pageNumbers, onClickPageNumber,
    totalReviewsNumber, onClickReview,
  },
) {
  const handleClickRecommendation = (reviewId, number) => {
    onClickRecommendation(reviewId, number);
  };

  const handleClickPageNumber = (number) => {
    onClickPageNumber(number);
  };

  const handleClickReview = (reviewId) => {
    onClickReview(reviewId);
  };

  if (reviews.length === 0) {
    return <p>작성된 리뷰가 없습니다</p>;
  }

  return (
    <Container>
      <H2>상품 리뷰</H2>
      <ReviewGeneralInformation>
        <TotalRating>
          <p>
            사용자 총 평점
          </p>
          <p>
            ⭐️⭐️⭐️⭐️⭐️
          </p>
          <p>
            {totalRating}
            {' '}
            /
            {' '}
            5
          </p>
        </TotalRating>
        <TotalReviews>
          <p>
            전체 리뷰 수
          </p>
          <img
            src={BallonImage}
            alt="BallonImage"
          />
          <p>
            {totalReviewsNumber}
          </p>
        </TotalReviews>
        <RatingPercentage>
          <p>평점 비율</p>
        </RatingPercentage>
      </ReviewGeneralInformation>
      <div>
        <List>
          {reviews.map((review) => (
            <li key={review.id}>
              <Review>
                <ReviewContent
                  type="button"
                  onClick={() => handleClickReview(review.id)}
                >
                  <img
                    src={review.reviewImages.length !== 0 ? review.reviewImages[0].url
                      : 'productImage'}
                    alt="reviewImage"
                    width="120px"
                    height="120px"
                  />
                  <Content>
                    <Rating>
                      ★★★★★
                      {' '}
                      {review.rating}
                      {' '}
                    </Rating>
                    <UserInformation>
                      <p>
                        {review.userNickName}
                      </p>
                      <p>
                        {review.createdAt}
                      </p>
                    </UserInformation>
                    <p>
                      {review.optionName}
                    </p>
                    <p>
                      {review.content}
                    </p>
                  </Content>
                </ReviewContent>
                <Button
                  type="button"
                  onClick={() => handleClickRecommendation(review.id)}
                >
                  추천
                  {review.recommendations.length}
                </Button>
              </Review>
            </li>
          ))}
        </List>
        <PageList>
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                type="button"
                onClick={() => handleClickPageNumber(number)}
                id={`review-pageNumber${number}`}
                data-testid={`review-pageNumber${number}`}
              >
                {number}
              </button>
            </li>
          ))}
        </PageList>
      </div>
    </Container>
  );
}
