import { createWord, printWordInfo, submitEdit } from "./word_creator";
import {
  openForm,
  closeForm,
  showDropDown,
  renderGameInfo,
  renderWords,
} from "./dom_stuff";
import { Game } from "./game";

let allWords = getStorageData("wordsArray");

let gameArray = [];
let correctArray = [];
let wrongArray = [];

let game = new Game(
  gameArray,
  correctArray,
  wrongArray,
  0,
  getStorageData("hiScore")
);

let containerBody = document.querySelector(".container_body");
let addForm = document.querySelector(".form_container");
let dropBtn = document.querySelector(".dropbtn");
let addWord = document.querySelector(".add_word");

let addBtn = document.getElementById("btnAdd_add");
// let editBtn = document.getElementById("btnAdd_edit");

let cancelBtnAdd = document.getElementById("btnCancel_add");
let cancelBtnEdit = document.getElementById("btnCancel_edit");

let playBtn = document.getElementById("playBtn");
let inputAnswer = document.getElementById("input_answer");
let wordOnScreen = document.getElementById("wordOnScreen");
let currentScoreValue = document.getElementById("current_score_value");
let hiScoreValue = document.getElementById("high_score_value");
let listBtn = document.getElementById("seeWordsBtn");

let myFormAdd = document.getElementById("myForm_add");
let editForm = document.getElementById("myForm_edit");

let searchBar = document.getElementById("searchBar");

hiScoreValue.textContent = game.hiScore;

let indexx = undefined;

containerBody.addEventListener("click", function (e) {
  if (e.target.parentNode.className === "row") {
    indexx = e.target.parentNode.rowIndex - 1;
    printWordInfo(allWords, indexx);
    openForm(editForm);
  }

  if (e.target.id === "btnAdd_edit") {
    e.preventDefault();
    submitEdit(allWords, indexx);
    addToLocalStorage("wordsArray", allWords);
    renderWords(allWords, containerBody);
    closeForm(editForm);
  }
});

playBtn.addEventListener("click", function () {
  renderGameInfo();
  game.startGame(allWords, currentScoreValue, hiScoreValue);
  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen);
  }
});

listBtn.addEventListener("click", function () {
  renderWords(allWords, containerBody);
});

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    createWord(allWords);
    addToLocalStorage("wordsArray", allWords);
    addForm.reset();
    renderWords(allWords);
  }
});

inputAnswer.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && game.gameArray.length !== 0) {
    game.compareWords(inputAnswer);
    game.updateScore(currentScoreValue, hiScoreValue);
    game.updateLocalStorage("hiScore");
    addToLocalStorage("wordsArray", allWords);
    if (game.gameArray.length !== 0) {
      game.nextWord(wordOnScreen);
    } else {
      wordOnScreen.textContent = "DONE!";
    }
    inputAnswer.value = "";
  }
});

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filteredWords = allWords.filter((word) => {
    return (
      word.nedWord.includes(searchString) || word.natWord.includes(searchString)
    );
  });
  renderWords(filteredWords);
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

dropBtn.addEventListener("click", showDropDown);

addWord.addEventListener("click", function () {
  openForm(myFormAdd);
});

cancelBtnAdd.addEventListener("click", function () {
  closeForm(myFormAdd);
});

cancelBtnEdit.addEventListener("click", function () {
  closeForm(editForm);
});

function addToLocalStorage(name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
}

function getStorageData(name) {
  return JSON.parse(localStorage.getItem(name) || "[]");
}

function findIndex(arr, target) {
  let pos = arr
    .map(function (e) {
      return e.id;
    })
    .indexOf(parseInt(target));
  return pos;
}
