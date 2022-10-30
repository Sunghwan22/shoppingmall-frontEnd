import { useEffect } from 'react';
import { productStore } from '../stores/ProductStore';
import useForceUpdate from './useForceUpdate';

export default function useProductStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    productStore.subscribe(forceUpdate);

    return () => productStore.unSubscribe(forceUpdate);
  }, []);

  return productStore;
}
