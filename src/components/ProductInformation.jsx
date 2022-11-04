import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import numberFormat from '../utils/NumberFormat';

export default function ProductInformation(
  {
    product, thumbnailUrl, productOptions, handleSelectOption, totalPayment,
    handleClickAddQuantity, handleClickReduceQuantity, quantity, handleClickResetOption,
    handleClickWishes, handleClickAddCart,
  },

) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState(false);

  const handleClickOption = (event) => {
    const { value } = event.target;

    if (value === '옵션을 선택해주세요') {
      setSelectedOption(false);
      handleClickResetOption();
      return;
    }

    const productOption = JSON.parse(value);

    handleSelectOption(productOption);

    setSelectedOption(true);
  };

  const handleClickMinus = () => {
    handleClickReduceQuantity();
  };

  const handleClickPlus = () => {
    handleClickAddQuantity();
  };

  const handleClickWish = () => {
    if (!accessToken) {
      navigate('/login');
    }

    handleClickWishes(accessToken);
  };

  const handleClickCart = () => {
    if (!accessToken) {
      navigate('/login');
      return;
    }

    if (!selectedOption) {
      alert('옵션을 선택해주세요');
      return;
    }

    handleClickAddCart(accessToken);

    if (window.confirm('장바구니에 상품이 추가됬습니다 장바구니로 이동하시겠습니까?')) {
      navigate('/cart');
    }
  };

  return (
    <div>
      <img
        src={thumbnailUrl}
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
        {product.deleveryFee}
      </p>
      <h3>
        가격
        {' '}
        {numberFormat(product.price)}
        {' '}
        원
      </h3>
      <select
        onChange={handleClickOption}
      >
        <option>옵션을 선택해주세요</option>
        {productOptions.map((productOption) => (
          <option
            key={productOption.id}
            value={JSON.stringify(productOption)}
          >
            {productOption.description}
            {' '}
            +
            {productOption.addAmount}
            원
          </option>
        ))}
      </select>
      {selectedOption ? (
        <div>
          <p>
            결제금액
            {' '}
            {totalPayment}
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
          {product.wishes}
        </button>
        <button
          type="button"
          onClick={handleClickCart}
        >
          장바구니
        </button>
      </div>
    </div>
  );
}
