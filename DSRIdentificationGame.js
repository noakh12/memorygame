const React = window.React;
const ReactDOM = window.ReactDOM;

console.log("DSRIdentificationGame.js starting to load");

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
  }
];

console.log("allTickets defined:", allTickets.length, "tickets");

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
    ticketIndex: 0,
    tickets: [],
    lastAnswerCorrect: false,
    showCertificateForm: false,
    playerName: ''
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
      ticketIndex: 0,
      tickets: shuffledTickets,
      lastAnswerCorrect: false,
      showCertificateForm: false,
      playerName: ''
    });
  };

  const handleAnswer = (isDSR) => {
    const isCorrect = isDSR === state.currentTicket.isDSR;
    setState(prev => ({ 
      ...prev, 
      correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
      showExplanation: true,
      lastAnswerCorrect: isCorrect
    }));
  };

  const nextTicket = () => {
    const nextIndex = state.ticketIndex + 1;
    if (nextIndex < state.tickets.length) {
      setState(prev => ({
        ...prev,
        currentTicket: prev.tickets[nextIndex],
        showExplanation: false,
        ticketIndex: nextIndex,
        lastAnswerCorrect: false
      }));
    } else {
      setState(prev => ({ ...prev, gameOver: true, showCertificateForm: true }));
    }
  };

  const handleNameChange = (event) => {
    setState(prev => ({ ...prev, playerName: event.target.value }));
  };

  const generateCertificate = () => {
    const playerName = state.playerName || 'Player';
    const score = state.correctAnswers;
    const gameType = 'Customer Support';
    const uniqueId = Date.now();
    const certificateUrl = `certificate.html?name=${encodeURIComponent(playerName)}&game=${encodeURIComponent(gameType)}&score=${score}&id=${uniqueId}`;
    window.open(certificateUrl, '_blank');
  };

  if (!state.currentTicket) return React.createElement('div', null, 'Loading...');

  return React.createElement(
    'div',
    { style: { fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' } },
    React.createElement('h1', { style: { textAlign: 'center' } }, 'DSR Identification Game'),
    !state.gameOver ? (
      React.createElement(
        React.Fragment,
        null,
        React.createElement(
          'div',
          { style: { backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', marginBottom: '20px' } },
          React.createElement('p', { style: { fontSize: '18px' } }, 
            React.createElement('strong', null, 'Support Ticket: '),
            state.currentTicket.message
          )
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', justifyContent: 'space-between', marginBottom: '20px' } },
          React.createElement(
            'button',
            { 
              onClick: () => handleAnswer(true),
              disabled: state.showExplanation,
              style: { 
                backgroundColor: '#4CAF50', 
                color: 'white', 
                padding: '10px 20px', 
                fontSize: '16px', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }
            },
            "It's a DSR"
          ),
          React.createElement(
            'button',
            { 
              onClick: () => handleAnswer(false),
              disabled: state.showExplanation,
              style: { 
                backgroundColor: '#f44336', 
                color: 'white', 
                padding: '10px 20px', 
                fontSize: '16px', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer' 
              }
            },
            "It's NOT a DSR"
          )
        ),
        state.showExplanation && React.createElement(
          'div',
          { style: { backgroundColor: '#e7f3fe', padding: '15px', borderRadius: '5px', marginBottom: '20px' } },
          React.createElement('p', null, 
            React.createElement('strong', null, state.lastAnswerCorrect ? "Correct!" : "Incorrect.")
          ),
          React.createElement('p', null, state.currentTicket.explanation),
          React.createElement(
            'button',
            { 
              onClick: nextTicket,
              style: { 
                backgroundColor: '#008CBA', 
                color: 'white', 
                padding: '10px 20px', 
                fontSize: '16px', 
                border: 'none', 
                borderRadius: '5px', 
                cursor: 'pointer',
                marginTop: '10px'
              }
            },
            "Next Ticket"
          )
        ),
        React.createElement(
          'div',
          { style: { textAlign: 'center', marginTop: '20px' } },
          React.createElement('p', null, `Correct Answers: ${state.correctAnswers} / 10`)
        )
      )
    ) : (
      React.createElement(
        'div',
        { style: { textAlign: 'center' } },
        React.createElement('h2', null, 'Game Over!'),
        React.createElement('p', null, `You got ${state.correctAnswers} out of 10 correct.`),
        state.showCertificateForm ? (
          React.createElement(
            'div',
            null,
            React.createElement('p', null, "Enter your name to generate a certificate:"),
            React.createElement('input', {
              type: 'text',
              value: state.playerName,
              onChange: handleNameChange,
              style: { padding: '5px', marginRight: '10px' }
            }),
            React.createElement(
              'button',
              {
                onClick: generateCertificate,
                style: {
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '10px 20px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }
              },
              "Generate Certificate"
            )
          )
        ) : null,
        React.createElement(
          'button',
          { 
            onClick: startGame,
            style: { 
              backgroundColor: '#4CAF50', 
              color: 'white', 
              padding: '10px 20px', 
              fontSize: '16px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              marginTop: '20px'
            }
          },
          "Play Again"
        )
      )
    )
  );
};

console.log("DSRIdentificationGame component defined");

window.DSRIdentificationGame = DSRIdentificationGame;
