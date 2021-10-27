export let randomWord = undefined;

let wordOnScreen = document.getElementById("wordOnScreen");

export class Game {
  constructor(wordsArray) {
    this.wordsArray = wordsArray;
  }
  compare(input) {
    if (randomWord.natWord === input.value) {
      return console.log("yh");
    } else {
      return console.log("nh");
    }
  }

  selectRandom(wordsArray) {
    randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    wordOnScreen.textContent = randomWord.nedWord;
    return randomWord;
  }

  remove() {}
}
