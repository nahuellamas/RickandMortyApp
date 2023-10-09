import { Suspense } from 'react'
import CharactersPage1 from './Components/Characters'
import CharactersPage2 from './Components/Characters2'
import {getCharacters} from './utils/getCharacters'
import Loading from './loading';
import Episodes1 from './Components/Episodes1';
import SharedEpisodes from './Components/SharedEpisodes';
import Episodes2 from './Components/Episodes2';

export default async function Page() {
  const data = await getCharacters(1);
  const data2 = await getCharacters(42);
  return( 
    <div className="w-full flex flex-col justify-start items-center bg-[--plum-950] text-[--plum-50] h-[100%] pt-3 pb-10">
        <h1 className='text-4xl font-bold mb-2 text-[--plum-200]'>See all the fantastics Episodes of Rick and Morty</h1>
        <span className='text-base'>Whith only your favorites Characters</span>
        <section className="two-cols w-full mt-10">
          <Suspense fallback={<Loading />}>
            <CharactersPage1 data={data} data2={data2}/>
            <CharactersPage2 data={data2} data2={data2}/>
          </Suspense>
        </section>
        <section className="three-cols w-full mt-4">
          <Episodes1 />
          <SharedEpisodes />
          <Episodes2/>
        </section>
    </div>
  )
}