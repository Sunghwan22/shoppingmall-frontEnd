/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const PageList = styled.ul`
    display: flex;
`;

export default function CartItems(
  {
    cartItems,
    checkItems,
    pageNumbers,
    onClickSingleCheck,
    onClickWholeCheck,
    onClickDeleteCartItem,
    onClickCartItem,
    onClickPageNumber,
    onClickOrder,
    onClickEditOrder,
  },
) {
  const handleClickAllcheck = (checked) => {
    onClickWholeCheck(checked);
  };

  const handleClickDelete = () => {
    onClickDeleteCartItem();
  };

  const handleClickSingleCheck = (checked, cartItemId) => {
    onClickSingleCheck(checked, cartItemId);
  };

  const handleClickCartItem = (productId) => {
    onClickCartItem(productId);
  };

  const handleClickEditOrder = (cartItemId) => {
    onClickEditOrder(cartItemId);
  };

  const handleClickOrder = (cartItemId) => {
    onClickOrder(cartItemId);
  };

  const handleClickPageNumber = (number) => {
    onClickPageNumber(number);
  };

  return (
    <div>
      <div>
        <label htmlFor="all-check">
          전체선택
        </label>
        <input
          type="checkbox"
          onChange={(event) => handleClickAllcheck(event.target.checked)}
          checked={checkItems.length === cartItems.length}
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
            onClick={(event) => handleClickSingleCheck(event.target.checked, cartItem.id)}
            checked={!!checkItems.includes(cartItem.id)}
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
            onClick={() => handleClickOrder(cartItem.id)}
          >
            주문하기
          </button>
        </li>
      ))}
      <PageList>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              type="button"
              onClick={() => handleClickPageNumber(number)}
              id={`cartItems-pageNumber${number}`}
            >
              {number}
            </button>
          </li>
        ))}
      </PageList>
    </div>
  );
}
