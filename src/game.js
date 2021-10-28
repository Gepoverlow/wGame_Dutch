// export let randomWord = undefined;

// let wordOnScreen = document.getElementById("wordOnScreen");

// export class Game {
//   constructor(wordsArray) {
//     this.wordsArray = wordsArray;
//   }
//   compare(input) {
//     if (randomWord.natWord === input.value) {
//       return console.log("yh");
//     } else {
//       return console.log("nh");
//     }
//   }

//   selectRandom(wordsArray) {
//     randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
//     wordOnScreen.textContent = randomWord.nedWord;
//     return randomWord;
//   }

//   remove() {}
// }

export class Game {
  constructor(initialArray, correctArray, wrongArray) {
    this.initialArray = initialArray;
    this.correctArray = correctArray;
    this.wrongArray = wrongArray;
  }

  compareWords(input) {
    if (this.initialArray[0].natWord === input.value) {
      this.addValue();
      this.addToCorrectArray();
    } else {
      this.removeValue();
      this.addToWrongArray();
    }
  }

  nextWord(htmlElement) {
    htmlElement.textContent = this.initialArray[0].nedWord;
  }

  addValue() {
    this.initialArray[0].value++;
  }

  removeValue() {
    this.initialArray[0].value--;
  }

  removeFirstObject() {
    return this.initialArray.shift();
  }

  addToCorrectArray() {
    return this.correctArray.push(this.removeFirstObject());
  }

  addToWrongArray() {
    return this.wrongArray.push(this.removeFirstObject());
  }
  randomizeArray() {
    return this.initialArray.sort((a, b) => 0.5 - Math.random());
  }
}
