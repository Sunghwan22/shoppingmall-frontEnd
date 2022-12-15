import { useEffect } from 'react';
import styled from 'styled-components';
import useCartStore from '../hooks/useCartStore';
import useProductStore from '../hooks/useProductStore';
import useWishItemStore from '../hooks/useWishItemStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  padding-left: 15%;
  padding-right: 15%;
  margin-top: 5%;
  font-size: 1.5em;
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
  margin-right: 3em;
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

  display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 15em;
    word-break: break-all;
    font-size: .7em;
    height: 4em;
`;

const CartButton = styled.button`
    width: 100%;
    font-size: .7em;
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
  font-size: .9em;
`;

const GuideMessage = styled.p`
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 5%;
`;

export default function WishItems(
  { onClickWishItemaddCart, onClickCartItem, accessToken },
) {
  const wishItemStore = useWishItemStore();
  const productStore = useProductStore();
  const cartStore = useCartStore();

  useEffect(() => {
    wishItemStore.fetchWishItems(accessToken);
  }, []);

  const { wishItems } = wishItemStore;

  const handleClickAddCart = async (wishItemId) => {
    await productStore.fetchProduct(wishItemId);
    onClickWishItemaddCart();
    await cartStore.addWishItem();
  };

  const handleClickProduct = (wishItemId) => {
    onClickCartItem(wishItemId);
  };

  if (!wishItems.length) {
    return <GuideMessage>찜한 상품이 없습니다!</GuideMessage>;
  }

  return (
    <Container>
      <Description>찜한 상품을 담아보세요!</Description>
      <List>
        {wishItems.map((wishItem) => (
          <ListItem
            key={wishItem.id}
          >
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
              <PriceBox>
                <Price>
                  {numberFormat(wishItem.price)}
                </Price>
                <Won>
                  원
                </Won>
              </PriceBox>
              <ProductName>{wishItem.productName}</ProductName>
            </Item>
            <ButtonWrapper>
              <CartButton
                type="button"
                onClick={() => handleClickAddCart(wishItem.id)}
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
