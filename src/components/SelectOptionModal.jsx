import { useState } from 'react';
import styled from 'styled-components';
import Modal from 'styled-react-modal';
import { useLocalStorage } from 'usehooks-ts';
import numberFormat from '../utils/NumberFormat';
import AddCartImage from '../assets/addcart.png';
import useProductStore from '../hooks/useProductStore';
import useWishItemStore from '../hooks/useWishItemStore';
import useCartStore from '../hooks/useCartStore';
import useRecentViewItemStore from '../hooks/useRecentViewItemStore';

const StyledModal = Modal.styled`
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
  font-size: 1.3em;
  padding: 1em;
  margin-bottom: 1em;
  cursor: pointer;
`;

const PayInformation = styled.div`
  width: 90%;
  padding-top: .5em;
  /* padding-bottom: em; */
  border-radius: .4em;
  margin-top: .5em;
  margin-bottom: .5em;
  background-color: #f0eded;
  height: 20%;

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
    height: 100%;
    justify-content: flex-end;
    align-items: center;

    padding-top: 2em;
    color: red;
    font-weight: bold;
    font-size: 2em;

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
  font-size: 1.5em;
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
  font-size: 1.5em;
`;

const QuantityBox = styled.div`
  width: 20%;
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
    padding-top: .5em;
    padding-bottom: 1em;
    background-color: transparent;
    border: 1px solid #e4e1e1;
    cursor: pointer;
    font-size: 1.5em;
`;

const CartButtonBox = styled.div`
  width: 90%;
`;

const Image = styled.img`
  background-size: cover;
  padding-right: .5em;
`;

const ProductName = styled.p`
  font-size: 1.5em;
`;

export default function SelectOptionModal({
  onClickCancel,
}) {
  const [accessToken] = useLocalStorage('accessToken', '');
  const [recentlyViewProduct, setRecentlyViewProduct] = useLocalStorage('recentlyViewProduct', JSON.stringify([]));

  const productStore = useProductStore();
  const wishItemStore = useWishItemStore();
  const cartStore = useCartStore();
  const recentViewItemStore = useRecentViewItemStore();

  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(false);

  const {
    product, totalPayment, quantity, guideMessage, selectedProductOption,
  } = productStore;

  const { productType } = cartStore;

  const handleClickClose = () => {
    setIsOpen(false);
    onClickCancel();
  };

  const handleClickOption = async (event) => {
    const { value } = event.target;

    if (value === '옵션을 선택해주세요') {
      setSelectedOption(false);
      await productStore.resetQuantityAndTotalPayment();
      return;
    }

    const productOption = JSON.parse(value);

    setSelectedOption(true);

    const amount = productOption.addAmount;

    await productStore.selectOption(amount, productOption);
  };

  const handleClickMinus = async () => {
    await productStore.reduceQuantity();
  };

  const handleClickPlus = async () => {
    await productStore.addQuantity();
  };

  const handleClickAddCart = async () => {
    if (!selectedProductOption) {
      return;
    }

    if (Object.keys(selectedProductOption).length === 0) {
      await productStore.checkOption();
      return;
    }

    if (productType === 'recentViewItem') {
      const deleteArray = JSON.parse(recentlyViewProduct).filter((viewProductId) => (
        viewProductId !== product.id
      ));

      await setRecentlyViewProduct(JSON.stringify(deleteArray));

      await productStore.addCartItem(product.id, accessToken);

      await recentViewItemStore.fetchRecentViewItems(recentlyViewProduct);
    }

    if (productType === 'wishItem') {
      await productStore.addCartItem(product.id, accessToken);

      await wishItemStore.deleteWishItem(product.id, accessToken);

      await wishItemStore.fetchWishItems(accessToken);
    }

    await cartStore.fetchCartItems(accessToken);

    setIsOpen(false);
    onClickCancel();
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
            width="200px"
          />
          <ProductName>{product.productName}</ProductName>
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
              width="50px"
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
