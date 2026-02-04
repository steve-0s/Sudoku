import React, { useState } from 'react'
import Grid from './components/grid'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(null)));
  const [puzzle, setPuzzle] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));

  const [selected, setSelected] = useState(null);

  const handleInput = (rIdx, cIdx, value) => {
    if (value == "" || (value >= 1 && value <= 9)) {
      setBoard(prev => {
        return prev.map((row, r) => {
          return row.map((cell, c) => {
            if (r === rIdx && c === cIdx) {
              return value ? parseInt(value) : null;
            }
            return cell;
          })
        })
      })
    }
  }


  return (
    <div>
      <h1 className='text-center text-4xl font-bold text-indigo-700 mt-10 '>SUDOKU</h1>
      <Grid board={board}
        puzzle={puzzle}
        selected={selected}
        setSelected={setSelected}
        handleInput={handleInput} />
    </div>
  )
}

export default App