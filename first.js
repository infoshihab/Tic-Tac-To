let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#resetBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let hea = document.querySelector(".dis");
let msg = document.querySelector("#msg");

let turnO = true; // player X, player O
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Reset the game
const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  hea.classList.remove("dis");
};

// Add click event to each box
boxes.forEach((box) => {
  hea.classList.remove("dis");
  box.addEventListener("click", () => {
    console.log("box was clicked");
    if (turnO) {
      box.innerText = "O";
      turnO = false;
    } else {
      box.innerText = "X";
      turnO = true;
    }
    box.disabled = true;

    checkWinner();
  });
});

// Disable all boxes when game ends
const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Enable all boxes and reset them for a new game
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Show the winner message
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  hea.classList.add("dis");
  disabledBoxes();
};

// Show draw message
const showDraw = () => {
  msg.innerText = "It's a draw!";
  msgContainer.classList.remove("hide");
  hea.classList.add("dis");
};

// Check for a winner or a draw
const checkWinner = () => {
  let winnerDeclared = false;

  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val);
        winnerDeclared = true;
        break;
      }
    }
  }

  // If no winner is declared and all boxes are filled, it's a draw
  if (!winnerDeclared && [...boxes].every((box) => box.innerText !== "")) {
    console.log("It's a draw!");
    showDraw();
  }
};

// Reset game on button clicks
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);
