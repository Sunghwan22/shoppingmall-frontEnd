import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useWriteableReviewProductStore from '../hooks/useWriteableReviewProductStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
    width: 100%;
`;

const List = styled.ul`
  width: 100%;
`;

const PageList = styled.ul`
  display: flex;
  justify-content: center;
  width: 50%;

  button {
    border: none;
    background-color: transparent;
    font-size: .7em;
    margin-right: 1em;
    cursor: pointer;
    color: #9A9A9A;
  }
`;

const ProductInformation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 3em;
`;

const ListItem = styled.li`
  width: 100%;
  display: flex;
  padding-bottom: 1em;
  padding-top: 2em;
  border-bottom: 1px solid #D9D9D9;
`;

const Image = styled.img`
  border-radius: 1em;
`;

const ProductName = styled.div`
    font-size: .7em;
    padding-bottom: 0.5em;
    color: black;

    p:first-child {
      padding-bottom: 1em;
    }
    
    p:nth-child(2) {
      padding-bottom: 1em;
    }
`;

const PriceBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;

  p {
    padding-right: .6em;
    font-size: .7em;
    color: red;
    padding-top: 1.5em;
  }
`;

const WriteReviewButton = styled.button`
  background-color: transparent;
  font-size: .6em;
  padding-inline: 1em;
  border: 1px solid #D9D9D9;
  cursor: pointer;
  border-radius: 5px;
`;

export default function WriteableReviews({ accessToken, onClickWriteReview }) {
  const writeableReviewProductStore = useWriteableReviewProductStore();

  useEffect(() => {
    writeableReviewProductStore.fetchWriteableOrders({ accessToken });
  }, []);

  const { writeableReviewProducts, pageNumbers } = writeableReviewProductStore;

  if (!writeableReviewProducts.length) {
    return <p>작성 가능한 리뷰가 없습니다</p>;
  }

  const handleClickPageNumber = (page) => {
    writeableReviewProductStore.fetchWriteableProducts({ accessToken, page });
  };

  const handleClickWriteReview = (writeableReviewProductId) => {
    onClickWriteReview(writeableReviewProductId);
  };

  return (
    <Container>
      <h2>작성 가능한 리뷰</h2>
      <List>
        {writeableReviewProducts.map((writeableReviewProduct) => (
          <ListItem key={writeableReviewProduct.id}>
            <Link to={`/product/${writeableReviewProduct.productId}`}>
              <Image
                src={writeableReviewProduct.imageUrl}
                alt="productImage"
                width="200px"
                height="180px"
              />
            </Link>
            <ProductInformation>
              <Link to={`/product/${writeableReviewProduct.productId}`}>
                <ProductName>
                  <p>
                    {writeableReviewProduct.name}
                  </p>
                  {' '}
                  <p>
                    옵션/
                    {writeableReviewProduct.description}
                  </p>
                  <p>
                    {writeableReviewProduct.createdAt}
                  </p>
                </ProductName>
              </Link>
              <PriceBox>
                <p>
                  가격
                  {' '}
                  ex
                  {' '}
                  {numberFormat((writeableReviewProduct.orderPayment))}
                  원
                </p>
                <WriteReviewButton
                  onClick={() => handleClickWriteReview(writeableReviewProduct.id)}
                  type="button"
                >
                  리뷰 작성하기
                </WriteReviewButton>
              </PriceBox>
            </ProductInformation>
          </ListItem>
        ))}
      </List>
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
