import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useEpisodes2 = () => {
  return useSelector((state: RootState) => state.characters.episodeDetailsList2);
};
