import { createWord } from "./word_creator";
import { openForm, closeForm, showDropDown } from "./dom_stuff";
import { Game } from "./game";

let allWords = [];

let initialArray = [];
let correctArray = [];
let wrongArray = [];

let game = new Game(initialArray, correctArray, wrongArray);

let addForm = document.querySelector(".form-container");
let dropBtn = document.querySelector(".dropbtn");
let addWord = document.querySelector(".add_word");
let cancelBtn = document.getElementById("btnCancel");
let addBtn = document.getElementById("btnAdd");
let playBtn = document.getElementById("playBtn");
let inputAnswer = document.getElementById("input_answer");
let wordOnScreen = document.getElementById("wordOnScreen");

playBtn.addEventListener("click", function () {
  if (initialArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen);
  }
});

dropBtn.addEventListener("click", showDropDown);

addWord.addEventListener("click", openForm);

cancelBtn.addEventListener("click", closeForm);

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    createWord(initialArray);
    createWord(allWords);
    addForm.reset();
  }
});

inputAnswer.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && allWords.length !== 0) {
    game.compareWords(inputAnswer);
    if (game.initialArray.length !== 0) {
      game.nextWord(wordOnScreen);
    } else {
      wordOnScreen.textContent = "DONE!";
    }
    inputAnswer.value = "";
  }
  console.log(game);
  console.log(allWords);
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
