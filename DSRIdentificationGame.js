import React, { useState, useEffect } from 'react';

const allTickets = [
  {
    message: "Hi, I can't access my account. Can you help me?",
    isDSR: false,
    explanation: "This is a common support request, not a DSR. The user is asking for help with account access, not specifically requesting their personal data."
  },
  {
    message: "Please delete all my data. I'm not interested anymore.",
    isDSR: true,
    explanation: "This is a clear deletion request, which is a type of DSR. Good job! Don't forget to verify their identity before proceeding with the request."
  },
  {
    message: "Can you send me all the information you have about me?",
    isDSR: true,
    explanation: "This is an access request, which is a type of DSR. The user is asking for all their personal data."
  },
  {
    message: "I think my email address is wrong in your system. It should be johndoe@email.com.",
    isDSR: true,
    explanation: "This is a correction request, which is a type of DSR. The user is asking to update their personal information."
  },
  {
    message: "I want to transfer my account to another service provider. Can you help with that?",
    isDSR: true,
    explanation: "This is a data portability request, which is a type of DSR. The user is asking to transfer their data to another provider."
  },
  {
    message: "Can you tell me how you're using my data for marketing?",
    isDSR: true,
    explanation: "This is an information request about data processing, which falls under DSR. The user is asking about how their data is being used."
  },
  {
    message: "I forgot my password. How do I reset it?",
    isDSR: false,
    explanation: "This is a standard support request for password reset, not a DSR. The user is not requesting access to their personal data or exercising other data subject rights."
  },
  {
    message: "Can you stop sending me marketing emails?",
    isDSR: false,
    explanation: "While this involves personal data, it's typically handled as a marketing preference rather than a formal DSR. However, it's good practice to treat it with similar care."
  },
  {
    message: "I want to know why I was denied a loan.",
    isDSR: true,
    explanation: "This could be considered a request for information about automated decision-making, which falls under DSR rights in some jurisdictions."
  },
  {
    message: "How do I upgrade my subscription?",
    isDSR: false,
    explanation: "This is a general customer service inquiry about services, not a request related to personal data."
  },
  {
    message: "I'm having trouble with your mobile app. It keeps crashing.",
    isDSR: false,
    explanation: "This is a technical support issue, not a request related to personal data or privacy rights."
  },
  {
    message: "Can you explain the charges on my last bill?",
    isDSR: false,
    explanation: "This is a billing inquiry, not a request for personal data or exercise of privacy rights."
  },
  {
    message: "I want to change my username. Is that possible?",
    isDSR: false,
    explanation: "While this involves personal information, changing a username is typically a standard account management function, not a formal DSR."
  },
  {
    message: "Do you share my information with third parties?",
    isDSR: true,
    explanation: "This is a request for information about data sharing practices, which falls under DSR rights in many privacy regulations."
  },
  {
    message: "I need a refund for my last purchase.",
    isDSR: false,
    explanation: "This is a standard customer service request related to transactions, not a data subject request."
  },
  {
    message: "Can you send me a copy of my purchase history?",
    isDSR: true,
    explanation: "This is a request for specific personal data (purchase history), which qualifies as an access request under DSR."
  },
  {
    message: "How long do you keep my data after I stop using your service?",
    isDSR: true,
    explanation: "This is a request for information about data retention policies, which is covered under DSR rights in many privacy laws."
  },
  {
    message: "I'm moving to a new address. How do I update my delivery information?",
    isDSR: false,
    explanation: "While this involves updating personal information, it's a standard account management task, not a formal DSR."
  },
  {
    message: "Can you tell me if you've ever had a data breach that affected my account?",
    isDSR: true,
    explanation: "This is a request for information about data security incidents affecting the user's personal data, which falls under DSR in many jurisdictions."
  },
  {
    message: "I'm having trouble connecting my account to a third-party app.",
    isDSR: false,
    explanation: "This is a technical support issue related to account functionality, not a request related to personal data or privacy rights."
  }
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const DSRIdentificationGame = () => {
  const [tickets, setTickets] = useState([]);
  const [currentTicketIndex, setCurrentTicketIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    restartGame();
  }, []);

  useEffect(() => {
    if (correctAnswers === 5) {
      setGameOver(true);
    }
  }, [correctAnswers]);

  const handleAnswer = (selectedIsDSR) => {
    const currentTicket = tickets[currentTicketIndex];
    if (selectedIsDSR === currentTicket.isDSR) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setShowExplanation(true);
  };

  const nextTicket = () => {
    setShowExplanation(false);
    setCurrentTicketIndex((prevIndex) => prevIndex + 1);
  };

  const restartGame = () => {
    setTickets(shuffleArray(allTickets).slice(0, 10));
    setCurrentTicketIndex(0);
    setCorrectAnswers(0);
    setShowExplanation(false);
    setGameOver(false);
  };

  const currentTicket = tickets[currentTicketIndex];

  if (!currentTicket) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>DSR Identification Game</h1>
      <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <p style={{ fontSize: '18px' }}><strong>Support Ticket:</strong> {currentTicket.message}</p>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <button 
          onClick={() => handleAnswer(true)} 
          style={{ 
            backgroundColor: '#4CAF50', 
            color: 'white', 
            padding: '10px 20px', 
            fontSize: '16px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
          disabled={showExplanation || gameOver}
        >
          It's a DSR
        </button>
        <button 
          onClick={() => handleAnswer(false)} 
          style={{ 
            backgroundColor: '#f44336', 
            color: 'white', 
            padding: '10px 20px', 
            fontSize: '16px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer' 
          }}
          disabled={showExplanation || gameOver}
        >
          It's NOT a DSR
        </button>
      </div>
      {showExplanation && (
        <div style={{ backgroundColor: '#e7f3fe', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
          <p><strong>{currentTicket.isDSR ? 'Correct! This is a DSR.' : 'This is not a DSR.'}</strong></p>
          <p>{currentTicket.explanation}</p>
          <button 
            onClick={nextTicket} 
            style={{ 
              backgroundColor: '#008CBA', 
              color: 'white', 
              padding: '10px 20px', 
              fontSize: '16px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Next Ticket
          </button>
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
        <p>Correct Answers: {correctAnswers} / 5</p>
        {gameOver && (
          <div>
            <h2>Congratulations! You've completed the game.</h2>
            <button 
              onClick={restartGame} 
              style={{ 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                padding: '10px 20px', 
                fontSize: '16px', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DSRIdentificationGame;
