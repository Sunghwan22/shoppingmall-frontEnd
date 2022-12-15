import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useLocalStorage } from 'usehooks-ts';
import CartItems from '../components/CartItems';
import RecentProducts from '../components/RecentProducts';
import SelectOptionModal from '../components/SelectOptionModal';
import SelectProductModal from '../components/SelectProductModal';
import WishItems from '../components/WishItems';
import useCartStore from '../hooks/useCartStore';
import numberFormat from '../utils/NumberFormat';

const Container = styled.div`
  width: 100%;
`;

const BottomBanner = styled.div`
    width: 100%;
    position: fixed;
    bottom: 0%;
    height: 80px;
    background-color: #35992D;
    font-size: 1.6em;
`;

const PriceBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-left: 15%;
  padding-right: 15%;

  button {
    display: flex;
    padding-left: 3em;
    padding-right: 3em;
    padding-top: 1em;
    padding-bottom: 1em;
    border-radius: 4px;
    border: none;
    background-color: #FFFFFF;
    cursor: pointer;
    font-size: .7em;
  }
`;

const PriceInformation = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    p:first-child {
      color: white;
      padding-right: .7em;
      font-size: .9em;
      font-weight:400;
    }

    p:nth-child(2) {
      color: white;
      font-weight: bold;
    }

    p:last-child {
      color: white;
      font-weight: normal;
      font-size: .9em;
      padding-right: 3em;
    }
`;

const Count = styled.div`
      width: 20px;
      height: 18px;
      font-size: .8em;
      color: white;
      border-radius: 50%;
      border: none;
      background-color:  #03c75a;
`;

export default function CartPage() {
  const navigate = useNavigate();

  const [selectOption, setSelectOption] = useState(false);
  const [selectProductModal, setSelectProductModal] = useState(false);

  const [accessToken] = useLocalStorage('accessToken', '');

  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.fetchCartItems(accessToken);
  }, []);

  const {
    cartItems, checkItems, orderAmount, checkedCartItem,
  } = cartStore;

  const onClickCartItem = (productId) => {
    navigate(`/product/${productId}`);
  };

  const onClickWishItemaddCart = () => {
    setSelectOption(true);
  };

  const onClickRecentItemaddCart = () => {
    setSelectOption(true);
  };

  const handleClickTotalOrder = () => {
    if (!checkItems.length) {
      setSelectProductModal(true);
      return;
    }

    navigate('/orderForm', {
      state: {
        orderProducts: [...checkedCartItem],
        totalOrderPayment: orderAmount,
      },
    });
  };

  const onClickOrder = async (cartItemId) => {
    const cartItem = cartItems.find((element) => element.id === cartItemId);

    navigate('/orderForm', {
      state: {
        orderProducts: [cartItem],
        totalOrderPayment: cartItem.totalPayment + cartItem.deliveryFee,
      },
    });
  };

  const onClickEditOrder = (cartItemId) => {
    navigate('/edit-orderForm', {
      state: {
        cartItemId,
      },
    });
  };

  const onClickCancel = () => {
    setSelectOption(false);
    setSelectProductModal(false);
  };

  return (
    <Container>
      <CartItems
        onClickCartItem={onClickCartItem}
        onClickOrder={onClickOrder}
        onClickEditOrder={onClickEditOrder}
      />
      <BottomBanner>
        <PriceBox>
          <PriceInformation>
            <p>
              총 주문금액
            </p>
            <p>
              {numberFormat(orderAmount)}
            </p>
            <p>
              원
            </p>
          </PriceInformation>
          <button
            type="button"
            onClick={handleClickTotalOrder}
          >
            총
            {' '}
            주문하기
            <Count>
              {checkedCartItem.length}
            </Count>
          </button>
        </PriceBox>
      </BottomBanner>
      <WishItems
        accessToken={accessToken}
        onClickWishItemaddCart={onClickWishItemaddCart}
        onClickCartItem={onClickCartItem}
      />
      <RecentProducts
        onClickRecentItemaddCart={onClickRecentItemaddCart}
        onClickCartItem={onClickCartItem}
      />
      {selectOption
        ? (
          <SelectOptionModal
            onClickCancel={onClickCancel}
          />
        )
        : null}
      {selectProductModal ? (
        <SelectProductModal
          onClickCancel={onClickCancel}
        />
      ) : null}
    </Container>
  );
}
