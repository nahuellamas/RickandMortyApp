import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useEpisodes1 = () => {
  return useSelector((state: RootState) => state.characters.episodeDetailsList1);
};
