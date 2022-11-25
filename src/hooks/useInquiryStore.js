import useStore from './useStore';
import { inquiryStore } from '../stores/InquiryStore';

export default function useInquiryStore() {
  return useStore(inquiryStore);
}
