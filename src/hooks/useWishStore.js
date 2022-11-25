import { wishStore } from '../stores/WishStore';
import useStore from './useStore';

export default function useWishStore() {
  return useStore(wishStore);
}
