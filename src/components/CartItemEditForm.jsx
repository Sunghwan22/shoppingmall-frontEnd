import { useState } from 'react';
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const ProductOption = styled.select`
  width: 100%;
  padding: 0.3em;
  margin-bottom: 1em;
  cursor: pointer;
`;

const PayInformation = styled.div`
  padding-top: .5em;
  margin-top: .5em;
  margin-bottom: .5em;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;

  p{
    padding-top: 1em;
    text-align: end;
  }
`;

const MinusButton = styled.button`
  font-size: 1em;
  font-weight: bold;
  padding: .6em;
  border: none;
  margin-right: .5em;
  cursor: pointer;
  

  :hover {
    background-color: #adadad;
    color: white;
  }
`;

const PlusButton = styled.button`
  font-size: 1em;
  font-weight: bold;
  padding: .6em;
  border: none;
  margin-left: .5em;
  cursor: pointer; 

  :hover {
    background-color: #adadad;
    color: white;
  }
`;

const PayMoeny = styled.p`
    display:  flex;
    justify-content: space-around;
    align-items: center;

    color: red;
    font-weight: bold;
    font-size: 1.2em;

    span {
      font-size: .5em;
      color: #000;
    }
`;

export default function CartItemEditForm(
  {
    cartItem, options, totalPrice, quantity,
    onClickSelectOption, onClickReduceQuantity, onClickAddQuantity,
    onClickCancel, onClickConfirm, guideMessage,
  },
) {
  const [selectedOption, setSelectedOption] = useState(false);

  const handleClickOption = (event) => {
    const { value } = event.target;

    if (value === '옵션을 선택해주세요') {
      setSelectedOption(false);
      return;
    }

    const productOption = JSON.parse(value);

    setSelectedOption(true);

    onClickSelectOption(productOption);
  };

  const handleClickMinus = () => {
    onClickReduceQuantity();
  };

  const handleClickPlus = () => {
    onClickAddQuantity();
  };

  const handleClickCancel = () => {
    onClickCancel();
  };

  const handleClickConfirm = () => {
    onClickConfirm();
  };

  if (!cartItem.image) {
    return <p>now loading</p>;
  }

  return (
    <div>
      <h2>주문수정</h2>
      <table>
        <thead />
        <tbody>
          <tr>
            <td>
              <img
                src={cartItem.image}
                alt="productImage"
                width="150px"
              />
            </td>
            <td>
              {cartItem.name}
              {' '}
            </td>
            <td>
              {cartItem.description}
              {' '}
            </td>
            <td>
              {' '}
              {numberFormat(cartItem.totalPayment)}
              원
            </td>
          </tr>
        </tbody>
      </table>
      <ProductOption
        id="product-option"
        onChange={handleClickOption}
        name="product-option"
      >
        <option>옵션을 선택해주세요</option>
        {options.map((option) => (
          <option
            key={option.description}
            value={JSON.stringify(option)}
          >
            {option.description}
            {' '}
            +
            {' '}
            {numberFormat(option.addAmount)}
            원
          </option>
        ))}
      </ProductOption>
      {selectedOption ? (
        <PayInformation>
          <MinusButton
            type="button"
            name="minusQuantity-button"
            onClick={handleClickMinus}
          >
            -
          </MinusButton>
          <span>{quantity}</span>
          <PlusButton
            type="button"
            name="addQuantity-button"
            onClick={handleClickPlus}
          >
            +
          </PlusButton>

          <PayMoeny>
            <span>총 상품금액</span>
            {' '}
            {numberFormat(totalPrice)}
            원
          </PayMoeny>
        </PayInformation>
      ) : null}
      <button
        type="button"
        onClick={handleClickCancel}
      >
        취소

      </button>
      <button
        type="button"
        onClick={handleClickConfirm}
      >
        확인
      </button>
      {guideMessage === '옵션을 선택해주세요'
        ? <p>옵션을 선택해주세요</p> : null}
    </div>
  );
}
