import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const PageList = styled.ul`
    display: flex;
`;

export default function Products(
  {
    products, onClickProduct, onClickPageNumbers, pageNumbers, onClickWishes,
  },
) {
  const handleClickProduct = (productId) => {
    onClickProduct(productId);
  };

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
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <button
              type="button"
              onClick={() => handleClickProduct(product.id)}
            >
              <img
                src={product.productImage.url}
                alt="productThumbnailImages"
                width="50px"
              />
              <p>{product.name}</p>
              <p>
                {numberFormat(product.price)}
                원
                {' '}
                배송비
                {' '}
                {numberFormat(product.deliveryFee)}
                원
              </p>
              <p>
                구매건수
                {' '}
                {numberFormat(product.cumulativeSales)}
              </p>
              <p>
                리뷰
                {' '}
                {numberFormat(product.reviewNumber)}
              </p>
              <p>
                등록일
                {' '}
                {product.createdAt}
              </p>
            </button>
            <p>
              <button
                type="button"
                onClick={() => handleClickWishes(product.id)}
              >
                찜하기
                {' '}
                {numberFormat(product.wishNumber)}
              </button>
            </p>
          </li>
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
    </div>
  );
}
