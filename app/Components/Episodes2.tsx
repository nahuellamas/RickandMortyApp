'use client'
import { useCharacter2 } from '../redux/hooks/useCharacter2';
import { useEpisodes2 } from '../redux/hooks/useEpisodes2';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Episode } from '../Interfaces/Characters'
import { setEpisodeDetailsList2, setSharedEpisodes } from '../redux/slices/charactersSlice';

const Episodes2 = () => {
    const dispatch = useDispatch();
    const charactersSelected1 = useCharacter2();
    const episodesSelected1 = useEpisodes2();

    useEffect(() => {
        async function fetchEpisodeDetailsForCharacter1() {
            try {
                const episodes = charactersSelected1.flatMap((character) => character.episode);
                const detailsPromises = episodes.map((episodeUrl) => getEpisodeDetails(episodeUrl));
                const episodeDetails = await Promise.all(detailsPromises);
                // Filtrar episodios duplicados por su ID antes de asignarlos
                const uniqueEpisodes = episodeDetails.filter((episode, index, self) => {
                    return (
                        index === self.findIndex((e) => e.id === episode.id)
                    );
                });

                dispatch(setEpisodeDetailsList2(uniqueEpisodes));
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
        <section className="flex flex-col justify-start items-start w-full bg-[--plum-900] rounded mx-2">
            <div className="text-[--plum-50] flex flex-row items-center justify-start w-full bg-[--plum-800] p-2 rounded-t">
                {charactersSelected1.length !== 0 ? (
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
                    <h2 className="font-bold text-lg">Select yours 2° Characters</h2>
                )}
            </div>
            <div className="p-2">
                {episodesSelected1.map((episode, index) => (
                    <p key={index} className="font-bold text-[--plum-100] text-sm">
                        Episode {episode.id} -{' '}
                        <span className="font-normal text-[--plum-200]">
                        {episode.name} - {episode.air_date}
                        </span>
                    </p>
                ))}
            </div>
        </section>
    );
};

export default Episodes2;

