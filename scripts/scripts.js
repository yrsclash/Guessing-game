const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const gameModel = document.querySelector(".game-model");
const playAgainBtn = document.querySelector(".play-again ");

let score = 0; // Initialize score
const scoreCounter = document.getElementById("score-counter"); // Get the score counter element

//audio
const correctAudio = new Audio('mixkit-hard-single-key-press-in-a-laptop-2542.wav');
const incorrectAudio = new Audio('mixkit-system-beep-buzzer-fail-2964.wav');
const winAudio = new Audio('mixkit-fantasy-game-success-notification-270.wav');
const loseAudio = new Audio('mixkit-cartoon-failure-piano-473.wav');

let currentWord, correctLetters,wrongGuessCount;
const maxGuesses = 6;


const resetGame =() => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman-${wrongGuessCount}.png`;
    guessesText.innerText =`${ wrongGuessCount } / ${ maxGuesses }`;
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled =false);
    wordDisplay.innerHTML = currentWord.split("").map(() => '<li class="letter"></li>').join("");
    gameModel.classList.remove("show");
}
const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b ").innerText = hint;
    resetGame();   
};

const gameOver = (isVictory) => {
    setTimeout(()=> {
        const modelText = isVictory ? `you found the word:` : `The correct word was:`;
        gameModel.querySelector("img").src = `images/${isVictory ?'victory': 'lost'}.gif`;
        gameModel.querySelector("h4").innerText = `${isVictory ?'Congrats!': 'Game Over!'}`;
        gameModel.querySelector("p").innerHTML = `${modelText} <b> ${currentWord} </b> `;
        gameModel.classList.add("show");

        if (isVictory) {
            score += 1;  // Add points, adjust based on your preference
            scoreCounter.innerText = score;  // Update score display
            winAudio.play();  // Play the win sound if the player wins

        } else {
            loseAudio.play();  // Play the lose sound if the player loses
        }
},300);

}

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        correctAudio.play();
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                
                
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        incorrectAudio.play();
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.png`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if(wrongGuessCount=== maxGuesses) return gameOver(false);
    if(correctLetters.length=== currentWord.length) return gameOver(true);

};

for (let i = 97; i < 123; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);

    // Add event listener for the button click
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

// Initialize the game with a random word
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
