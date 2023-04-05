class Hangman {
  constructor(words) {
    this.words = words;
    this.secretWord = this.pickWord();
    this.letters = [];
    this.guessedLetters = '';
    this.errorsLeft = 10;
  }

  pickWord() {
    let randomIndex = Math.floor(Math.random() * this.words.length);
    return this.words[randomIndex];
  }

  checkIfLetter(keyCode) {
    if (keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  }

  checkClickedLetters(letter) {
    if (this.letters.includes(letter) || this.guessedLetters.includes(letter)) {
      return false;
    } else {
      return true;
    }
  }

  addCorrectLetter(letter) {
    this.guessedLetters += letter;
  }

  addWrongLetter(letter) {
    if (!this.secretWord.includes(letter) && this.checkClickedLetters(letter)) {
      this.errorsLeft -= 1;
      this.letters.push(letter);
    }
  }

  checkGameOver() {
    if (this.errorsLeft > 0) {
      return false;
    } else {
      return true;
    }
  }

  checkWinner() {
    let secretWordArr = this.secretWord.split('').sort();
    let guessedLettersArr = this.guessedLetters.split('').sort();

    if (secretWordArr.toString() === guessedLettersArr.toString()) {
      return true;
    } else {
      return false;
    }
  }
}

let hangman;

const startGameButton = document.getElementById('start-game-button');

if (startGameButton) {
  startGameButton.addEventListener('click', (event) => {
    hangman = new Hangman([
      'node',
      'javascript',
      'react',
      'miami',
      'paris',
      'amsterdam',
      'lisboa',
    ]);

    // HINT (uncomment when start working on the canvas portion of the lab)
    hangman.secretWord = hangman.pickWord();
    hangmanCanvas = new HangmanCanvas(hangman.secretWord);
    hangmanCanvas.createBoard();
    console.log(hangman.secretWord);
  });
}

document.addEventListener('keydown', (event) => {
  if (!hangman.checkWinner() && !hangman.checkGameOver()) {
    let letterTry = event.key;
    if (
      hangman.checkIfLetter(event.keyCode) &&
      hangman.checkClickedLetters(letterTry)
    ) {
      if (hangman.secretWord.includes(letterTry)) {
        for (let i = 0; i < hangman.secretWord.length; i++) {
          if (letterTry === hangman.secretWord[i]) {
            hangman.addCorrectLetter(letterTry);
            hangmanCanvas.writeCorrectLetter(letterTry, i);
          }
        }
        if (hangman.checkWinner()) {
          hangmanCanvas.winner();
        }
      } else {
        hangman.addWrongLetter(letterTry);
        hangmanCanvas.writeWrongLetter(letterTry, hangman.errorsLeft);
        if (hangman.checkGameOver()) {
          hangmanCanvas.gameOver();
        }
      }
    }
  }
});
