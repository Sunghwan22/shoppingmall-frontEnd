/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import styled from 'styled-components';
import Heart from '../assets/Heart.png';

import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
   display: flex;
   justify-content: space-between;
   padding-inline: 15%;
   margin-top: 3em;
   margin-bottom: 5em;
`;

const Image = styled.img`
    width: 600px;
    height: 600px;
    background-size: cover;
    background-repeat: no-repeat;
    padding-bottom: 5em;    
`;

const H2 = styled.h2`
    font-size: 1em;
    font-weight: bold;
    padding-bottom: 1em;
`;

const BrandInformation = styled.div`
  display: flex;
  justify-content : space-between;
  padding-bottom: 1em;

  p:first-child {
    font-weight: bold;
    font-size: 1.2em;
  }

  p {
    font-size: 1.2em;
  }
 `;

const ProductName = styled.div`
  text-align: start;
  font-weight: bold;
  font-size: 1.2em;
  padding-bottom: 1em;
`;

const ProductViews = styled.div`
  display: flex;
  justify-content : space-between;
  padding-bottom: 1em;

  p:first-child {
    font-weight: bold;
    font-size: 1.2em;
  }

  p {
    font-size: 1.2em;
  }
`;

const ProductDeleveryFee = styled.div`
  display: flex;
  justify-content : space-between;

  padding-bottom: 1em;

  p:first-child {
  font-weight: bold;
  font-size: 1.2em;
}

  p {
      font-size: 1.2em;
    }
`;

const ProductCumulativeSales = styled.div`
  display: flex;
  justify-content : space-between;

  padding-bottom: 1em;

  p:first-child {
  font-weight: bold;
  font-size: 1.2em;
}
`;

const ProductPrice = styled.div`
  display: flex;
  justify-content : space-between;
  padding-top: 1em;

  p {
  font-weight: bold;
  font-size: 1.5em;
  }
`;

const ProductInforamtion = styled.div`
  padding-top: 2em;
`;

const ProductInforamtionBox = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    padding-left: 5em;

    p {
      padding-bottom: .7em;
    }
`;

const ProductOption = styled.select`
  font-size: 1.2em;
  width: 70%;
  padding: 0.5em;
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
    font-size: 1.5em;

    span {
      font-size: .7em;
      color: #000;
    }
`;

const BuyButton = styled.button`
   color: white;
   border: none;
   cursor: pointer;
   background: #35992D;
   padding-bottom: 1.2em;
   padding-top: 1.2em;

  border-radius: 1px;

  :hover {
    
    background:
    linear-gradient(92deg,#2ca2b4,#5598de 24%,#7f87ff 45%,#5391e8 76%,#3a82ff);
}
`;

const ButtonBox = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    padding-top: .3em;
`;

const WishButton = styled.button`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 50%;
    border: 1px solid #CCCCCC;
    cursor: pointer;

    background: transparent;

    padding-top: 1.2em;
    padding-bottom: 1.2em;
    margin-right: .3em;

    span {
      padding-left: 1em;
    }
`;

const CartButton = styled.button`
  width: 48.8%;
  border: 1px solid #CCCCCC;
   cursor: pointer;

  background: transparent;
 
  padding-top: 1.4em;
  padding-bottom: 1.4em;
`;

const GuideMessage = styled.p`
  width: 100%;
  text-align: center;
  font-size: 1.5em;
  color: red;
  padding-top: 2em;
`;

const HeartImage = styled.img`
   background-size: cover;
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

    if (value === '????????? ??????????????????') {
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
        // src="https://newsimg.sedaily.com/2022/10/01/26C6IEIKFR_1.jpg"
        // src="https://img.gqkorea.co.kr/gq/2021/10/style_616f710161913-819x1024.jpg"
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
              ?????????
            </p>
            <p>
              {product.maker}
            </p>
          </BrandInformation>
          <ProductViews>
            <p>
              ?????? ?????????(1??????)
            </p>
            <p>
              {numberFormat(product.views)}
              ???
            </p>
          </ProductViews>
          <ProductCumulativeSales>
            <p>
              ?????? ??????
            </p>
            <p>
              {product.purchasesNumber}
            </p>
          </ProductCumulativeSales>
          <ProductDeleveryFee>
            <p>
              ?????????
            </p>
            <p>
              {numberFormat(product.deliveryFee)}
              ???
            </p>
          </ProductDeleveryFee>
          <ProductPrice>
            <p>
              ??????
            </p>
            <p>
              {numberFormat(product.price)}
              ???
            </p>
          </ProductPrice>
        </ProductInforamtion>
        <label
          htmlFor="product-option"
          hidden
        >
          ?????? ??????
        </label>
        <ProductOption
          id="product-option"
          onChange={handleClickOption}
          name="product-option"
        >
          <option>????????? ??????????????????</option>
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
              ???
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
              <span>??? ????????????</span>
              {' '}
              {numberFormat(totalPayment)}
              ???
            </PayMoeny>
          </PayInformation>
        ) : null}
        <BuyButton
          type="button"
          onClick={handleClickOrder}
        >
          ????????????
        </BuyButton>
        <ButtonBox>
          <WishButton
            type="button"
            onClick={handleClickWish}
          >
            <HeartImage
              src={Heart}
              alt="HeartImage"
            />
            <span>
              ?????????
            </span>
            <span>
              {productWishes.length}
            </span>
          </WishButton>
          <CartButton
            type="button"
            onClick={handleClickCart}
          >
            ????????????
          </CartButton>
        </ButtonBox>
        {guideMessage === '????????? ??????????????????'
          ? <GuideMessage>????????? ??????????????????</GuideMessage> : null}
      </ProductInforamtionBox>
    </Container>
  );
}
