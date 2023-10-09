import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import CharacterCard from './CharacterCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer, {
  addCharacterToSelected1,
  removeCharacterFromSelected1,
} from '../redux/slices/charactersSlice';
import { Character } from '../Interfaces/Characters';
import '@testing-library/jest-dom';

const initialState = {
  characters: {
    charactersSelected1: [],
    charactersSelected2: [],
    episodeDetailsList1: [], 
    episodeDetailsList2: [], 
    sharedEpisodes: [], 
  },
};

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
  preloadedState: initialState,
});

const mockCharacter: Character = {
  id: 1,
  name: 'Ejemplo',
  status: 'Alive',
  species: 'Human',
  type: 'Example Type',
  gender: 'Male',
  origin: {
    name: 'Earth',
    url: 'earth-url',
  },
  location: {
    name: 'Example Location',
    url: 'location-url',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/8.jpeg',
  episode: ['episode-url-1', 'episode-url-2'],
  url: 'character-url',
  created: '2023-10-09T12:00:00.000Z',
};

test('CharacterCard muestra información y maneja eventos correctamente', () => {
    render(
      <Provider store={store}>
        <CharacterCard character={mockCharacter} selectdType="character1" />
      </Provider>
    );
    expect(screen.getByText('Ejemplo')).toBeInTheDocument();
    expect(screen.getByText(/Alive/)).toBeInTheDocument();

    // Simular un clic en el componente
    fireEvent.click(screen.getByTestId('character-card'));

      // Obtener el estado actual después del clic
      const updatedState = store.getState().characters.charactersSelected1;

      // Verificar que el personaje esté en el estado actual
      expect(updatedState).toContainEqual(mockCharacter);
});

