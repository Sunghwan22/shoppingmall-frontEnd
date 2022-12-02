import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';
import CartItems from '../components/CartItems';
import UseCartStore from '../hooks/UseCartStore';

export default function CartPage() {
  const navigate = useNavigate();

  const [accessToken] = useLocalStorage('accessToken', '');

  const cartStore = UseCartStore();

  useEffect(() => {
    cartStore.fetchCartItems({ accessToken });
  }, []);

  const {
    cartItems, checkItems, pageNumbers, currentPage,
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

  const onClickPageNumber = (number) => {
    cartStore.fetchCartItems({ accessToken, page: number });
  };

  const onClickOrder = async (cartItemId) => {
    const cartItem = cartItems.find((element) => element.id === cartItemId);

    navigate('/orderForm', {
      state: {
        image: cartItem.cartItemImage.url,
        quantity: cartItem.quantity,
        totalPayment: cartItem.totalPayment,
        description: cartItem.description,
        deliveryFee: cartItem.deliveryFee,
        productName: cartItem.name,
        productId: cartItem.productId,
      },
    });
  };

  const onClickEditOrder = (cartItemId) => {
    const cartItem = cartItems.find((element) => element.id === cartItemId);

    navigate('/edit-orderForm', {
      state: {
        cartItem,
        currentPage,
      },
    });
  };

  return (
    <div>
      <CartItems
        cartItems={cartItems}
        checkItems={checkItems}
        pageNumbers={pageNumbers}
        onClickSingleCheck={onClickSingleCheck}
        onClickWholeCheck={onClickWholeCheck}
        onClickDeleteCartItem={onClickDeleteCartItem}
        onClickCartItem={onClickCartItem}
        onClickPageNumber={onClickPageNumber}
        onClickOrder={onClickOrder}
        onClickEditOrder={onClickEditOrder}
      />
    </div>
  );
}
