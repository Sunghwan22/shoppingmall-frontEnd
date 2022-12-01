import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import UseCartStore from '../hooks/UseCartStore';

export default function CartPage() {
  const [accessToken] = useLocalStorage('accessToken', '');

  const cartStore = UseCartStore();

  useEffect(() => {
    cartStore.fetchCartItems({ accessToken });
  }, []);

  return (
    <p>Hello, world</p>
  );
}
