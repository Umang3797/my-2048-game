import React, { useState, useEffect } from 'react';
import './App.css';

const SIZE = 4;

function App() {
  const [board, setBoard] = useState(initializeBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('bestScore'), 10) || 0;
  });

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
      let newScore = score;
      switch (event.key) {
        case 'ArrowUp':
          newBoard = moveUp(board, newScore);
          break;
        case 'ArrowDown':
          newBoard = moveDown(board, newScore);
          break;
        case 'ArrowLeft':
          newBoard = moveLeft(board, newScore);
          break;
        case 'ArrowRight':
          newBoard = moveRight(board, newScore);
          break;
        default:
          return;
      }
      if (newBoard) {
        addNumber(newBoard.board);
        setBoard([...newBoard.board]);
        setScore(newBoard.score);
        if (newBoard.score > bestScore) {
          setBestScore(newBoard.score);
          localStorage.setItem('bestScore', newBoard.score);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [board, score, bestScore]);

  function moveLeft(board, currentScore) {
    let newScore = currentScore;
    const newBoard = board.map(row => {
      const result = slideRow(row);
      newScore += result.score;
      return result.row;
    });
    return { board: newBoard, score: newScore };
  }

  function moveRight(board, currentScore) {
    let newScore = currentScore;
    const newBoard = board.map(row => {
      const result = slideRow(row.reverse());
      newScore += result.score;
      return result.row.reverse();
    });
    return { board: newBoard, score: newScore };
  }

  function moveUp(board, currentScore) {
    let newScore = currentScore;
    const transposed = transpose(board);
    const newBoard = transposed.map(row => {
      const result = slideRow(row);
      newScore += result.score;
      return result.row;
    });
    return { board: transpose(newBoard), score: newScore };
  }

  function moveDown(board, currentScore) {
    let newScore = currentScore;
    const transposed = transpose(board);
    const newBoard = transposed.map(row => {
      const result = slideRow(row.reverse());
      newScore += result.score;
      return result.row.reverse();
    });
    return { board: transpose(newBoard), score: newScore };
  }

  function slideRow(row) {
    let arr = row.filter(val => val);
    let missing = SIZE - arr.length;
    let zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);
    let newScore = 0;
    for (let i = 0; i < SIZE - 1; i++) {
      if (arr[i] === arr[i + 1] && arr[i] !== 0) {
        arr[i] *= 2;
        newScore += arr[i];
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter(val => val);
    missing = SIZE - arr.length;
    zeros = Array(missing).fill(0);
    arr = arr.concat(zeros);
    return { row: arr, score: newScore };
  }

  function transpose(board) {
    return board[0].map((_, colIndex) => board.map(row => row[colIndex]));
  }

  return (
    <div className="App">
      <h1>2048 Game</h1>
      <div className="scoreboard">
        <div className="score">Score: {score}</div>
        <div className="best-score">Best: {bestScore}</div>
      </div>
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
