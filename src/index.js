import { createWord } from "./word_creator";
import { openForm, closeForm, showDropDown } from "./dom_stuff";
import { Game, randomWord } from "./game";

export let allWords = [
  // {
  //   dutch: "moelijk",
  //   english: "difficult",
  // },
  // {
  //   dutch: "mooi",
  //   english: "nice",
  // },
  // {
  //   dutch: "vrouw",
  //   english: "woman",
  // },
  // {
  //   dutch: "aantrekkelijk",
  //   english: "atractive",
  // },
  // {
  //   dutch: "vrede",
  //   english: "peace",
  // },
  // {
  //   dutch: "regenachtig",
  //   english: "rainy",
  // },
  // {
  //   dutch: "wisselvalig",
  //   english: "changeable",
  // },
];

let game = new Game(allWords);

let addForm = document.querySelector(".form-container");
let dropBtn = document.querySelector(".dropbtn");
let addWord = document.querySelector(".add_word");
let cancelBtn = document.getElementById("btnCancel");
let addBtn = document.getElementById("btnAdd");
let playBtn = document.getElementById("playBtn");
let inputAnswer = document.getElementById("input_answer");

playBtn.addEventListener("click", function () {
  if (allWords.length !== 0) {
    game.selectRandom(allWords);
  }
  console.log(allWords);
});

dropBtn.addEventListener("click", showDropDown);

addWord.addEventListener("click", openForm);

cancelBtn.addEventListener("click", closeForm);

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    createWord(allWords);
    addForm.reset();
  }
});

inputAnswer.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && allWords.length !== 0 && randomWord !== undefined) {
    game.compare(inputAnswer);
    game.selectRandom(allWords);
    inputAnswer.value = "";
  }
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
