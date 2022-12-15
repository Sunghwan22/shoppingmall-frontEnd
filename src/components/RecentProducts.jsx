import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useCartStore from '../hooks/useCartStore';
import useProductStore from '../hooks/useProductStore';
import useRecentViewItemStore from '../hooks/useRecentViewItemStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  padding-left: 15%;
  padding-right: 15%;
  max-width: 2560px;
  margin-top: 5%;
  padding-bottom: 10em;
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
  font-size: 1.5em;
`;

const Won = styled.p`
  font-size: .8em;
`;

const ProductName = styled.p`
  font-size: 1em;
  color: #444444;
  padding-bottom: .5em;
  padding-top: .5em;

  display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    width: 15em;
    word-break: break-all;
    font-size: 1em;
    height: 5em;
`;

const CartButton = styled.button`
    width: 100%;
    padding-top: .7em;
    padding-bottom: .7em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 2px;
    border: 1px solid #D9D9D9;
    background-color: #FFFFFF;
    cursor: pointer;
    font-size: 1em;
`;

const ButtonWrapper = styled.div`
    width: 90%;
    padding-left: 10%;
`;

const Description = styled.p`
  font-size: 1.5em;
  font-weight: bold;
`;

const Item = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1em;
`;

const GuideMessage = styled.p`
  width: 100%;
  text-align: center;
  padding-bottom: 10%;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 5%;
  font-size: 1.5em;
`;

const H2 = styled.h2`
  padding-top: 5%;
  padding-left: 15%;
  font-size: 1.5em;
  font-weight: bold;
`;

export default function RecentProducts(
  { onClickRecentItemaddCart, onClickCartItem },
) {
  const [recentlyViewProduct] = useLocalStorage('recentlyViewProduct', '');

  const recentViewItemStore = useRecentViewItemStore();
  const productStore = useProductStore();
  const cartStore = useCartStore();

  useEffect(() => {
    if (recentlyViewProduct.length !== 2 || recentlyViewProduct.length !== 0) {
      recentViewItemStore.fetchRecentViewItems(recentlyViewProduct);
    }
  }, []);

  const { recentViewItems } = recentViewItemStore;

  const handleClickAddCart = async (productId) => {
    await productStore.fetchProduct(productId);
    onClickRecentItemaddCart();
    await cartStore.addRecentViewItem();
  };

  const handleClickProduct = (productId) => {
    onClickCartItem(productId);
  };

  if (!recentViewItems.length) {
    return (
      <div>
        <H2>최근 본 상품을 담아보세요!</H2>
        <GuideMessage>최근 본 상품이 없습니다</GuideMessage>
      </div>
    );
  }

  return (
    <Container>
      <Description>최근 본 상품을 담아보세요!</Description>
      <List>
        {recentViewItems.map((recentViewItem) => (
          <ListItem key={recentViewItem.id}>
            <Item
              type="button"
              onClick={() => handleClickProduct(recentViewItem.id)}
            >
              <Image
                src={recentViewItem.productImages.find((productImage) => (
                  productImage.thumbnailImage === true
                )).url}
                alt="productImage"
                width="200px"
                height="200px"
              />
              <PriceBox>
                <Price>
                  {numberFormat(recentViewItem.price)}
                </Price>
                <Won>
                  원
                </Won>
              </PriceBox>
              <ProductName>{recentViewItem.productName}</ProductName>
            </Item>
            <ButtonWrapper>
              <CartButton
                type="button"
                onClick={() => handleClickAddCart(recentViewItem.id)}
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
