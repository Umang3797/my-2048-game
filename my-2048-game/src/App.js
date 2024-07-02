import React, { useState } from 'react';
import './App.css';

const SIZE = 4;

function App() {
  const [board, setBoard] = useState(initializeBoard());

  function initializeBoard() {
    const newBoard = Array(SIZE).fill().map(() => Array(SIZE).fill(0));
    addNumber(newBoard);
    addNumber(newBoard);
    return newBoard;
  }

  function addNumber(board) {
    let added = false;
    while (!added) {
      const row = Math.floor(Math.random() * SIZE);
      const col = Math.floor(Math.random() * SIZE);
      if (board[row][col] === 0) {
        board[row][col] = Math.random() < 0.9 ? 2 : 4;
        added = true;
      }
    }
  }

  return (
    <div className="App">
      <h1>2048 Game</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className="cell">
                {cell !== 0 ? cell : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
