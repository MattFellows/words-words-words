import React, { useEffect, useState } from 'react'
import './App.css'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function App() {
  const [letters, setLetters] = useState<string>('');
  const [word, setWord] = useState<string>('');
  const [chosenLetterIndexes, setChosenLetterIndexes] = useState<number[]>([]);

  const times = (freq: number, letter: string): string[] => {
    const arr = [];
    for (let i = 0; i < freq; i++) {
      arr.push(letter)
    }
    return arr;
  }
  const generateString = (): string => {
    const ALL_LETTERS_WITH_FREQUENCY = [
      ...times(56, 'E'), ...times(43, 'A'), ...times(39, 'R'), ...times(38, 'I'), ...times(38, 'O'), ...times(35, 'T'),
      ...times(34, 'N'), ...times(29, 'S'), ...times(28, 'L'), ...times(23, 'C'), ...times(18, 'U'), ...times(17, 'D'),
      ...times(16, 'P'), ...times(15, 'M'), ...times(15, 'H'), ...times(13, 'G'), ...times(11, 'B'), ...times(5, 'F'), 
      ...times(9, 'Y'), ...times(7, 'W'), ...times(6, 'K'), ...times(5, 'V'), ...times(2, 'X'), 'Z', 'J', 'Q'];
    const shuffled = ALL_LETTERS_WITH_FREQUENCY
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    return shuffled.slice(0, 25).reduce((prev, cur) => prev + cur);
  }

  useEffect(() => {
    let localLetters = generateString();
    let numVowels = localLetters.replaceAll(/[B-DF-HJ-NP-TV-Z]/g, '').length;
    let numConsonants = localLetters.replaceAll(/[AEIOU]/g, '').length;
    while(numVowels < 5 || numConsonants < 15) {
      console.log('Regenerating: ', localLetters)
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