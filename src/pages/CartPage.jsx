import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import CartItems from '../components/CartItems';
import useCartStore from '../hooks/useCartStore';
import numberFormat from '../utils/NumberFormat';

export default function CartPage() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.fetchCartItems(accessToken);
  }, []);

  const {
    cartItems, checkItems, totalCartItemPrice, totalDeliveryFee, orderAmount,
    checkedCartItem,
  } = cartStore;

  if (!cartItems.length) {
    return <p>장바구니에 추가된 상품이 없습니다</p>;
  }

  const onClickSingleCheck = (checked, cartItemId) => {
    cartStore.Singlecheck(checked, cartItemId);
  };

  const onClickWholeCheck = (checked) => {
    cartStore.wholeCheck(checked);
  };

  const onClickDeleteCartItem = () => {
    cartStore.deleteCartItems(accessToken);
  };

  const onClickCartItem = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleClickTotalOrder = () => {
    if (!checkItems.length) {
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

  return (
    <div>
      <CartItems
        cartItems={cartItems}
        checkItems={checkItems}
        onClickSingleCheck={onClickSingleCheck}
        onClickWholeCheck={onClickWholeCheck}
        onClickDeleteCartItem={onClickDeleteCartItem}
        onClickCartItem={onClickCartItem}
        onClickOrder={onClickOrder}
        onClickEditOrder={onClickEditOrder}
      />
      <div>
        <p>
          선택상품금액
          {numberFormat(totalCartItemPrice)}
          원
        </p>
        <p>
          총 배송비
          {numberFormat(totalDeliveryFee)}
          원
        </p>
        <p>
          주문금액
          {numberFormat(orderAmount)}
          원
        </p>
        <button
          type="button"
          onClick={handleClickTotalOrder}
        >
          총
          {checkedCartItem.length}
          건
          {' '}
          주문하기
        </button>
      </div>
    </div>
  );
}
