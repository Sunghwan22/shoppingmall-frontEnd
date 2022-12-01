import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import CartItems from '../components/CartItems';
import UseCartStore from '../hooks/UseCartStore';

export default function CartPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const cartStore = UseCartStore();

  useEffect(() => {
    cartStore.fetchCartItems({ accessToken });
  }, []);

  const { cartItems } = cartStore;

  if (!cartItems.length) {
    return <p>장바구니에 추가된 상품이 없습니다</p>;
  }

  return (
    <div>
      <CartItems
        cartItems={cartItems}
      />
    </div>
  );
}
