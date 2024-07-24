import React, { useState, useEffect } from 'react';

const DSRIdentificationGame = () => {
  const [currentTicket, setCurrentTicket] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffledTickets = shuffleArray([...allTickets]).slice(0, 10);
    setCurrentTicket(shuffledTickets[0]);
    setCorrectAnswers(0);
    setGameOver(false);
  };

  const handleAnswer = (isDSR) => {
    if (isDSR === currentTicket.isDSR) {
      setCorrectAnswers(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const nextTicket = () => {
    const nextIndex = allTickets.indexOf(currentTicket) + 1;
    if (nextIndex < allTickets.length) {
      setCurrentTicket(allTickets[nextIndex]);
      setShowExplanation(false);
    } else {
      setGameOver(true);
    }
  };

  if (!currentTicket) return <div>Loading...</div>;

  return (
    <div>
      <h1>DSR Identification Game</h1>
      <div>
        <p><strong>Support Ticket:</strong> {currentTicket.message}</p>
        <button onClick={() => handleAnswer(true)} disabled={showExplanation || gameOver}>It's a DSR</button>
        <button onClick={() => handleAnswer(false)} disabled={showExplanation || gameOver}>It's NOT a DSR</button>
      </div>
      {showExplanation && (
        <div>
          <p>{currentTicket.isDSR ? "Correct! This is a DSR." : "This is not a DSR."}</p>
          <p>{currentTicket.explanation}</p>
          <button onClick={nextTicket}>Next Ticket</button>
        </div>
      )}
      {gameOver && (
        <div>
          <h2>Game Over!</h2>
          <p>You got {correctAnswers} out of 10 correct.</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default DSRIdentificationGame;
