const startButton = document.querySelector("#start");
const allBoxes = document.querySelectorAll(".box");
const winnerColor = document.querySelector("#winnerColor");
const resultButton = document.querySelector("#result");
const easyButton = document.querySelector("#easy");
const hardButton = document.querySelector("#hard");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const box6 = document.querySelector(".box6");

let luckyColor;
let colorsCollection;
let isGameFinished = false;
let gameLevel;


function generateRandomNumber(start = 0, end = 256) {
    return Math.floor(Math.random() * (end - start) + start);
}

function generateRandomColor() {
    return `rgb(${generateRandomNumber()}, ${generateRandomNumber()}, ${generateRandomNumber()})`;
}

function getRandomColorsListForEasyGame() {
    let colorsListEasy = [];
    for (let i = 0; i < 3; i++) {
        colorsListEasy.push(generateRandomColor());
    }
    return colorsListEasy;
}

function getRandomColorsListForHardGame() {
    let colorsListHard = [];
    for (let i = 0; i < 6; i++) {
        colorsListHard.push(generateRandomColor());
    }
    return colorsListHard;
}

function getLuckyColorForEasyGame(colorsListEasy) {
    return colorsListEasy[generateRandomNumber(0, colorsListEasy.length - 1)];
}

function getLuckyColorForHardGame(colorsListHard) {
    return colorsListHard[generateRandomNumber(0, colorsListHard.length - 1)];
}

function setColorsToBoxesEasy(colorsListEasy) {
    allBoxes.forEach((box, index) => {
        box.style.backgroundColor = colorsListEasy[index];
    });
}

function setColorsToBoxesHard(colorsListHard) {
    allBoxes.forEach((box, index) => {
        box.style.backgroundColor = colorsListHard[index];
    });
}

function startGame() {
    resultButton.textContent = "Choose a box";
}

function resetGame() {
    allBoxes.forEach((box) => {
      box.style.backgroundColor = `rgb(${25}, ${148}, ${148})`;
    });
    winnerColor.textContent = "......";
    resultButton.textContent = "......";
    luckyColor = null;
    colorsCollection = null;
    isGameFinished = false;
  }

easyButton.addEventListener("click", () => {
    easyButton.style.backgroundColor = `rgb(${25}, ${135}, ${84})`;
    easyButton.style.color = `rgb(${255}, ${255}, ${255})`;
    box4.style.display = "none";
    box5.style.display = "none";
    box6.style.display = "none";
    gameLevel = "easy";
    hardButton.style.color = "";
    hardButton.style.backgroundColor = "";
    allBoxes.forEach(box => 
        box.style.backgroundColor = "");
    resetGame();
});


hardButton.addEventListener("click", () => {
    hardButton.style.backgroundColor = `rgb(${220}, ${53}, ${69})`;
    hardButton.style.color = `rgb(${255}, ${255}, ${255})`;
    box4.style.display = "block";
    box5.style.display = "block";
    box6.style.display = "block";
    gameLevel = "hard";
    easyButton.style.color = "";
    easyButton.style.backgroundColor = "";
    allBoxes.forEach(box => 
        box.style.backgroundColor = "");
    resetGame();  
});


startButton.addEventListener("click", () => {
    if (gameLevel === "easy") {
        colorsCollection = getRandomColorsListForEasyGame();
        luckyColor = getLuckyColorForEasyGame(colorsCollection);
        setColorsToBoxesEasy(colorsCollection);
        winnerColor.textContent = luckyColor;
        isGameFinished = false;
        startGame();
    } else if (gameLevel === "hard") {
        colorsCollection = getRandomColorsListForHardGame();
        luckyColor = getLuckyColorForHardGame(colorsCollection);
        setColorsToBoxesHard(colorsCollection);
        winnerColor.textContent = luckyColor;
        isGameFinished = false;
        startGame();
    }    
});

allBoxes.forEach((box) => {
    box.addEventListener("click", (event) => {
        if (!isGameFinished) {
            if (event.target.style.backgroundColor === luckyColor) {
                resultButton.textContent = "Won";
            } else { 
                resultButton.textContent = "Lost"; 
            }
        }
        isGameFinished = true;
    })
});