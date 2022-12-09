import styled from 'styled-components';
import { v4 } from 'uuid';

const Container = styled.div`
  padding-top: 3em;
  padding-inline: 15%;
  width: 100%;
  
`;

const List = styled.ul`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  padding-bottom: 5em;
  border-bottom: 1px solid #D9D9D9;
    
  li {

    img {
      width: 95%;
      height: 100%;
      padding-bottom: 1em;
    }
  }
`;

const UserRating = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3em;

  p {
    padding-right: 1em;
    padding-bottom: 1em;
  }
`;

const UserInformation = styled.div`
  display: flex;

  p{
    color: #727272;
    font-size: 1.2em;
    padding-right: .7em;
    padding-bottom: 1em;
  }
`;

const Content = styled.p`
  color: #727272;
  font-size: 1.2em;
  padding-top: 1em;
  padding-bottom: 2em;
`;

const ExitButton = styled.button`
  font-size: 1.5em;
  border: 1px solid #727272;
  background-color: transparent;
  padding: .4em;
  cursor: pointer;
`;

export default function ReviewDetail({
  review, onClickExitReviewDetail,
}) {
  const handleClickExit = () => {
    onClickExitReviewDetail();
  };

  return (
    <Container>
      <UserRating>
        <p>
          ⭐️⭐️⭐️⭐️⭐️
          {' '}
          {review.rating}
        </p>
        <ExitButton
          type="button"
          onClick={handleClickExit}
        >
          X
        </ExitButton>
      </UserRating>
      <UserInformation>
        <p>
          {review.userNickName}
        </p>
        <p>
          {review.createdAt}
        </p>
        <p>
          {review.optionName}
        </p>
      </UserInformation>
      <Content>
        {review.content}
      </Content>
      <List>
        {review.reviewImages.map((reviewImage) => (
          <li key={v4()}>

            <img
              src={reviewImage.url}
              alt="reviewImage"
            />
          </li>
        ))}
      </List>
    </Container>
  );
}
