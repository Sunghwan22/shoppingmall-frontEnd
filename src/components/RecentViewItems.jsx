import { useEffect } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import useRecentViewItemStore from '../hooks/useRecentViewItemStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  width: 100%;
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

export default function RecentViewItems({
  onClickProduct,
}) {
  const recentViewItemStore = useRecentViewItemStore();
  const [recentlyViewProduct] = useLocalStorage('recentlyViewProduct', JSON.stringify([]));

  useEffect(() => {
    recentViewItemStore.fetchRecentViewItems(recentlyViewProduct);
  }, []);

  const { recentViewItems } = recentViewItemStore;

  const handleClickProduct = (productId) => {
    onClickProduct(productId);
  };

  if (!recentViewItems.length) {
    return (
      <div>
        <H2>최근 본 상품</H2>
        <GuideMessage>최근 본 상품이 없습니다</GuideMessage>
      </div>
    );
  }

  return (
    <Container>
      <H2>최근 본 상품</H2>
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
              <Maker>{recentViewItem.maker}</Maker>
              <ProductName>{recentViewItem.productName}</ProductName>
              <PriceBox>
                <Price>
                  {numberFormat(recentViewItem.price)}
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
