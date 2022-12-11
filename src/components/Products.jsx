import { Link } from 'react-router-dom';
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';
import Heart from '../assets/Heart.png';

const PageList = styled.ul`
  display: flex;
  justify-content: center;
  padding-bottom: 10em;

  button {
    border: none;
    background-color: transparent;
    font-size: 1.5em;
    margin-right: 2em;
    cursor: pointer;
    color: #9A9A9A;
  }
`;

const Container = styled.div`
  width: 100%;
  padding-inline: 15%;
  padding-top: 3em;
`;

const ProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 3em;
`;

const ListItem = styled.li`
  display: flex;
  padding-bottom: 3em;
`;

const Image = styled.img`
  border-radius: 1em;
`;

const ProductName = styled.p`
    font-size: 1.5em;
    padding-bottom: 0.5em;
    color: black;
`;

const PriceBox = styled.div`
  display: flex;
  padding-bottom: 1em;

  p {
    padding-right: 1em;
    font-size: 1.2em;
    color: red;
  }

  p:last-child {
    color: black;
    font-size: 1em;
  }
`;

const BottomArea = styled.div`
    display: flex;
    align-items: center;
    font-size: 1.3em;
    padding-top: 1em;
    
    p {
      padding-right: .5em;
    }

    p:nth-child(2) {
        color: #35992D;
      }

    button {
      border: none;
      background-color: transparent;
      font-size: 0.9em;
      cursor: pointer;
      display: flex;

      p:nth-child(2) {
        color: #35992D;
      }
    }
`;

const HeartImage = styled.img`
  padding-right: .2em;
`;

const ReviewNumber = styled.p`
   color: #35992D;
`;

export default function Products(
  {
    products, onClickPageNumbers, pageNumbers, onClickWishes,
  },
) {
  const handleClickPageNumber = (number) => {
    onClickPageNumbers(number);
  };

  const handleClickWishes = (productId) => {
    onClickWishes(productId);
  };

  if (products.length === 0) {
    return <p>검색어에 맞는 상품이 없습니다</p>;
  }

  return (
    <Container>
      <ul>
        {products.map((product) => (
          <ListItem key={product.id}>
            <Link to={`/product/${product.id}`}>
              <Image
                src={product.productImage.url}
                alt="productThumbnailImages"
                width="213px"
                height="200px"
              />
            </Link>
            <ProductInformation>
              <Link to={`/product/${product.id}`}>
                <ProductName>{product.name}</ProductName>
              </Link>
              <PriceBox>
                <p>
                  {numberFormat(product.price)}
                  원
                </p>
                <p>
                  배송비
                  {' '}
                  {numberFormat(product.deliveryFee)}
                  원
                </p>
              </PriceBox>
              <BottomArea>
                <p>
                  구매건수
                </p>
                <p>
                  {numberFormat(product.cumulativeSales)}
                </p>
                <p>
                  리뷰
                </p>
                <ReviewNumber>
                  {numberFormat(product.reviewNumber)}
                </ReviewNumber>
                <p>
                  <button // 버튼안에 온 클릭을 2개 넣지 마라인가 아니면 버튼을 넣지마리 일까 아니면
                    type="button"
                    onClick={() => handleClickWishes(product.id)}
                  >
                    <HeartImage
                      src={Heart}
                      alt="HeartImage"
                    />
                    <p>
                      찜하기
                    </p>
                    <p>
                      {numberFormat(product.wishNumber)}
                    </p>
                  </button>
                </p>
                <p>
                  등록일
                  {' '}
                  {product.createdAt}
                </p>
              </BottomArea>
            </ProductInformation>
          </ListItem>
        ))}
      </ul>
      <PageList>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => handleClickPageNumber(number)}
              id={`products-pageNumber${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </PageList>
    </Container>
  );
}
