'use client'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useCharacter1 } from '../redux/hooks/useCharacter1';
import { useEpisodes1 } from '../redux/hooks/useEpisodes1';
import { Episode } from '../Interfaces/Characters';
import { setEpisodeDetailsList1, setSharedEpisodes } from '../redux/slices/charactersSlice';

const Episodes1 = () => {
  const dispatch = useDispatch();
  const charactersSelected1 = useCharacter1();
  const episodesSelected1 = useEpisodes1();

  useEffect(() => {
    async function fetchEpisodeDetailsForCharacter1() {
      try {
        if (!charactersSelected1 || charactersSelected1.length === 0) {
          console.log('No hay personajes seleccionados.');
          return;
        }

        const episodes = charactersSelected1.flatMap((character) => character.episode);
        const detailsPromises = episodes.map((episodeUrl) => getEpisodeDetails(episodeUrl));
        const episodeDetails = await Promise.all(detailsPromises);

        // Filtrar episodios duplicados por su ID antes de asignarlos
        const uniqueEpisodes = episodeDetails.filter((episode, index, self) => {
          return index === self.findIndex((e) => e.id === episode.id);
        });

        dispatch(setEpisodeDetailsList1(uniqueEpisodes));
        dispatch(setSharedEpisodes());
      } catch (error) {
        console.error('Error fetching episode details:', error);
      }
    }

    fetchEpisodeDetailsForCharacter1();
  }, [charactersSelected1]);

  async function getEpisodeDetails(episodeUrl: string): Promise<Episode> {
    const response = await fetch(episodeUrl, { cache: 'force-cache' });
    if (!response.ok) {
      throw new Error('Failed to fetch episode details');
    }
    const episodeData = await response.json();
    return {
      id: episodeData.id,
      name: episodeData.name,
      air_date: episodeData.air_date,
    };
  }

  return (
    <section className="flex flex-col justify-start items-start w-full bg-[--plum-900] rounded mx-2 min-h-[300px]">
      <div className="text-[--plum-50] flex flex-row items-center justify-start w-full bg-[--plum-800] p-2 rounded-t">
        {charactersSelected1 && charactersSelected1.length > 0 ? (
          <h2 className="font-bold text-lg">
            {charactersSelected1.map((character, index) => (
              <span key={character.id}>
                {character.name}
                {index < charactersSelected1.length - 1 ? ', ' : ''}
              </span>
            ))}{' '}
            - Only Episodes
          </h2>
        ) : (
          <h2 className="font-bold text-lg">Select your 1° Characters</h2>
        )}
      </div>
      <div className="p-2">
        {episodesSelected1 !== undefined && episodesSelected1.length > 0? episodesSelected1.map((episode, index) => (
          <p key={index} className="font-bold text-[--plum-100] text-sm">
            Episode {episode.id} -{' '}
            <span className="font-normal text-[--plum-200]">
              {episode.name} - {episode.air_date}
            </span>
          </p>
        )) : (
          <h2>No Character selected yet.</h2>
        )}
      </div>
    </section>
  );
};

export default Episodes1;
