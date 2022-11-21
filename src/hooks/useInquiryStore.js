import { useEffect } from 'react';
import { inquiryStore } from '../stores/InquiryStore';

import useForceUpdate from './useForceUpdate';

export default function useInquiryStore() {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    inquiryStore.subscribe(forceUpdate);

    return () => inquiryStore.unSubscribe(forceUpdate);
  }, []);

  return inquiryStore;
}
