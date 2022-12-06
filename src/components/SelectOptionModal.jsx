import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import numberFormat from '../utils/NumberFormat';

const StyledModal = Modal.styled`
    font-size : .8em;
    width: 20rem;
    height : 100%;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
`;

const ProductOption = styled.select`
  width: 80%;
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

export default function SelectOptionModal({
  product, totalPayment, onClickCancel, quantity, guideMessage,
  onClickSelectOption, onClickAddQuantity, onClickReduceQuantity, onClickResetOption,
  onClickAddCartItem,
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(false);

  const handleClickClose = () => {
    setIsOpen(false);
    onClickCancel();
  };

  const handleClickOption = (event) => {
    const { value } = event.target;

    if (value === '옵션을 선택해주세요') {
      setSelectedOption(false);
      onClickResetOption();
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

  const handleClickAddCart = () => {
    onClickAddCartItem(product.id);
  };

  if (!product || !product.productImages) {
    return <p>Now Loading...</p>;
  }

  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={handleClickClose}
      onEscapeKeydown={handleClickClose}
    >
      <h2>상품옵션 선택</h2>
      <img
        src={product.productImages.find((productImage) => (
          productImage.thumbnailImage === true
        )).url}
        alt="productImage"
        width="100px"
      />
      <p>{product.productName}</p>
      <ProductOption
        id="product-option"
        onChange={handleClickOption}
        name="product-option"
      >
        <option>옵션을 선택해주세요</option>
        {product.options.map((option) => (
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
            {numberFormat(totalPayment)}
            원
          </PayMoeny>
        </PayInformation>
      ) : null}
      <button
        type="button"
        onClick={handleClickAddCart}
      >
        장바구니 추가
      </button>
      {guideMessage === '옵션을 선택해주세요'
        ? <p>옵션을 선택해주세요</p> : null}
    </StyledModal>
  );
}
