/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  padding-inline: 15%;
`;

const SelectCheckBox = styled.div`
   display: flex;
   justify-content: space-between;
   padding-top: 2%;
   padding-bottom: 2%;
   border-bottom: 1px solid #D9D9D9;
`;

const Allcheck = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    
    input {
      -webkit-transform: scale(2);
    }
`;

const AllcheckLabel = styled.label`
    font-size: 1.4em;
    padding-left: 1em;       
`;

const DeleteButton = styled.button`
  padding-top: .7em;
  padding-bottom: .7em;
  padding-left: 1.5em;
  padding-right: 1.5em;
  background-color: transparent;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  cursor : pointer;
  font-size: 1.1em;
`;

const List = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ListItem = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 2em;
  margin-bottom: 1.5em;
  
  border-top: .5px solid #D9D9D9;
  border-bottom: .5px solid #D9D9D9;
  border-right: 1px solid #D9D9D9;
  

  input {
    margin-right: 1em;
  }
`;

const CartItemImageBox = styled.div`
  display: flex;
  height: 100%;

  input {
    -webkit-transform: scale(1.7);
  }
`;

const CartItem = styled.button`
  display: flex;
  align-items: space;
  border: none;
  background-color: transparent;
  cursor: pointer;
  border-right: 1px solid #D9D9D9;
  height: 100%;
  font-size: 1.3em;

  img {
    background-size: cover;
  }

  p {
    padding-top: 1em;
  }
`;

const CartItemInformation = styled.div`
    margin-left: 1em;
    margin-right: 1em;

    p:nth-child(2) {
      padding-top: 1em;
      font-weight: bold;
    }
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #D9D9D9;
  
  p {
    font-size: 1.2em;
    padding-bottom: 1em;
    padding-left: 1em;
    padding-right: 1em;
  }

  button {
    font-size: 1em;
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    padding: .4em;
    background-color: transparent;
    
    cursor: pointer;
  }
`;

const CartItemPriceBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #D9D9D9;
  
  p {
    font-size: 1.2em;
    padding-bottom: .5em;
  }

  p:nth-child(2) {
    font-size: 1.2em;
    padding-left: 1em;
    padding-right: 1em;
  }

  button {
    font-size: 1em;
    border: 1px solid #D9D9D9;
    border-radius: 3px;
    padding: .4em;
    background-color: transparent;
    
    cursor: pointer;
  }
`;

const DeliveryFeeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  padding-left: 1.5em;

  p {
    padding-bottom: 1em;
  }
`;

const GuideMessage = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5em;
    padding-left: 15%;
    font-size: 1.7em;
    font-weight: 500;
`;

export default function CartItems(
  {
    cartItems,
    checkItems,
    onClickSingleCheck,
    onClickWholeCheck,
    onClickDeleteCartItem,
    onClickCartItem,
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

  if (!cartItems.length) {
    return <GuideMessage>장바구니에 추가된 상품이 없습니다.</GuideMessage>;
  }

  return (
    <Container>
      <SelectCheckBox>
        <Allcheck>
          <input
            id="all-check"
            type="checkbox"
            onChange={(event) => handleClickAllcheck(event.target.checked)}
            checked={checkItems.length === cartItems.length}
          />
          <AllcheckLabel htmlFor="all-check">
            전체 선택
          </AllcheckLabel>
        </Allcheck>
        <DeleteButton
          type="button"
          onClick={handleClickDelete}
        >
          X
          선택 삭제
        </DeleteButton>
      </SelectCheckBox>
      <List>
        {cartItems.map((cartItem) => (
          <ListItem key={cartItem.id}>
            <CartItemImageBox>
              <input
                type="checkbox"
                onClick={(event) => handleClickSingleCheck(event.target.checked, cartItem.id)}
                checked={!!checkItems.includes(cartItem.id)}
              />
              <CartItem
                type="button"
                onClick={() => handleClickCartItem(cartItem.productId)}
              >
                <img
                  src={cartItem.image}
                  alt="productImage"
                  width="150px"
                  height="150px"
                />
                <CartItemInformation>
                  <p>{cartItem.name}</p>
                  <p>
                    {numberFormat(cartItem.totalPayment)}
                    원
                  </p>
                </CartItemInformation>
              </CartItem>
            </CartItemImageBox>
            <OptionBox>
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
            </OptionBox>
            <CartItemPriceBox>
              <p>상품금액</p>
              <p>
                {numberFormat(cartItem.totalPayment)}
                원
              </p>
              <button
                type="button"
                onClick={() => handleClickOrder(cartItem.id)}
              >
                주문하기
              </button>
            </CartItemPriceBox>
            <DeliveryFeeBox>
              <p>배송비</p>
              <p>
                {numberFormat(cartItem.deliveryFee)}
                원
              </p>
            </DeliveryFeeBox>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
