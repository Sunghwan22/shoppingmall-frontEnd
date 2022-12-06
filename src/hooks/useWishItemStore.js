import { wishItemStore } from '../stores/WishItemStore';
import useStore from './useStore';

export default function useWishItemStore() {
  return useStore(wishItemStore);
}
