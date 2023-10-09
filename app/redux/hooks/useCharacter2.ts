import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useCharacter2 = () => {
  return useSelector((state: RootState) => state.characters.charactersSelected2);
};
