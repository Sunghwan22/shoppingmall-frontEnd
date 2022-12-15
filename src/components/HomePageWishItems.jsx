import { useEffect } from 'react';
import styled from 'styled-components';
import useWishItemStore from '../hooks/useWishItemStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  padding-top: 5em;
  width: 100%;
  padding-bottom: 10em;
`;

const H2 = styled.h2`
  font-size: 1.5em;
  padding-bottom: 1em;
  padding-top: 2em;
  font-weight: bold;
`;

const List = styled.ul`
  display: flex;
  width: 100%;
  overflow: scroll;
  padding-top: 2.5%;
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-right: 1em;
  border-radius: 5px;

  &:hover{
    -webkit-transform: translateY(-3px);
    -ms-transform: translateY(-3px);
    transform: translateY(-3px);
    -webkit-box-shadow: 0 0 6px #999;
    box-shadow: 0 0 6px #999;
    -webkit-transition: all .5s ease-out;
    transition: all .5s ease-out;
  }
`;

const Image = styled.img`
  border-radius: 5px;
`;

const Price = styled.p`
  font-weight: bold;
  color: #444444;
  font-size: 1em;
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-top: .5em;
  padding-bottom: .3em;
  font-size: 1.5em;
`;

const Won = styled.p`
  font-size: .8em;
`;

const ProductName = styled.p`
  font-size: 1.2em;
  color: #444444;
  padding-bottom: .3em;
  padding-top: .6em;

  display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 15em;
    word-break: break-all;
    font-size: 1em;
    height: 5em;
`;

const Maker = styled.p`
  padding-top: .5em;
  font-size: 1.5em;
  color: #999999;
`;

const Item = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1em;
  text-align: left;
`;

const GuideMessage = styled.p`
  width: 100%;
  padding-top: 2em;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function HomePageWishItems(
  { accessToken, onClickProduct },
) {
  const wishItemStore = useWishItemStore();

  useEffect(() => {
    wishItemStore.fetchWishItems(accessToken);
  }, []);

  const { wishItems } = wishItemStore;

  const handleClickProduct = (productId) => {
    onClickProduct(productId);
  };

  if (!accessToken) {
    return (
      <div>
        <H2>찜한 상품</H2>
        <GuideMessage>로그인 후 이용 가능합니다</GuideMessage>
      </div>
    );
  }

  if (wishItems.length === 0) {
    return (
      <div>
        <H2>찜한 상품</H2>
        <GuideMessage>찜한 상품이 없습니다</GuideMessage>
      </div>
    );
  }

  return (
    <Container>
      <H2>찜한 상품</H2>
      <List>
        {wishItems.map((wishItem) => (
          <ListItem key={wishItem.id}>
            <Item
              type="button"
              onClick={() => handleClickProduct(wishItem.id)}
            >
              <Image
                src={wishItem.productImages.find((productImage) => (
                  productImage.thumbnailImage === true
                )).url}
                alt="productImage"
                width="200px"
                height="200px"
              />
              <Maker>{wishItem.maker}</Maker>
              <ProductName>{wishItem.productName}</ProductName>
              <PriceBox>
                <Price>
                  {numberFormat(wishItem.price)}
                </Price>
                <Won>
                  원
                </Won>
              </PriceBox>
            </Item>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
