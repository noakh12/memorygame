console.log("DSRIdentificationGame.js starting to load");

const allTickets = [
    // Your ticket data here
];

console.log("allTickets defined:", allTickets.length, "tickets");

// Rest of your game code...

console.log("DSRIdentificationGame component defined");
const allTickets = [
  // Add your ticket data here
  // Example:
  // { message: "Please delete all my data.", isDSR: true, explanation: "This is a deletion request." },
  // { message: "How do I reset my password?", isDSR: false, explanation: "This is a general support question." },
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
  const [state, setState] = React.useState({
    currentTicket: null,
    correctAnswers: 0,
    gameOver: false,
    showExplanation: false,
  });

  React.useEffect(() => {
    startGame();
  }, []);

  const startGame = () => {
    const shuffledTickets = shuffleArray([...allTickets]).slice(0, 10);
    setState({
      currentTicket: shuffledTickets[0],
      correctAnswers: 0,
      gameOver: false,
      showExplanation: false,
    });
  };

  const handleAnswer = (isDSR) => {
    if (isDSR === state.currentTicket.isDSR) {
      setState(prev => ({ ...prev, correctAnswers: prev.correctAnswers + 1 }));
    }
    setState(prev => ({ ...prev, showExplanation: true }));
  };

  const nextTicket = () => {
    const nextIndex = allTickets.indexOf(state.currentTicket) + 1;
    if (nextIndex < allTickets.length) {
      setState(prev => ({
        ...prev,
        currentTicket: allTickets[nextIndex],
        showExplanation: false,
      }));
    } else {
      setState(prev => ({ ...prev, gameOver: true }));
    }
  };

  if (!state.currentTicket) return React.createElement('div', null, 'Loading...');

  return React.createElement(
    'div',
    null,
    React.createElement('h1', null, 'DSR Identification Game'),
    React.createElement(
      'div',
      null,
      React.createElement('p', null, 
        React.createElement('strong', null, 'Support Ticket: '),
        state.currentTicket.message
      ),
      React.createElement(
        'button',
        { 
          onClick: () => handleAnswer(true),
          disabled: state.showExplanation || state.gameOver
        },
        "It's a DSR"
      ),
      React.createElement(
        'button',
        { 
          onClick: () => handleAnswer(false),
          disabled: state.showExplanation || state.gameOver
        },
        "It's NOT a DSR"
      )
    ),
    state.showExplanation && React.createElement(
      'div',
      null,
      React.createElement('p', null, state.currentTicket.isDSR ? "Correct! This is a DSR." : "This is not a DSR."),
      React.createElement('p', null, state.currentTicket.explanation),
      React.createElement('button', { onClick: nextTicket }, "Next Ticket")
    ),
    state.gameOver && React.createElement(
      'div',
      null,
      React.createElement('h2', null, 'Game Over!'),
      React.createElement('p', null, `You got ${state.correctAnswers} out of 10 correct.`),
      React.createElement('button', { onClick: startGame }, "Play Again")
    )
  );
};
