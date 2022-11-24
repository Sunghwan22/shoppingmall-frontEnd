/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import styled from 'styled-components';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
   display: flex;
   justify-content: center;
   height: 500px;  
   margin-top: 3em;
   margin-left: 10%;
   margin-right: 10%;
   margin-bottom: 5em;
   border: dotted 1px #000;
`;

const Image = styled.img`
    top: 10vw;
    left: 15%;
    width: 350px;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    padding-bottom: 5em;
`;

const H2 = styled.h2`
    font-size: 1.5em;
    font-weight: bold;
    padding-bottom: 1em;
`;

const BrandInformation = styled.div`
  display: flex;
  justify-content : space-between;
`;

const ProductName = styled.div`
  text-align: start;
`;

const ProductViews = styled.div`
  font-size: .8em;
  display: flex;
  justify-content : space-between;
`;

const ProductDeleveryFee = styled.div`
  display: flex;
  justify-content : space-between;
`;

const ProductCumulativeSales = styled.div`
  display: flex;
  justify-content : space-between;
`;

const ProductPrice = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  text-align: end;
  padding-top: .7em;
`;

const ProductInforamtion = styled.div`
  padding-top: 2em;
  padding-right: 2em;
`;

const ProductInforamtionBox = styled.div`
    width: 33%;
    display: flex;
    flex-direction: column;
    padding-left: 2em;

    p {
      padding-bottom: .7em;
    }
`;

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

const BuyButton = styled.button`
   color: white;
   border: none;
   cursor: pointer;
   background: linear-gradient(269.99deg,
    rgb(167, 159, 255) 0.01%,
    rgb(242, 159, 255) 99.99%);

  padding : .6em 0;

  border-radius: 5px;

/*   
  linear-gradient(269.99deg,
    rgb(116, 104, 247) 0.01%,
    rgb(232, 116, 250) 99.99%); */
  :hover {
    
    background:
    linear-gradient(92deg,#2ca2b4,#5598de 24%,#7f87ff 45%,#5391e8 76%,#3a82ff);
}
`;

const ButtonBox = styled.div`
    width: 100%;
    padding-top: .3em;
`;

const WishButton = styled.button`
  width: 49%;
  color: white;
   border: none;
   cursor: pointer;

   background: linear-gradient(269.99deg,
    rgb(213, 209, 255) 0.01%,
    rgb(246, 194, 254) 99.99%);

  padding-top: .5em;
  padding-bottom: .5em;
  margin-right: .3em;

  border-radius: 3px;

  :hover {
    background:
    linear-gradient(92deg,#2ca2b4,#5598de 24%,#7f87ff 45%,#5391e8 76%,#3a82ff);
}
`;

const CartButton = styled.button`
   width: 48%;
  color: white;
   border: none;
   cursor: pointer;

   background: linear-gradient(269.99deg,
    rgb(213, 209, 255) 0.01%,
    rgb(246, 194, 254) 99.99%);
 
  padding-top: .5em;
  padding-bottom: .5em;

  border-radius: 3px;

  :hover {
    background:
    linear-gradient(92deg,#2ca2b4,#5598de 24%,#7f87ff 45%,#5391e8 76%,#3a82ff);
}
`;

export default function ProductInformation(
  {
    product, quantity, totalPayment, thumbnailImage, options,
    onClickSelectOption, onClickAddQuantity, onClickReduceQuantity,
    onClickResetOption, onClickWishes, onClickAddCart, productWishes,
    onClickPurchase, guideMessage,
  },

) {
  const [selectedOption, setSelectedOption] = useState(false);

  const handleClickOrder = () => {
    onClickPurchase();
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

  const handleClickWish = () => {
    onClickWishes();
  };

  const handleClickCart = () => {
    onClickAddCart();
  };

  if (!product) {
    return <p>Now Loading...</p>;
  }

  return (
    <Container>
      <Image
        src={thumbnailImage.url}
        alt="productProfile"
      />
      <ProductInforamtionBox>
        <ProductInforamtion>
          <H2>Product Info</H2>
          <ProductName>
            <p>
              {product.productName}
            </p>
          </ProductName>
          <BrandInformation>
            <p>
              브랜드
            </p>
            <p>
              {product.maker}
            </p>
          </BrandInformation>
          <ProductViews>
            <p>
              누적 조회수(1개월)
            </p>
            <p>
              {numberFormat(product.views)}
              회
            </p>
          </ProductViews>
          <ProductCumulativeSales>
            <p>
              누적 판매
            </p>
            <p>
              {product.cumulativeSales}
            </p>
          </ProductCumulativeSales>
          <ProductDeleveryFee>
            <p>
              배송비
            </p>
            <p>
              {numberFormat(product.deliveryFee)}
              원
            </p>
          </ProductDeleveryFee>
          <ProductPrice>
            <p>
              {numberFormat(product.price)}
              원
            </p>
          </ProductPrice>
        </ProductInforamtion>
        <label
          htmlFor="product-option"
          hidden
        >
          상품 옵션
        </label>
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
              {numberFormat(totalPayment)}
              원
            </PayMoeny>
          </PayInformation>
        ) : null}
        <BuyButton
          type="button"
          onClick={handleClickOrder}
        >
          구매하기
        </BuyButton>
        <ButtonBox>
          <WishButton
            type="button"
            onClick={handleClickWish}
          >
            찜하기
            {' '}
            {productWishes.length}
          </WishButton>
          <CartButton
            type="button"
            onClick={handleClickCart}
          >
            장바구니
          </CartButton>
        </ButtonBox>
        {guideMessage === '옵션을 선택해주세요'
          ? <p>옵션을 선택해주세요</p> : null}
      </ProductInforamtionBox>
    </Container>
  );
}
