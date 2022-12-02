import { cartStore } from '../stores/CartStore';
import useStore from './useStore';

export default function UseCartStore() {
  return useStore(cartStore);
}
