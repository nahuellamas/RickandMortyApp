'use client'
import React from 'react';
import { useSharedEpisodes } from '../redux/hooks/useSharedEpisodes';
  
const SharedEpisodes = () => {
  const sharedEpisodes = useSharedEpisodes();

  return (
            <section className="flex flex-col justify-start items-start w-full bg-[--plum-900] rounded mx-2">
            <div className="text-[--plum-50] flex flex-row items-center justify-center w-full bg-[--plum-800] p-2 rounded-t">
                <h2 className="font-bold text-lg">Character #1 & Character #2 - Shared Episodes</h2>
            </div>
            {sharedEpisodes.length !== 0 ? (
              <div className="p-2">
                  {sharedEpisodes.map((episode, index) => (
                      <p key={index} className="font-bold text-[--plum-100] text-sm">
                          Episode {episode.id} -{' '}
                          <span className="font-normal text-[--plum-200]">
                          {episode.name} - {episode.air_date}
                          </span>
                      </p>
                  ))}
              </div> ) : (
                <div className="p-2 text-center w-full">
                  <p className="font-bold text-[--plum-100] text-sm">
                    No shared episodes found
                  </p>
                </div>
              )}
        </section>
  );
}

export default SharedEpisodes;
