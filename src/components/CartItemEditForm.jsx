import { useState } from 'react';
import styled from 'styled-components';
import numberFormat from '../utils/NumberFormat';

const ProductOption = styled.select`
  margin-top: 2em;
  width: 60%;
  padding: 0.3em;
  margin-bottom: 1em;
  cursor: pointer;
  font-size: 1.3em;
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

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-top: 5em;
  padding-bottom: 2em;
`;

const H2 = styled.h2`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size : 1.5em;
  padding-bottom: 2em;
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
    font-size: 1.8em;
    padding-top: 1em;
    padding-bottom: 1em;

    span {
      font-size: .5em;
      color: #000;
    }
`;

const Table = styled.table`
  width: 100%;
`;

const ProductName = styled.td`
  width: 20%;
`;

const Description = styled.td`
  display: flex;
  align-items: center;
  width: 20%;
`;

const TotalPayment = styled.td`
  width: 20%;
`;

const ProductImage = styled.td`
  width: 40%;
`;

const Image = styled.img`
`;

const Buttons = styled.div`
  width: 100%;
  padding-top: 2em;
  display: flex;
  justify-content: center;
  
`;

const ConfirmButton = styled.button`
  font-size: 1.5em;
  border: none;
  background-color: #35992D;
  color: white;
  padding: .7em 1.3em 0.7em 1.3em;
  border-radius: 5px;
  cursor: pointer;

  :hover {
    background-color: #1F561B;
  }
`;

const CancelButton = styled.button`
  font-size: 1.5em;
  border: 1px solid #D9D9D9;
  background-color: transparent;
  color: black;
  padding: .7em 1.3em 0.7em 1.3em;
  border-radius: 5px;
  margin-right: .5em;
  cursor: pointer;


  :hover {
    background-color: #D9D9D9;
  }
`;

const Tr = styled.tr`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  td {
    font-size: 1.5em;
  }
`;

const Tbody = styled.tbody`
  width: 100%;  
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
    <Container>
      <H2>주문수정</H2>
      <Table>
        <Tbody>
          <Tr>
            <ProductImage>
              <Image
                src={cartItem.image}
                alt="productImage"
                width="150"
                height="150px"
              />
            </ProductImage>
            <ProductName>
              {cartItem.name}
              {' '}
            </ProductName>
            <Description>
              {cartItem.description}
              {' '}
            </Description>
            <TotalPayment>
              {' '}
              {numberFormat(cartItem.totalPayment)}
              원
            </TotalPayment>
          </Tr>
        </Tbody>
      </Table>
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
      <Buttons>
        <CancelButton
          type="button"
          onClick={handleClickCancel}
        >
          취소

        </CancelButton>
        <ConfirmButton
          type="button"
          onClick={handleClickConfirm}
        >
          확인
        </ConfirmButton>
      </Buttons>
      {guideMessage === '옵션을 선택해주세요'
        ? <p>옵션을 선택해주세요</p> : null}
    </Container>
  );
}
