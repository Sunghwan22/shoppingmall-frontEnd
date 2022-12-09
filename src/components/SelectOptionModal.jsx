import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import numberFormat from '../utils/NumberFormat';
import AddCartImage from '../assets/addcart.png';

const StyledModal = Modal.styled`
    font-size : .8em;
    width: 30%;
    height : 100%;
    display: flex;
    flex-direction : column;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 5px;
`;

const ProductOption = styled.select`
  width: 90%;
  padding: 0.3em;
  margin-bottom: 1em;
  cursor: pointer;
`;

const PayInformation = styled.div`
  width: 90%;
  padding-top: .5em;
  padding-bottom: .5em;
  border-radius: .4em;
  margin-top: .5em;
  margin-bottom: .5em;
  background-color: #f0eded;

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
  border-right: 1px solid;
`;

const PlusButton = styled.button`
  font-size: 1em;
  font-weight: bold;
  padding: .6em;
  border: none;
  margin-left: .5em;
  cursor: pointer; 
  border-left: 1px solid;
`;

const PayMoeny = styled.p`
    display:  flex;
    width: 90%;
    justify-content: flex-end;
    align-items: center;

    color: red;
    font-weight: bold;
    font-size: 1.2em;

    span {
      padding-right: 1.5em;
      font-size: .5em;
      color: #000;
    }
`;

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    
`;

const Title = styled.h2`
  width: 90%;
  display: flex;
  justify-content: center;
  font-weight: bold;
  padding-bottom: 1em;
  border-bottom: 2px solid ;
  padding-top: 2em;
`;

const ProductImageAndName = styled.div`
  width: 90%;
  display: flex;
  padding-top: 2em;
  padding-bottom: 2em;
  p {
    padding-left: 1em;
  }
`;

const Label = styled.label`
  display: flex;
  width: 90%;
  padding-bottom: .5em;
`;

const QuantityBox = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1em;
  margin-left: 1em;
  border: 1px solid;
`;

const AddCartButton = styled.button`
    width: 100%;
    margin-top: 10em;
    padding-top: 1em;
    padding-bottom: 1em;
    background-color: transparent;
    border: 1px solid #e4e1e1;
    cursor: pointer;
`;

const CartButtonBox = styled.div`
  width: 90%;
`;

const Image = styled.img`
  background-size: cover;
  padding-right: .5em;
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
      <Container>
        <Title>상품옵션 선택</Title>
        <ProductImageAndName>
          <img
            src={product.productImages.find((productImage) => (
              productImage.thumbnailImage === true
            )).url}
            alt="productImage"
            width="100px"
          />
          <p>{product.productName}</p>
        </ProductImageAndName>
        <Label htmlfor="product-option">
          옵션선택(필수)
        </Label>
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
            <QuantityBox>
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
            </QuantityBox>
            <PayMoeny>
              <span>총 상품금액</span>
              {' '}
              {numberFormat(totalPayment)}
              원
            </PayMoeny>
          </PayInformation>
        ) : null}
        <CartButtonBox>
          <AddCartButton
            type="button"
            onClick={handleClickAddCart}
          >
            <Image
              src={AddCartImage}
              alt="addCartImage"
              width="20px"
            />
            장바구니 추가
          </AddCartButton>
        </CartButtonBox>
        {guideMessage === '옵션을 선택해주세요'
          ? <p>옵션을 선택해주세요</p> : null}
      </Container>
    </StyledModal>
  );
}
