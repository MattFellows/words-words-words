import React, { useEffect, useState } from 'react'
import './App.css'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export default function App() {
  const [letters, setLetters] = useState<string>('');
  useEffect(() => {
    let localLetters = '';
    while (localLetters.length < 25) {
      localLetters += CHARACTERS.charAt(Math.floor(Math.random() *
        CHARACTERS.length));
    }
    setLetters(localLetters)
  }, [])

  const renderLetters = () => {
    const grid = [];
    for (let i = 0; i < 25; i++) {
      grid.push(<div>{letters[i]}</div>)
    }
    return grid;
  }

  return (
    <main>
      {renderLetters()}
    </main>
  )
}