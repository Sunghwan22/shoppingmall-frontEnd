import { useEffect } from 'react';
import { reviewStore } from '../stores/ReviewStore';
import useForceUpdate from './useForceUpdate';

export default function useReviewStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    reviewStore.subscribe(forceUpdate);

    return () => reviewStore.unSubscribe(forceUpdate);
  }, []);

  return reviewStore;
}
