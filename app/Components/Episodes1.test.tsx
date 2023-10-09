import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import Episodes1 from './Episodes1';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer, {
  setEpisodeDetailsList1,
} from '../redux/slices/charactersSlice';
import { Character, Episode } from '../Interfaces/Characters';
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

const mockEpisode: Episode = {
  id: 1,
  name: 'Example',
  air_date: 'date',
};

test('Episodes1 muestra información y maneja eventos correctamente', async () => {
  // Renderiza el componente Episodes1 con el store proporcionado
  render(
    <Provider store={store}>
      <Episodes1 />
    </Provider>
  );

  // Utiliza act para realizar cambios en el estado
  act(() => {
    store.dispatch(setEpisodeDetailsList1([mockEpisode]));
  });

    // Realiza tus aserciones después de que React haya procesado los cambios
    expect(await screen.findByText((content, element) => {
      return (
        content.includes('Example')
      );
    })).toBeInTheDocument();
});
