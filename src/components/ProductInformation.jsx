/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import numberFormat from '../utils/NumberFormat';

export default function ProductInformation(
  {
    product, quantity, totalPayment, thumbnailImage, options,
    onClickSelectOption, onClickAddQuantity, onClickReduceQuantity,
    onClickResetOption, onClickWishes, onClickAddCart, productWishes,
    guideMessage,
  },

) {
  const [selectedOption, setSelectedOption] = useState(false);

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
    <div>
      <img
        src={thumbnailImage.url}
        alt="productProfile"
        width="200px"
      />
      <p>Product Info</p>
      <p>
        브랜드
        {' '}
        {product.maker}
      </p>
      <p>
        상품명
        {' '}
        {product.productName}
      </p>
      <p>
        누적 조회수(1개월)
        {' '}
        {product.views}
        {' '}
      </p>
      <p>
        누적 판매
        {' '}
        {product.cumulativeSales}
      </p>
      <p>
        배송비
        {' '}
        {numberFormat(product.deliveryFee)}
        원
      </p>
      <h3>
        가격
        {' '}
        {numberFormat(product.price)}
        원
      </h3>
      <label htmlFor="product-option">상품 옵션</label>
      <select
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
      </select>
      {selectedOption ? (
        <div>
          <p>
            결제금액
            :
            {' '}
            {numberFormat(totalPayment)}
            원
          </p>
          <span>구매 수량</span>
          <button
            type="button"
            name="minusQuantity-button"
            onClick={handleClickMinus}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            name="addQuantity-button"
            onClick={handleClickPlus}
          >
            +
          </button>
        </div>
      ) : null}
      <div>
        <button
          type="button"
        >
          구매하기
        </button>
        <button
          type="button"
          onClick={handleClickWish}
        >
          찜하기
          {' '}
          {productWishes.length}
        </button>
        <button
          type="button"
          onClick={handleClickCart}
        >
          장바구니
        </button>
        {guideMessage === '옵션을 선택해주세요'
          ? <p>옵션을 선택해주세요</p> : null}
      </div>
    </div>
  );
}
