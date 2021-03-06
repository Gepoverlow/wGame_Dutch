import { addScoreDb, decreaseScoreDb, isSignedIn } from "./index";
import { Word } from "./word_creator";

let inputAnswer = document.getElementById("input_answer");
let scoreDom = document.querySelector(".score");
let answerInfo = document.getElementById("answer-info");

export class Game {
  constructor(gameArray, currentScore) {
    this.gameArray = gameArray;
    this.currentScore = currentScore;
    this.isPlaying = true;
  }

  startGame(array, htmlElementC, gameType, startHtmlElement) {
    this.gameArray = [...array];
    this.currentScore = 0;
    this.updateScore(htmlElementC);
    this.gameType = gameType;
    this.gameLength = this.gameArray.length;

    answerInfo.style.display = "none";
    startHtmlElement.classList.add("hidden");
    inputAnswer.classList.remove("hidden");
    scoreDom.style.display = "flex";
  }

  compareWords(input, result, correct, inputed, last) {
    answerInfo.style.display === "none"
      ? (answerInfo.style.display = "flex")
      : null;
    if (this.gameArray[0].natWord === input.value) {
      this.addValue();
      this.addPointToScore();
      this.displayCorrectInfo(result, correct, inputed, input, last);
    } else {
      this.removeValue();
      this.displayWrongInfo(result, correct, inputed, input, last);
    }
  }

  displayCorrectInfo(result, correct, inputx, input, last) {
    this.refreshResult(result);
    this.addCorrectIcon(result);

    correct.textContent = `Correct Word: ${this.gameArray[0].natWord}`;
    correct.className = "correct-info";

    inputx.textContent = `Your Answer: ${input.value}`;
    inputx.className = "correct-info";

    last.textContent = `Last Word: ${this.gameArray[0].nedWord} (${this.gameArray[0].wType})`;
  }

  displayWrongInfo(result, correct, inputx, input, last) {
    this.refreshResult(result);
    this.addWrongIcon(result);

    correct.textContent = `Correct Word: ${this.gameArray[0].natWord}`;
    correct.className = "wrong-info";

    inputx.textContent = `Your Answer: ${input.value}`;
    inputx.className = "wrong-info";

    last.textContent = `Last Word: ${this.gameArray[0].nedWord} (${this.gameArray[0].wType})`;
  }

  displayCorrectAnswer() {
    return `Correct Answer ->  ${this.gameArray[0].natWord}`;
  }

  nextWord(wordType, currentWord, remainingWords) {
    wordType.textContent = `${this.gameArray[0].wType}`;
    currentWord.textContent = !this.gameArray[0].wArticle.includes("-")
      ? `${this.gameArray[0].wArticle} ${this.gameArray[0].nedWord}`
      : `${this.gameArray[0].nedWord}`;
    remainingWords.textContent = `/ ${this.remainingWords()} words`;
  }

  addPointToScore() {
    return this.currentScore++;
  }

  updateScore(htmlElementC) {
    htmlElementC.textContent = this.currentScore;
  }

  // checkForHiscore() {
  //   if (this.currentScore >= this.hiScore) {
  //     this.hiScore = this.currentScore;
  //   }
  // }

  addValue() {
    return isSignedIn
      ? addScoreDb(this.gameArray[0].nedWord)
      : this.gameArray[0].value++;
  }

  removeValue() {
    return isSignedIn
      ? decreaseScoreDb(this.gameArray[0].nedWord)
      : this.gameArray[0].value--;
  }

  removeFirstObject() {
    return this.gameArray.shift();
  }

  randomizeArray() {
    return this.gameArray.sort((a, b) => 0.5 - Math.random());
  }
  updateLocalStorage(name) {
    return localStorage.setItem(name, JSON.stringify(this.hiScore));
  }

  remainingWords() {
    return this.gameArray.length.toString();
  }

  addCorrectIcon(htmlElement) {
    let iconC = document.createElement("span");
    iconC.textContent = "check";
    iconC.classList.add("material-icons-outlined");
    iconC.style.color = "green";
    htmlElement.textContent = "Result: ";
    htmlElement.appendChild(iconC);
  }

  addWrongIcon(htmlElement) {
    let iconW = document.createElement("span");
    iconW.textContent = "clear";
    iconW.classList.add("material-icons-outlined");
    iconW.style.color = "red";
    htmlElement.textContent = "Result: ";
    htmlElement.appendChild(iconW);
  }

  refreshResult(result) {
    result.textContent = "";
  }

  calculateSuccess(length, score) {
    if (score === 0) {
      return `0 %`;
    } else {
      return `${Math.round((score / length) * 100)} %`;
    }
  }
}
