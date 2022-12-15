import { writeableReviewProductStore } from '../stores/WriteableReviewProductStore';
import useStore from './useStore';

export default function useWriteableReviewProductStore() {
  return useStore(writeableReviewProductStore);
}
