class HangmanCanvas {
  constructor(secretWord) {
    this.context = document.getElementById('hangman').getContext('2d');
    this.secretWord = secretWord;
    this.win = new Image();
    this.win.src = 'images/awesome.png';
    this.lost = new Image();
    this.lost.src = 'images/gameover.png';
  }

  createBoard() {
    this.context.clearRect(0, 0, 1200, 800);
    this.drawLines();
  }

  drawLines() {
    this.context.beginPath();
    for (let i = 0; i < this.secretWord.length; i++) {
      this.context.moveTo(50 * i + 60, 55);
      this.context.lineTo(50 * i + 95, 55);
    }
    this.context.stroke();
  }

  writeCorrectLetter(letter, index) {
    this.context.font = '40px arial';
    this.context.textAlign = 'center';
    this.context.fillText(letter.toUpperCase(), 50 * index + 75, 50, 50);
  }

  writeWrongLetter(letter, errorsLeft) {
    this.context.font = '40px arial';
    this.context.textAlign = 'center';
    this.context.fillText(
      letter.toUpperCase(),
      50 * hangman.letters.length,
      480,
      50
    );
    this.drawHangman(errorsLeft);
  }

  drawHangman(errorsLeft) {
    switch (errorsLeft) {
      case 9:
        this.context.beginPath();
        this.context.moveTo(50, 440);
        this.context.lineTo(250, 440);
        this.context.lineTo(150, 400);
        this.context.closePath();
        this.context.stroke();
        break;
      case 8:
        this.context.beginPath();
        this.context.moveTo(150, 400);
        this.context.lineTo(150, 100);
        this.context.stroke();
        break;
      case 7:
        this.context.beginPath();
        this.context.moveTo(150, 100);
        this.context.lineTo(450, 100);
        this.context.stroke();
        break;
      case 6:
        this.context.beginPath();
        this.context.moveTo(450, 100);
        this.context.lineTo(450, 150);
        this.context.stroke();
        break;
      case 5:
        this.context.beginPath();
        this.context.arc(450, 170, 20, 0, Math.PI * 2);
        this.context.stroke();
        break;
      case 4:
        this.context.beginPath();
        this.context.moveTo(450, 190);
        this.context.lineTo(450, 310);
        this.context.stroke();
        break;
      case 3:
        this.context.beginPath();
        this.context.moveTo(450, 230);
        this.context.lineTo(480, 230);
        this.context.stroke();
        break;
      case 2:
        this.context.beginPath();
        this.context.moveTo(450, 230);
        this.context.lineTo(420, 230);
        this.context.stroke();
        break;
      case 1:
        this.context.beginPath();
        this.context.moveTo(450, 310);
        this.context.lineTo(470, 350);
        this.context.stroke();
        break;
      case 0:
        this.context.beginPath();
        this.context.moveTo(450, 310);
        this.context.lineTo(430, 350);
        this.context.stroke();
        break;
      default:
        break;
    }
  }

  gameOver() {
    this.context.drawImage(this.lost, 0, 0, 570, 240, 550, 150, 570, 240);
  }

  winner() {
    this.context.drawImage(this.win, 0, 0, 872, 618, 550, 50, 570, 404);
  }
}
