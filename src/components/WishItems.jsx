import numberFormat from '../utils/NumberFormat';

export default function WishItems(
  { wishItems, onClickaddCart },
) {
  const handleClickAddCart = (wishItemId) => {
    onClickaddCart(wishItemId);
  };

  return (
    <div>
      <p>XXX님이 찜한 상품을 담아보세요</p>
      <ul>
        {wishItems.map((wishItem) => (
          <li key={wishItem.id}>
            <img
              src={wishItem.productImages.find((productImage) => (
                productImage.thumbnailImage === true
              )).url}
              alt="productImage"
              width="100px"
            />
            <p>{wishItem.productName}</p>
            <p>
              {numberFormat(wishItem.price)}
              원
            </p>
            <button
              type="button"
              onClick={() => handleClickAddCart(wishItem.id)}
            >
              장바구니 추가
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
