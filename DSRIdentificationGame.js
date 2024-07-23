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
  // ... (copy all the other tickets from your original React component)
];

let currentTickets, currentTicketIndex, correctAnswers;

function startGame() {
  currentTickets = shuffleArray([...allTickets]).slice(0, 10);
  currentTicketIndex = 0;
  correctAnswers = 0;
  showNextTicket();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function showNextTicket() {
  if (currentTicketIndex >= currentTickets.length) {
    endGame();
    return;
  }
  
  const ticket = currentTickets[currentTicketIndex];
  document.getElementById('ticket-message').textContent = ticket.message;
  document.getElementById('explanation').style.display = 'none';
  document.getElementById('dsr-button').disabled = false;
  document.getElementById('not-dsr-button').disabled = false;
  document.getElementById('next-button').style.display = 'none';
}

function handleAnswer(isDSR) {
  const ticket = currentTickets[currentTicketIndex];
  const isCorrect = isDSR === ticket.isDSR;
  
  if (isCorrect) correctAnswers++;
  
  document.getElementById('explanation').textContent = 
    (isCorrect ? "Correct! " : "Incorrect. ") + ticket.explanation;
  document.getElementById('explanation').style.display = 'block';
  document.getElementById('dsr-button').disabled = true;
  document.getElementById('not-dsr-button').disabled = true;
  
  currentTicketIndex++;
  
  if (currentTicketIndex < currentTickets.length) {
    document.getElementById('next-button').style.display = 'block';
  } else {
    endGame();
  }
}

function endGame() {
  document.getElementById('game-container').innerHTML = `
    <h2>Game Over!</h2>
    <p>You got ${correctAnswers} out of ${currentTickets.length} correct.</p>
    <button onclick="startGame()">Play Again</button>
  `;
}

window.onload = startGame;
