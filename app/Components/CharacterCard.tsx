'use client'
import React from 'react';
import Image from 'next/image';
import { Character } from '../Interfaces/Characters';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCharacterToSelected1,
  addCharacterToSelected2,
  removeCharacterFromSelected1,
  removeCharacterFromSelected2,
} from '../redux/slices/charactersSlice'; 
import { RootState } from '../redux/store';
import { useCharacter1 } from '../redux/hooks/useCharacter1';
import { useCharacter2 } from '../redux/hooks/useCharacter2';


interface CharacterCardProps {
  character: Character;
  selectdType: 'character1' | 'character2';
}

function CharacterCard({ character, selectdType }: CharacterCardProps) {
  const dispatch = useDispatch();
  const charactersSelected1 = useCharacter1();
  const charactersSelected2 = useCharacter2();

  const isSelected = useSelector((state: RootState) => {
    if (selectdType === 'character1') {
      return charactersSelected1.some((c) => c.id === character.id);
    } else if (selectdType === 'character2') {
      return charactersSelected2.some((c) => c.id === character.id);
    }
    return false;
  });

  let circleColor = '';
  if (character.status === 'Alive') {
    circleColor = 'bg-green-500'; // Verde para "Alive"
  } else if (character.status === 'Dead') {
    circleColor = 'bg-red-500'; // Rojo para "Dead"
  } else {
    circleColor = 'bg-gray-500'; // Gris para "Unknown"
  }

  const handleAddToSelected = () => {
    // Diferencia si es select1 o select2 y realiza la acción correspondiente
    if (selectdType === 'character1') {
      if (isSelected) {
        dispatch(removeCharacterFromSelected1(character));
      } else {
        dispatch(addCharacterToSelected1(character));
      }
    } else if (selectdType === 'character2') {
      if (isSelected) {
        dispatch(removeCharacterFromSelected2(character));
      } else {
        dispatch(addCharacterToSelected2(character));
      }
    }
  };

  return (
    <div  data-testid="character-card"
      onClick={handleAddToSelected}
      className={`flex flex-row justify-start items-center w-full p-1 ${
        isSelected ? 'bg-[--plum-600]' : 'bg-[--plum-900] hover:bg-[--plum-700]'
      } transition-all duration-[400ms] rounded cursor-pointer`}
    >
      <div className='w-[120px] flex flex-row items-center justify-center'> 
        <Image src={character.image} alt={character.name} width={120} height={120}  className='rounded'/>
      </div>
      <div className='flex flex-col justify-start items-start w-[60%] pl-[5%] gap-1'>
        <p className='text-lg font-bold'>{character.name}</p>
        <span className="flex flex-row items-center capitalize text-sm"><div className={`w-3 h-3 rounded-full mr-2 ${circleColor}`} /> {character.status} {character.type}</span>
        <p className='text-xs text-gray-400'> Origin:</p>
        <span className='text-sm text-white'>{character.origin.name}</span>
      </div>
    </div>
  );
}

export default CharacterCard;

