import { useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import WriteableReviews from '../components/WriteableReviews';
import WriteReviewForm from '../components/WriteReviewForm';

const Container = styled.div`
  width: 100%;
  max-height: 100%;
  padding-inline : 15%;
  padding-top: 2em;
  display: grid;
  grid-template-columns: 2fr 8fr ;
`;

const SideBar = styled.div`
  width: 13em;
  height: 100%;
`;

const UserProfile = styled.div`
  height: 30%;
`;

const Profile = styled.img`
  height: 50%;
`;

const SideBarLink = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 2em;
`;

const InterestProduct = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.5em;
  color: #35992D;
  font-weight: bold;
  margin-bottom: 1em;
  cursor: pointer;
`;

const WishItems = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.1em;
  margin-bottom: 1.2em;
  cursor: pointer;
`;

const RecentViewItem = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.1em;
  margin-bottom: 2em;
  cursor: pointer;
`;

const ProductReview = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.5em;
  color: #35992D;
  font-weight: bold;
  margin-bottom: 1em;
  cursor: pointer;
`;

const WriteReviewProducts = styled.button`
  border: none;
  background-color: transparent;
  font-size: 1.1em;
  margin-bottom: 1.2em;
  cursor: pointer;
`;

const ContentArea = styled.div`
  width: 100%;
  padding-left: 10%;
  font-size: 2em;
  height: 100%;
`;

export default function MyPage() {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [writeReviewId, setWriteReviewId] = useLocalStorage('writeReviewId', '');

  const [writeReviewForm, setWriteReviewForm] = useState(false);

  const onClickWriteReview = (writeableReviewProductId) => {
    setWriteReviewId(writeableReviewProductId);
    setWriteReviewForm(true);
  };

  return (
    <Container>
      <SideBar>
        <UserProfile>
          <Profile
            src="https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/309/59932b0eb046f9fa3e063b8875032edd_crop.jpeg"
            alt="userProfile"
            width="100%"
            height="50%"
          />
          <SideBarLink>
            <InterestProduct>관심 상품</InterestProduct>
            <WishItems>찜한 상품</WishItems>
            <RecentViewItem>최근 본 상품</RecentViewItem>
            <ProductReview>상품 리뷰</ProductReview>
            <WriteReviewProducts>
              작성 가능한 리뷰
            </WriteReviewProducts>
            <WriteReviewProducts>작성한 리뷰</WriteReviewProducts>
          </SideBarLink>
        </UserProfile>
      </SideBar>
      <ContentArea>
        {writeReviewForm ? (
          <WriteReviewForm
            writeReviewId={writeReviewId}
          />
        ) : (
          <WriteableReviews
            accessToken={accessToken}
            onClickWriteReview={onClickWriteReview}
          />
        )}
      </ContentArea>
    </Container>
  );
}
