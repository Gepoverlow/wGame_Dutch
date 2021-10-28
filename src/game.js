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
  constructor(initialArray, correctArray, wrongArray, currentScore, hiScore) {
    this.initialArray = initialArray;
    this.correctArray = correctArray;
    this.wrongArray = wrongArray;
    this.currentScore = currentScore;
    this.hiScore = hiScore;
  }

  compareWords(input) {
    if (this.initialArray[0].natWord === input.value) {
      this.addValue();
      this.addPointToScore();
      this.addToCorrectArray();
    } else {
      this.removeValue();
      this.addToWrongArray();
    }
  }

  nextWord(htmlElement) {
    return (htmlElement.textContent = this.initialArray[0].nedWord);
  }

  addPointToScore() {
    return this.currentScore++;
  }

  updateScore(htmlElementC, htmlElementH) {
    this.checkForHiscore();
    htmlElementC.textContent = this.currentScore;
    htmlElementH.textContent = this.hiScore;
  }

  checkForHiscore() {
    if (this.currentScore >= this.hiScore) {
      this.hiScore = this.currentScore;
    }
  }

  addValue() {
    return this.initialArray[0].value++;
  }

  removeValue() {
    return this.initialArray[0].value--;
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
  updateLocalStorage(name) {
    return localStorage.setItem(name, JSON.stringify(this.hiScore));
  }
}

// function addToLocalStorage(name, objKey) {
//   localStorage.setItem(name, JSON.stringify(objKey));
// }
