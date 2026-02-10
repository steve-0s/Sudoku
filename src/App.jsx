import React, { useState, useEffect } from 'react'
import Grid from './components/grid'
import Controls from './components/controls'
import ThemeSelector from './components/ThemeSelector'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { getSudoku } from './utils/sudokuGenerator'

const SudokuGame = () => {
  const [board, setBoard] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [status, setStatus] = useState('');
  const [selected, setSelected] = useState(null);
  const [greenCount, setGreenCount] = useState(0);

  const { theme } = useTheme();

  const [isThinking, setIsThinking] = useState(false);
  const [lastInteractionParams, setLastInteractionParams] = useState(Date.now());

  const resetIdleTimer = () => {
    setLastInteractionParams(Date.now());
    setIsThinking(false);
  };

  useEffect(() => {
    const checkIdle = setInterval(() => {
      if (Date.now() - lastInteractionParams > 10000 && !status && board) {
        setIsThinking(true);
      }
    }, 1000);

    return () => clearInterval(checkIdle);
  }, [lastInteractionParams, status, board]);

  useEffect(() => {
    handleNewPuzzle();
  }, []);

  const handleCheck = () => {
    resetIdleTimer();
    if (!board || !solution) return;

    const flatBoard = board.flat();
    const flatSolution = solution.flat();

    if (flatBoard.every((cell, i) => cell === flatSolution[i])) {
      setStatus("Correct!");
      // Simple animation trigger - can be enhanced later
    } else {
      setStatus("Incorrect, Try Again!");
    }
  }

  const handleReset = () => {
    resetIdleTimer();
    if (puzzle) {
      const playableBoard = puzzle.map(row => row.map(cell => cell === 0 ? null : cell));
      setBoard(playableBoard);
      setStatus('');
      setSelected(null);
    }
  }

  const handleNewPuzzle = () => {
    resetIdleTimer();
    const { solution: newSolution, puzzle: newPuzzle, initialBoard } = getSudoku();
    setSolution(newSolution);
    setPuzzle(newPuzzle);
    setBoard(initialBoard);
    setStatus('');
    setSelected(null);
  }

  const handleInput = (rIdx, cIdx, value) => {
    resetIdleTimer();
    if (puzzle && puzzle[rIdx][cIdx] !== 0) return;

    if (value === "" || (parseInt(value) >= 1 && parseInt(value) <= 9)) {
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

  if (!board) return <div className="min-h-screen flex items-center justify-center text-2xl">Loading...</div>;

  return (
    <div className={`min-h-screen flex flex-col items-center py-10 transition-colors duration-300 ${theme.bg} ${theme.text} relative overflow-hidden`}
      onClick={resetIdleTimer} // Global reset on click
      onKeyDown={resetIdleTimer} // Global reset on key press
      tabIndex={0}
    >

      {/* Status Banner */}
      <div className={`fixed top-0 left-0 w-full p-4 text-center text-xl font-bold tracking-wide shadow-md transition-transform duration-300 z-50
        ${status ? 'translate-y-0' : '-translate-y-full'}
        ${status === 'Correct!' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}
      `}>
        {status}
      </div>

      {/* Thinking Animation */}
      <div className={`fixed bottom-10 right-10 transition-all duration-700 ease-in-out transform pointer-events-none z-40
        ${isThinking ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}
      `}>
        <img
          src="/imgs/thinking.png"
          alt="Thinking..."
          className="w-48 h-auto drop-shadow-2xl animate-bounce-slow"
        />
        <div className={`absolute -top-16 -left-10 bg-white p-3 rounded-xl shadow-lg border-2 ${theme.boardBorder} text-gray-800 text-sm font-bold whitespace-nowrap bubble-tail`}>
          Need a hint? 🤔
        </div>
      </div>

      {/* Success Animation - Approved Image */}
      <div className={`fixed inset-0 flex items-center justify-center pointer-events-none z-50 transition-all duration-500
        ${status === 'Correct!' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
      `}>
        <img
          src="/imgs/aprvd.png"
          alt="Approved!"
          className="w-64 h-auto drop-shadow-2xl animate-bounce"
        />
      </div>

      <div className="w-full max-w-2xl px-4 mt-4 relative z-10">
        <header className="flex flex-col items-center mb-8">
          <h1 className={`text-5xl font-extrabold tracking-tight mb-2 ${theme.status} drop-shadow-sm`}>SUDOKU</h1>
          <p className="text-sm opacity-60 font-medium tracking-widest uppercase">Classic Puzzle Game</p>
        </header>

        <ThemeSelector />

        <main className={`p-6 rounded-2xl shadow-2xl transition-all duration-300 ${theme.card} border ${theme.boardBorder}`}>
          <Grid
            board={board}
            puzzle={puzzle}
            selected={selected}
            setSelected={setSelected}
            handleInput={handleInput}
          />

          <div className="mt-8">
            <Controls
              handleCheck={handleCheck}
              handleReset={handleReset}
              handleNewPuzzle={handleNewPuzzle}
            />
          </div>
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <SudokuGame />
    </ThemeProvider>
  )
}

export default App