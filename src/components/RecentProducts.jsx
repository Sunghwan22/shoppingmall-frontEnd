import numberFormat from '../utils/NumberFormat';

export default function RecentProducts(
  { recentViewItems, onClickaddCart },
) {
  const handleClickAddCart = (productId) => {
    onClickaddCart(productId);
  };

  if (!recentViewItems.length) {
    return <p>now Loading...</p>;
  }

  return (
    <div>
      <p>XXX님이 최근 본 상품을 담아보세요</p>
      <ul>
        {recentViewItems.map((recentWishItem) => (
          <li key={recentWishItem.id}>
            <img
              src={recentWishItem.productImages.find((productImage) => (
                productImage.thumbnailImage === true
              )).url}
              alt="productImage"
              width="100px"
            />
            <p>{recentWishItem.productName}</p>
            <p>
              {numberFormat(recentWishItem.price)}
              원
            </p>
            <button
              type="button"
              onClick={() => handleClickAddCart(recentWishItem.id)}
            >
              장바구니 추가
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
