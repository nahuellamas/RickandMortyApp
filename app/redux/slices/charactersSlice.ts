import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character, Episode } from '../../../app/Interfaces/Characters';

interface CharactersState {
  charactersSelected1: Character[];
  charactersSelected2: Character[];
  episodeDetailsList1: Episode[];
  episodeDetailsList2: Episode[];
  sharedEpisodes: Episode[];
}

const initialState: CharactersState = {
  charactersSelected1: [],
  charactersSelected2: [],
  episodeDetailsList1: [],
  episodeDetailsList2: [],
  sharedEpisodes: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    addCharacterToSelected1: (state, action: PayloadAction<Character>) => {
      const exists = state.charactersSelected1.some(
        (character) => character.id === action.payload.id
      );

      if (!exists) {
        state.charactersSelected1.push(action.payload);
      }
    },
    addCharacterToSelected2: (state, action: PayloadAction<Character>) => {
      const exists = state.charactersSelected2.some(
        (character) => character.id === action.payload.id
      );

      if (!exists) {
        state.charactersSelected2.push(action.payload);
      }
    },
    removeCharacterFromSelected1: (state, action: PayloadAction<Character>) => {
      state.charactersSelected1 = state.charactersSelected1.filter(
        (character) => character.id !== action.payload.id
      );
    },
    removeCharacterFromSelected2: (state, action: PayloadAction<Character>) => {
      state.charactersSelected2 = state.charactersSelected2.filter(
        (character) => character.id !== action.payload.id
      );
    },
    setEpisodeDetailsList1: (state, action: PayloadAction<Episode[]>) => {
      // Filtrar episodios duplicados por su ID antes de asignarlos
      const uniqueEpisodes = action.payload.filter((episode, index, self) => {
        return (
          index ===
          self.findIndex((e) => e.id === episode.id)
        );
      });
      state.episodeDetailsList1 = uniqueEpisodes;
    },
    setEpisodeDetailsList2: (state, action: PayloadAction<Episode[]>) => {
      // Filtrar episodios duplicados por su ID antes de asignarlos
      const uniqueEpisodes = action.payload.filter((episode, index, self) => {
        return (
          index ===
          self.findIndex((e) => e.id === episode.id)
        );
      });
      state.episodeDetailsList2 = uniqueEpisodes;
    },
    setSharedEpisodes: (state) => {
      // Filtrar episodios compartidos entre setEpisodeDetailsList1 y setEpisodeDetailsList2
      state.sharedEpisodes = state.episodeDetailsList1.filter((episode1) =>
        state.episodeDetailsList2.some((episode2) => episode1.id === episode2.id)
      );
    },
  },
});

export const {
  addCharacterToSelected1,
  addCharacterToSelected2,
  removeCharacterFromSelected1,
  removeCharacterFromSelected2,
  setEpisodeDetailsList1,
  setEpisodeDetailsList2,
  setSharedEpisodes,
} = charactersSlice.actions;

export default charactersSlice.reducer;
