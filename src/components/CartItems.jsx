/* eslint-disable jsx-a11y/label-has-associated-control */
import numberFormat from '../utils/NumberFormat';

export default function CartItems(
  { cartItems },
) {
  const handleClickAllcheck = () => {

  };

  const handleClickDelete = () => {

  };

  const handleClickSelect = () => {

  };

  const handleClickCartItem = (productId) => {

  };

  const handleClickEditOrder = (cartItemId) => {

  };

  const handleClickOrder = () => {

  };

  return (
    <div>
      <div>
        <label htmlFor="all-check">
          전체선택
        </label>
        <input
          type="checkbox"
          onChange={handleClickAllcheck}
        />
        <button
          type="button"
          onClick={handleClickDelete}
        >
          선택 삭제
        </button>
      </div>
      {cartItems.map((cartItem) => (
        <li key={cartItem.id}>
          <input
            type="checkbox"
            onClick={handleClickSelect}
          />
          <button
            type="button"
            onClick={() => handleClickCartItem(cartItem.productId)}
          >
            <img
              src={cartItem.cartItemImage.url}
              alt="productImage"
              width="100px"
            />
            <p>{cartItem.name}</p>
            <p>
              {numberFormat(cartItem.totalPayment)}
              원
            </p>
          </button>
          <p>
            옵션 :
            {' '}
            {cartItem.description}
            {' '}
            +
            {numberFormat(cartItem.addAmount)}
            원
            /
            {cartItem.quantity}
            개
          </p>
          <button
            type="button"
            onClick={() => handleClickEditOrder(cartItem.id)}
          >
            주문수정
          </button>
          <p>상품금액</p>
          {numberFormat(cartItem.totalPayment)}
          원
          <button
            type="button"
            onClick={handleClickOrder}
          >
            주문하기

          </button>
        </li>
      ))}
    </div>
  );
}
