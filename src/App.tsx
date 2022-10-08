import React, { useEffect, useState } from 'react'
import './App.css'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function App() {
  const [letters, setLetters] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [chosenLetterIndexes, setChosenLetterIndexes] = useState<number[]>([]);

  useEffect(() => {
    let localLetters = '';
    while (localLetters.length < 25) {
      localLetters += CHARACTERS.charAt(Math.floor(Math.random() *
        CHARACTERS.length));
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