import React, { useEffect, useState } from 'react'
import './App.css'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function App() {
  const [letters, setLetters] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [chosenLetterIndexes, setChosenLetterIndexes] = useState<number[]>([]);

  const generateString = () => {
    let localLetters = '';
    while (localLetters.length < 25) {
      localLetters += CHARACTERS.charAt(Math.floor(Math.random() *
        CHARACTERS.length));
    }
    return localLetters;
  }

  useEffect(() => {
    let localLetters = generateString();
    let numVowels = localLetters.replaceAll(/[B-DF-HJ-NP-TV-Z]/g, '').length;
    let numConsonants = localLetters.replaceAll(/[AEIOU]/g, '').length;
    while(numVowels < 8 || numConsonants < 15) {
      localLetters = generateString();
      numVowels = localLetters.replaceAll(/[B-DF-HJ-NP-TV-Z]/g, '').length;
      numConsonants = localLetters.replaceAll(/[AEIOU]/g, '').length;
    } 
    setLetters(localLetters)
  }, [])


  const addLetterToWord = (letter: string): void => {
    setWord(word + letter);
  }

  const renderLetters = () => {
    const grid = [];
    for (let i = 0; i < 25; i++) {
      grid.push(<div onClick={() => {
        if (chosenLetterIndexes.filter(l => l === i).length === 0) { 
          let newIndexes = [...chosenLetterIndexes];
          newIndexes.push(i);
          addLetterToWord(letters[i])
          setChosenLetterIndexes(newIndexes);
        }
      }} className={'gridletter' + (chosenLetterIndexes.filter(l => l === i).length > 0 ? ' chosen' : '')}>{letters[i]}</div>)
    }
    return grid;
  }

  return (
    <>
      <div className='grid'>
        {renderLetters()}
      </div>
      <div>{word}</div>
    </>
  )
}