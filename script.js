const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("resetBtn");
const modeToggle = document.getElementById("modeToggle");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Handle cell click
function handleClick(e) {
  const index = e.target.dataset.index;
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winningPattern = checkWinner();
  if (winningPattern) {
    statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
    highlightWinner(winningPattern);
    updateScore(currentPlayer);
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "🤝 It's a tie!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for winner
function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      board[a] === currentPlayer &&
      board[b] === currentPlayer &&
      board[c] === currentPlayer
    ) {
      return pattern;
    }
  }
  return null;
}

// Highlight winning cells
function highlightWinner(pattern) {
  pattern.forEach(index => {
    cells[index].classList.add("winning");
  });
}

// Update score
function updateScore(player) {
  scores[player]++;
  if (player === "X") {
    scoreX.textContent = scores.X;
  } else {
    scoreO.textContent = scores.O;
  }
}

// Reset game (not scores)
function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning");
  });
}

// Dark mode toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  modeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
});

// Event listeners
cells.forEach(cell => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);

const startOverButton = document.getElementById("startOverBtn");

function startOverGame() {
  // Reset everything
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  scores = { X: 0, O: 0 }; // Reset scores

  // Update UI
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;

  // Clear the board
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("winning");
  });
}

// Add event listener for start over
startOverButton.addEventListener("click", startOverGame);
