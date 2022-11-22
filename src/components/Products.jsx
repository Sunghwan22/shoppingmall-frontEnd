import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const PageList = styled.ul`
    display: flex;
`;

export default function Products(
  {
    products, onClickProduct, onClickPageNumber, productPageNumbers, onClickWishes,
  },
) {
  const handleClickProduct = (productId) => {
    onClickProduct(productId);
  };

  const handleClickPageNumber = (number) => {
    onClickPageNumber(number);
  };

  const handleClickWishes = (productId) => {
    onClickWishes(productId);
  };

  // const products = [
  //   {
  //     id: 1,
  //     productNumber: 12,
  //     productName: '아이폰 14',
  //     maker: '애플',
  //     category: '전자기기',
  //     views: 1000,
  //     cumulativesales: 150,
  //     price: 1500000,
  //     stock: 100,
  //     maximumQuantity: '50',
  //     description: '이것은 아이폰 14입니다',
  //     deliveryFee: '3000',
  //     options: [{ addAmount: 3000, description: '블랙' },
  //       { addAmount: 5000, description: '화이트' }],
  //     productImages: [{ url: 'https://test-s3-image.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-10-20+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.55.03.png', isThumbnailImage: true },
  //       { url: 'imageUrl', isThumbnailImage: false }],
  //     createdAt: '2022-11-20',
  //     reviewNumber: 155,
  //     wishNumbers: 100,
  //   },
  //   {
  //     id: 2,
  //     productNumber: 13,
  //     productName: '아이폰 13',
  //     maker: '애플',
  //     category: '전자기기',
  //     views: 1000,
  //     cumulativesales: 150,
  //     price: 1000000,
  //     stock: 100,
  //     maximumQuantity: '50',
  //     description: '이것은 아이폰 13입니다',
  //     deliveryFee: '3000',
  //     options: [{ addAmount: 3000, description: '블랙' },
  //       { addAmount: 5000, description: '화이트' }],
  //     productImages: [{ url: 'https://test-s3-image.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-10-20+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+10.55.03.png', isThumbnailImage: true },
  //       { url: 'productImage', isThumbnailImage: false }],
  //     createdAt: '2022-11-20',
  //     reviewNumber: 155,
  //     wishNumbers: 100,
  //   },
  // ];

  // const pageNumbers = [1, 2];

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
                src={product.productImages.find((productImage) => (
                  productImage.isThumbnailImage === true
                )).url}
                alt="productThumbnailImages"
                width="50px"
              />
              <p>{product.productName}</p>
              <p>
                {numberFormat(product.price)}
                {' '}
                원
                {' '}
                배달비
                {' '}
                {numberFormat(product.deliveryFee)}
                {' '}
                원
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
                {numberFormat(product.wishNumbers)}
              </button>
            </p>
          </li>
        ))}
      </ul>
      <PageList>
        {productPageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => handleClickPageNumber(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </PageList>
    </div>
  );
}
