import { recentViewItemStore } from '../stores/RecentViewItemStore';
import useStore from './useStore';

export default function useRecentViewItemStore() {
  return useStore(recentViewItemStore);
}
