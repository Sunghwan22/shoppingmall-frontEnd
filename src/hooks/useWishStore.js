import { useEffect } from 'react';
import { wishStore } from '../stores/WishStore';
import useForceUpdate from './useForceUpdate';

export default function useWishStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    wishStore.subscribe(forceUpdate);

    return () => wishStore.unSubscribe(forceUpdate);
  }, []);

  return wishStore;
}
