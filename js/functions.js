const cells = [];
const NumberOfCells = 4;
const cellLightTime = 1000;
const cellPauseTime = 2000;
const gameBoard = document.getElementById("game-board");
const gameLevelBox = document.getElementById("gameLevel");
let gameLevel = 1;
let cellsClicked = 0;
let drawedCellsOrder = [];
let playerClickedCells = [];

createCells();
startNewRound();

function startNewRound() {
  gameLevel > 1 ? alert("Następna runda") : alert("Nowa Gra");
  gameLevelBox.innerHTML = `Level: ${gameLevel}`;
  cells.forEach((cell) => cell.classList.add("wait"));
  turnOnRandomCells();
}

function createCells() {
  for (let i = 0; i < NumberOfCells; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("id", i);
    cell.addEventListener("click", (e) => handleCellClick(e));
    cells.push(cell);
    gameBoard.append(cell);
  }
}

function handleCellClick(e) {
  e.target.classList.add("active");
  playerClickedCells.push(e.target.id);
  if (playerClickedCells[cellsClicked] == drawedCellsOrder[cellsClicked]) {
    setTimeout(turnOffCells, 1000 + cellLightTime);
    cellsClicked++;
  } else {
    setTimeout(turnOffCells, 1000 + cellLightTime);
    alert("Wrong");
    window.location.reload();
  }
  if (playerClickedCells.length == drawedCellsOrder.length) {
    setTimeout(startNewRound, 1000 + cellLightTime + 1000);
    gameLevel++;
  }
}

function turnOnRandomCells() {
  var counter = 0;
  var i = setInterval(() => {
    let drawedCell = Math.floor(Math.random() * cells.length);
    cells[drawedCell].classList.add("active");
    drawedCellsOrder.push(drawedCell);
    console.log(drawedCellsOrder);
    setTimeout(turnOffCells, 1000 + cellLightTime);

    counter++;
    if (counter === gameLevel) {
      clearInterval(i);
      setTimeout(waitForUserClick, 2000);
    }
  }, cellLightTime + cellPauseTime);
}

function turnOffCells() {
  cells.forEach((cell) => cell.classList.remove("active"));
}

function waitForUserClick() {
  cells.forEach((cell) => cell.classList.remove("wait"));
}