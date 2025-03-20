// Text
let playerOneCurrentScoreText = document.getElementById("player-one-current-score");
let playerOneTotalScoreText = document.getElementById("player-one-total-score");

let playerTwoCurrentScoreText = document.getElementById("player-two-current-score");
let playerTwoTotalScoreText = document.getElementById("player-two-total-score");

let winnerText = document.getElementById("winner-text");

// Sides
let playerOneSide = document.getElementById("left-side");
let playerTwoSide = document.getElementById("right-side");

// Image
let diceImage = document.getElementById("image");

// Buttons
let newGameButton = document.getElementById("new-game-button");
let rollButton = document.getElementById("roll-button");
let holdButton = document.getElementById("hold-button");

//
let turn = 1;
let dice = ["dice-six-faces-one.png", "dice-six-faces-two.png", "dice-six-faces-three.png",
    "dice-six-faces-four.png", "dice-six-faces-five.png", "dice-six-faces-six.png"];
const MAX_SCORE = 50;

//
newGameButton.addEventListener("click", newGame)
rollButton.addEventListener("click", roll)
holdButton.addEventListener("click", addScore)

const playerOne = {
    currentScore: 0,
    totalScore: 0
}

const playerTwo = {
    currentScore: 0,
    totalScore: 0
}

function reDraw() {
    playerOneCurrentScoreText.textContent = playerOne.currentScore;
    playerOneTotalScoreText.textContent = playerOne.totalScore;

    playerTwoCurrentScoreText.textContent = playerTwo.currentScore;
    playerTwoTotalScoreText.textContent = playerTwo.totalScore;
}

function newGame() {
    rollButton.disabled = false;
    holdButton.disabled = false;

    winnerText.textContent = "";

    turn = 1;
    playerOneSide.classList.add("active")
    playerTwoSide.classList.remove("active")

    playerOne.currentScore = 0;
    playerOne.totalScore = 0;

    playerTwo.currentScore = 0;
    playerTwo.totalScore = 0;
    reDraw()
}

function changeTurn() {
    if (turn === 1) {
        turn = 2;
        playerOneSide.classList.remove("active")
        playerTwoSide.classList.add("active")
    }
    else {
        turn = 1;
        playerOneSide.classList.add("active")
        playerTwoSide.classList.remove("active")
    }
}

function roll() {
    let randNumber = Math.floor(Math.random() * 6) + 1;
    drawDice(randNumber)

    if (randNumber > 1) {

        if (turn === 1) {
            playerOne.currentScore+= randNumber;
        }
        else if (turn === 2) {
            playerTwo.currentScore += randNumber;
        }

    }
    else if (randNumber === 1) {
        if (turn === 1) {
            playerOne.currentScore = 0;
            playerOne.totalScore = 0;
        }
        else if (turn === 2) {
            playerTwo.currentScore = 0;
            playerTwo.totalScore = 0;
        }
        addScore()
        // changeTurn()
    }
    reDraw()
}

function addScore() {
    if (turn === 1) {
        playerOne.totalScore += playerOne.currentScore;
    }
    else if (turn === 2) {
        playerTwo.totalScore += playerTwo.currentScore;
    }
    playerOne.currentScore = 0;
    playerTwo.currentScore = 0;
    checkWinner()
    reDraw()
}

function drawDice(numb) {
    diceImage.src = dice[numb - 1]
}

function checkWinner() {
    if (playerOne.totalScore >= MAX_SCORE) {
        winnerText.textContent = "Player One Won!";
        rollButton.disabled = true;
        holdButton.disabled = true;
    }
    else if (playerTwo.totalScore >= MAX_SCORE) {
        winnerText.textContent = "Player Two Won!";
        rollButton.disabled = true;
        holdButton.disabled = true;
    }
    else {
        changeTurn()
    }
}
