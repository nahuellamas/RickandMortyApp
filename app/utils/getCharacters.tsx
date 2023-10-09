export async function getCharacters(currentPage: number){
    const res = await fetch(
        `https://rickandmortyapi.com/api/character?page=${currentPage}`, { cache: 'force-cache' }
      );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    
    return res.json()
}

export async function getEpisodes(currentEpisode: number){
    const res = await fetch(
        `https://rickandmortyapi.com/api/episode/${currentEpisode}`, { cache: 'force-cache' }
      );

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    
    return res.json()
}