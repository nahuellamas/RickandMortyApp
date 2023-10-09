import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useSharedEpisodes = () => {
  return useSelector((state: RootState) => state.characters.sharedEpisodes);
};
