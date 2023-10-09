import React from 'react';
import CharacterCard from '../Components/CharacterCard'; // Importa tu componente de tarjeta de personaje
import { Character } from '../Interfaces/Characters'; // Asegúrate de importar tu interfaz Character si la tienes

interface CharacterListProps {
  characters: Character[];
  selectdType: 'character1' | 'character2';
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, selectdType }) => {
  
  return (
    <div className="grid-container-cards w-full">
      {characters.map((character: Character) => (
        <CharacterCard key={character.id} character={character} selectdType={selectdType} />
      ))}
    </div>
  );
};

export default CharacterList;
