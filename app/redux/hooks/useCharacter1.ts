import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useCharacter1 = () => {
  return useSelector((state: RootState) => state.characters.charactersSelected1);
};
