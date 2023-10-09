'use client'
import React, { useEffect, useState } from 'react';
import CharacterList from '../Components/CharacterList';
import Pagination from './Pagination';
import { Data, Character } from '../Interfaces/Characters';
import {getCharacters} from '../utils/getCharacters';

interface CharacterListProps {
  data: Data;
  data2: Data;
}

const CharactersPage2 = ({data, data2}: CharacterListProps) => {
  const [ selectdType, setSelectdType ] = useState<'character1' | 'character2'>('character2');
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState(42);
  const [currentPage, setCurrentPage] = useState(42);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (currentPage === 42){
      setIsLoading(true); 
      setTotalPages(data2.info.pages);
      setCharacters(data2.results);
      setIsLoading(false);
    } else {
    const fetchData = async () => {
      setIsLoading(true);
      const newData = await getCharacters(currentPage);
      setTotalPages(newData.info.pages);
      setCharacters(newData.results);
      setIsLoading(false);
    };
  
    fetchData();
    }
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <section className="mx-2">
      <h3>Select 2° character:</h3>
       {isLoading ? (
        <div className="flex flex-row justify-center items-center h-[400px]">
          <div className="sk-cube-grid">
            <div className="sk-cube sk-cube1"></div>
            <div className="sk-cube sk-cube2"></div>
            <div className="sk-cube sk-cube3"></div>
            <div className="sk-cube sk-cube4"></div>
            <div className="sk-cube sk-cube5"></div>
            <div className="sk-cube sk-cube6"></div>
            <div className="sk-cube sk-cube7"></div>
            <div className="sk-cube sk-cube8"></div>
            <div className="sk-cube sk-cube9"></div>
          </div>
        </div>
       ) : (
        <>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      <div  className="container scroll-container">
        <CharacterList characters={characters} selectdType={selectdType} />
      </div>
      </>
       )}
    </section>
  );
};

export default CharactersPage2;
