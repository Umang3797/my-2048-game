import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      let newBoard;
      switch (event.key) {
        case 'ArrowUp':
          newBoard = moveUp(board);
          break;
        case 'ArrowDown':
          newBoard = moveDown(board);
          break;
        case 'ArrowLeft':
          newBoard = moveLeft(board);
          break;
        case 'ArrowRight':
          newBoard = moveRight(board);
          break;
        default:
          return;
      }
      if (newBoard) {
        addNumber(newBoard);
        setBoard([...newBoard]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  function moveLeft(board) {
    const newBoard = board.map(row => slideRow(row));
    return newBoard;
  }

  function moveRight(board) {
    const newBoard = board.map(row => slideRow(row.reverse()).reverse());
    return newBoard;
  }

  function moveUp(board) {
    const transposed = transpose(board);
    const newBoard = transposed.map(row => slideRow(row));
    return transpose(newBoard);
  }

  function moveDown(board) {
    const transposed = transpose(board);
    const newBoard = transposed.map(row => slideRow(row.reverse()).reverse());
    return transpose(newBoard);
  }

  function slideRow(row) {
    let arr = row.filter(val => val);
    let missing = SIZE - arr.length;
    let zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);
    for (let i = 0; i < SIZE - 1; i++) {
      if (arr[i] === arr[i + 1] && arr[i] !== 0) {
        arr[i] *= 2;
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter(val => val);
    missing = SIZE - arr.length;
    zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);
    return arr;
  }

  function transpose(board) {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  }

  return (
    <div className="App">
      <h1>2048 Game</h1>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell value-${cell}`}>
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
