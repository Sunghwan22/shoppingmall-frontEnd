import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import HomePageWishItems from '../components/HomePageWishItems';
import RecentViewItem from '../components/RecentViewItems';

const Container = styled.div`
  width: 100%;
  padding-inline: 15%;
  padding-top: 2em;
`;

export default function HomePage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();

  const onClickProduct = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container>
      <RecentViewItem
        onClickProduct={onClickProduct}
      />
      <HomePageWishItems
        accessToken={accessToken}
        onClickProduct={onClickProduct}
      />
    </Container>
  );
}
