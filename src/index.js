import {
  createWord,
  printWordInfo,
  deleteWord,
  submitEdit,
} from "./word_creator";
import {
  openForm,
  closeForm,
  showDropDown,
  renderGameInfo,
  renderWords,
  renderGameRules,
} from "./dom_stuff";
import { Game } from "./game";

let allWords = getStorageData("wordsArray");

let gameArray = [];

let game = new Game(gameArray, 0, getStorageData("hiScore"));

let containerBody = document.querySelector(".container_body");

let addForm = document.getElementById("form_container_add");
let editForm = document.getElementById("form_container_edit");

let dropBtn = document.querySelector(".dropbtn");

let addWordBtn = document.getElementById("add_word");
let deleteWordBtn = document.getElementById("delete_word");

let addBtn = document.getElementById("btnAdd_add");

let cancelBtnAdd = document.getElementById("btnCancel_add");
let cancelBtnEdit = document.getElementById("btnCancel_edit");

let playBtn = document.getElementById("playBtn");
let playBtn_ = document.getElementById("playBtn_");
let wordsBtn = document.getElementById("playWords");
let prepositionsBtn = document.getElementById("playPrepositions");
let verbsBtn = document.getElementById("playVerbs");
let instructionsBtn = document.getElementById("instructions");

let inputAnswer = document.getElementById("input_answer");
let wordOnScreen = document.getElementById("wordOnScreen");
let currentScoreValue = document.getElementById("current_score_value");
let hiScoreValue = document.getElementById("high_score_value");
let hiScore = document.getElementById("high_score");
let listBtn = document.getElementById("seeWordsBtn");
let resetBtn = document.getElementById("resetWordsScore");

let myFormAdd = document.getElementById("myForm_add");
let myFormEdit = document.getElementById("myForm_edit");

let searchBar = document.getElementById("searchBar");
let correctAnswer = document.getElementById("correctAnswer");

let indicator = document.getElementById("indicator");
let remainingWords = document.getElementById("remaining_words");

hiScoreValue.textContent = game.hiScore;

let index = undefined;

containerBody.addEventListener("click", function (e) {
  if (
    e.target.parentNode.className === "row" ||
    e.target.parentNode.className === "row positiveScore" ||
    e.target.parentNode.className === "row negativeScore"
  ) {
    index = allWords.findIndex((word) => {
      return word.nedWord === `${e.target.parentNode.id}`;
    });
    printWordInfo(allWords, index);
    openForm(myFormEdit);
  }

  if (e.target.id === "btnAdd_edit") {
    if (
      editForm.childNodes[5].value !== "" &&
      editForm.childNodes[9].value !== ""
    ) {
      submitEdit(allWords, index, editForm.childNodes[5]);
      addToLocalStorage("wordsArray", allWords);
      renderWords(allWords, containerBody);
      closeForm(myFormEdit);
    } else {
      alert("cant edit a word to empty fields!");
    }
  }
});

playBtn.addEventListener("click", function () {
  renderGameInfo();
  game.startGame(allWords, currentScoreValue, hiScoreValue);
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "ADD SOME WORDS BEFORE PLAYING!";
  }
});

playBtn_.addEventListener("click", () => {
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allNegativeWordsArray = allWords.filter((word) => word.value < 0);
  game.startGame(allNegativeWordsArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 NEGATIVE SCORE WORDS!";
  }
});

wordsBtn.addEventListener("click", () => {
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allWoordenschatArray = allWords.filter(
    (word) => !word.nedWord.includes("ARTICLE")
  );

  game.startGame(allWoordenschatArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 WOORDENSCHAT LEFT!";
  }
});

prepositionsBtn.addEventListener("click", () => {
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allPrepositionsArray = allWords.filter((word) =>
    word.nedWord.includes("ARTICLE")
  );

  game.startGame(allPrepositionsArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 PREPOSITIONS LEFT!";
  }
});

verbsBtn.addEventListener("click", () => {
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allIVerbsArray = allWords.filter((word) => word.nedWord.includes("IR"));

  game.startGame(allIVerbsArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 VERBS LEFT!";
  }
});

listBtn.addEventListener("click", function () {
  renderWords(allWords, containerBody);
});

resetBtn.addEventListener("click", () => {
  allWords.forEach((word) => {
    word.value = 0;
    renderWords(allWords, containerBody);
    addToLocalStorage("wordsArray", allWords);
  });
  console.log(allWords);
});

instructionsBtn.addEventListener("click", () => {
  console.log("testing");
  renderGameRules();
});

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    createWord(allWords);
    addToLocalStorage("wordsArray", allWords);
    addForm.reset();
    renderWords(allWords);
    document.getElementById("dutchWord_input_add").focus();
  }
});

inputAnswer.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && game.gameArray.length !== 0) {
    game.compareWords(inputAnswer, correctAnswer);
    game.removeFirstObject();
    game.updateScore(currentScoreValue, hiScoreValue);
    game.updateLocalStorage("hiScore");
    addToLocalStorage("wordsArray", allWords);
    if (game.gameArray.length !== 0) {
      game.nextWord(wordOnScreen, remainingWords);
    } else {
      wordOnScreen.textContent = "DONE!";
      remainingWords.textContent = "/0 words";
    }
    inputAnswer.value = "";
  }
});

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredWords = allWords.filter((word) => {
    return (
      word.nedWord.toLowerCase().includes(searchString) ||
      word.natWord.toLowerCase().includes(searchString)
    );
  });
  renderWords(filteredWords);
});

deleteWordBtn.addEventListener("click", (e) => {
  if (e.target.id === "delete_word") {
    e.preventDefault();
    deleteWord(allWords, index);
    renderWords(allWords);
    addToLocalStorage("wordsArray", allWords);
    closeForm(myFormEdit);
  }
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown_content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

hiScore.addEventListener("click", () => {
  game.hiScore = 0;
  hiScoreValue.textContent = game.hiScore;
  game.updateLocalStorage("hiScore");
});

dropBtn.addEventListener("click", showDropDown);

addWordBtn.addEventListener("click", function () {
  openForm(myFormAdd);
});

cancelBtnAdd.addEventListener("click", function () {
  closeForm(myFormAdd);
});

cancelBtnEdit.addEventListener("click", function () {
  closeForm(myFormEdit);
});

function addToLocalStorage(name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
}

function getStorageData(name) {
  return JSON.parse(localStorage.getItem(name) || "[]");
}
