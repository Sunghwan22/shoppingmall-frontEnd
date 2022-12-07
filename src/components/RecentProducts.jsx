import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  padding-left: 15%;
  padding-right: 15%;
  margin-top: 5%;
  padding-bottom: 5%;
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
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-top: .5em;
  padding-bottom: .3em;
`;

const Won = styled.p`
  font-size: .8em;
`;

const ProductName = styled.p`
  font-size: .8em;
  color: #444444;
  padding-bottom: .3em;
  padding-top: .3em;
`;

const CartButton = styled.button`
    padding-top: .7em;
    padding-bottom: .7em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 2px;
    border: 1px solid #D9D9D9;
    background-color: #FFFFFF;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    width: 90%;
    padding-left: 10%;
`;

const Description = styled.p`
  font-weight: bold;
`;

const Item = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const GuideMessage = styled.p`
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 5%;
`;

export default function RecentProducts(
  { recentViewItems, onClickRecentItemaddCart, onClickCartItem },
) {
  const handleClickAddCart = (productId) => {
    onClickRecentItemaddCart(productId);
  };

  const handleClickProduct = (wishItemId) => {
    onClickCartItem(wishItemId);
  };

  if (!recentViewItems.length) {
    return <GuideMessage>최근 본 상품이 없습니다</GuideMessage>;
  }

  return (
    <Container>
      <Description>최근 본 상품을 담아보세요!</Description>
      <List>
        {recentViewItems.map((recentWishItem) => (
          <ListItem key={recentWishItem.id}>
            <Item
              type="button"
              onClick={() => handleClickProduct(recentViewItems.id)}
            >
              <Image
                src={recentWishItem.productImages.find((productImage) => (
                  productImage.thumbnailImage === true
                )).url}
                alt="productImage"
                width="150px"
                height="120px"
              />
              <PriceBox>
                <Price>
                  {numberFormat(recentWishItem.price)}
                </Price>
                <Won>
                  원
                </Won>
              </PriceBox>
              <ProductName>{recentWishItem.productName}</ProductName>
            </Item>
            <ButtonWrapper>
              <CartButton
                type="button"
                onClick={() => handleClickAddCart(recentWishItem.id)}
              >
                장바구니 추가
              </CartButton>
            </ButtonWrapper>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
