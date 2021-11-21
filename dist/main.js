/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom_stuff.js":
/*!**************************!*\
  !*** ./src/dom_stuff.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openForm": () => (/* binding */ openForm),
/* harmony export */   "closeForm": () => (/* binding */ closeForm),
/* harmony export */   "showDropDown": () => (/* binding */ showDropDown),
/* harmony export */   "renderWords": () => (/* binding */ renderWords),
/* harmony export */   "renderGameInfo": () => (/* binding */ renderGameInfo),
/* harmony export */   "renderGameRules": () => (/* binding */ renderGameRules)
/* harmony export */ });
let containerBody = document.querySelector(".container_body");
let addForm = document.getElementById("myForm_add");
let editForm = document.getElementById("myForm_edit");
let containerGame = document.getElementById("container_game");

let headers = [
  "Type",
  "DE/HET",
  "Word",
  "Your Meaning",
  "score",
  "Woordensboek Meaning",
];

function openForm(htmlElement) {
  htmlElement.style.display = "block";
}

function closeForm(htmlElement) {
  htmlElement.style.display = "none";
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

function renderWords(arr) {
  emptyNode(containerBody);

  let tableWrapper = document.createElement("div");
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");
  tableWrapper.id = "tableWrapper";
  table.id = "wordsTable";

  headers.forEach((headerText) => {
    let header = document.createElement("th");
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  arr.forEach((word) => {
    let row = document.createElement("tr");
    row.id = word.nedWord;
    let link = document.createElement("a");
    link.text = "Search";
    link.href = createWordLink(word);
    link.target = "_blank";
    Object.values(word).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
      cell.appendChild(link);
    });

    row.classList.add("row");
    table.appendChild(row);

    if (word.value < 0) {
      row.classList.add("negativeScore");
    } else if (word.value > 0) {
      row.classList.add("positiveScore");
    }
  });

  tableWrapper.appendChild(table);
  containerBody.appendChild(tableWrapper);
}

function renderGameInfo() {
  emptyNode(containerBody);
  containerBody.appendChild(containerGame);
}

function renderGameRules() {
  emptyNode(containerBody);

  let rulesTitle = document.createElement("h1");
  rulesTitle.textContent = "Rules & General Info";
  rulesTitle.style.fontSize = "30px";
  containerBody.appendChild(rulesTitle);

  let rulesUL = document.createElement("ul");
  rulesUL.textContent = "Some Rules";
  rulesUL.style.fontSize = "20px";
  containerBody.appendChild(rulesUL);

  ruleCreator("First add as many words you want.", rulesUL);
  ruleCreator(
    "Then head to MENU -> Play All Words to start a new game with all the words you added.",
    rulesUL
  );
  ruleCreator(
    "The game consists on matching the Dutch Word with your own Meaning. PAS OP! Pronunciation counts.",
    rulesUL
  );
  ruleCreator(
    "Correct answers will earn you a point, while incorrect will not.",
    rulesUL
  );
  ruleCreator(
    "As you play through, depending on wether the answer was correct or not, each individual word will be gaining or loosing a value/score.",
    rulesUL
  );
  ruleCreator(
    "You can play this mode as many times you want, with how many words you want. The more words you add the better!",
    rulesUL
  );
  ruleCreator(
    "The second mode, Play Wrong Words, lets you practice on the words you are less strong (or have negative value/score)",
    rulesUL
  );

  let infoUL = document.createElement("ul");
  infoUL.textContent = "Some Info";
  infoUL.style.fontSize = "20px";
  containerBody.appendChild(infoUL);

  ruleCreator(
    "All words that you create will be stored on the localStorage of the browser you created them with.",
    infoUL
  );

  ruleCreator(
    "Because the data is stored on your own browser storage, try and don't delete it by going into browser settings/history/data etc.",
    infoUL
  );

  ruleCreator(
    "Within the List you can click each element and Edit/Delete its contents in case you made a mistake or wish to change the meaning of it.",
    infoUL
  );

  ruleCreator(
    "Because the List might get too long, you can use the Search feature to filter through all words!",
    infoUL
  );
  ruleCreator("Click on Hiscore to reset the number back to 0.", infoUL);
}

function emptyNode(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
  containerBody.appendChild(addForm);
  containerBody.appendChild(editForm);
}

function createWordLink(word) {
  return `https://www.woorden.org/woord/${word.nedWord}`;
}

function ruleCreator(info, parentNode) {
  let rule = document.createElement("li");
  parentNode.appendChild(rule);
  rule.textContent = info;
}

// function createId() {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
//   const length = 5;
//   let randomStr = "";

//   for (let i = 0; i < length; i++) {
//     const randomNum = Math.floor(Math.random() * characters.length);
//     randomStr += characters[randomNum];
//   }
//   return randomStr;
// }


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
class Game {
  constructor(gameArray, currentScore, hiScore) {
    this.gameArray = gameArray;
    this.currentScore = currentScore;
    this.hiScore = hiScore;
  }

  startGame(array, htmlElementC, htmlElementH) {
    this.gameArray = [...array];
    this.currentScore = 0;
    this.updateScore(htmlElementC, htmlElementH);
  }

  compareWords(input, htmlElement) {
    if (this.gameArray[0].natWord === input.value) {
      this.addValue();
      this.addPointToScore();
      htmlElement.textContent = `Correct! ${this.displayCorrectAnswer()} Your Answer -> ${
        input.value
      }`;
      this.addCorrectIcon(htmlElement);
    } else {
      this.removeValue();
      htmlElement.textContent = `Wrong! ${this.displayCorrectAnswer()} Your Answer -> ${
        input.value
      }`;
      this.addWrongIcon(htmlElement);
    }
  }

  displayCorrectAnswer() {
    return `Correct Answer ->  ${this.gameArray[0].natWord}`;
  }

  nextWord(htmlElement, htmlElement0) {
    htmlElement.textContent = `${this.gameArray[0].nedWord}`;
    htmlElement0.textContent = `/${this.remainingWords()} words`;
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
    return this.gameArray[0].value++;
  }

  removeValue() {
    return this.gameArray[0].value--;
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
    iconC.style.fontSize = "55px";
    htmlElement.appendChild(iconC);
  }

  addWrongIcon(htmlElement) {
    let iconW = document.createElement("span");
    iconW.textContent = "clear";
    iconW.classList.add("material-icons-outlined");
    iconW.style.color = "red";
    iconW.style.fontSize = "55px";
    htmlElement.appendChild(iconW);
  }
}

// function addToLocalStorage(name, objKey) {
//   localStorage.setItem(name, JSON.stringify(objKey));
// }


/***/ }),

/***/ "./src/word_creator.js":
/*!*****************************!*\
  !*** ./src/word_creator.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createWord": () => (/* binding */ createWord),
/* harmony export */   "deleteWord": () => (/* binding */ deleteWord),
/* harmony export */   "printWordInfo": () => (/* binding */ printWordInfo),
/* harmony export */   "submitEdit": () => (/* binding */ submitEdit)
/* harmony export */ });
let typeOfWord = document.getElementById("typeOfWord_edit");
let deOfHet = document.getElementById("deOfHet_edit");
let dWordInput = document.getElementById("dutchWord_input_edit");
let nWordInput = document.getElementById("nativeWord_input_edit");

class Word {
  constructor(wType, wArticle, nedWord, natWord, value, link) {
    this.wType = wType;
    this.wArticle = wArticle;
    this.nedWord = nedWord;
    this.natWord = natWord;
    this.value = value;
    this.link = link;
  }
}

function createWord(arr) {
  let typeOfWord = document.getElementById("typeOfWord_add").value;
  let deOfHet = document.getElementById("deOfHet_add").value;
  let dWordInput = document.getElementById("dutchWord_input_add").value;
  let nWordInput = document.getElementById("nativeWord_input_add").value;
  //
  let newWord = new Word(
    typeOfWord,
    deOfHet,
    dWordInput,
    nWordInput,
    0,
    "Meaning in Woorden - > "
  );
  //
  if (arr.some((e) => e.nedWord === `${dWordInput}`)) {
    alert("word is already here");
  } else {
    arr.push(newWord);
  }
}

function deleteWord(array, index) {
  return array.splice(index, 1);
}

function printWordInfo(array, index) {
  typeOfWord.value = array[index].wType;
  deOfHet.value = array[index].wArticle;
  dWordInput.value = array[index].nedWord;
  nWordInput.value = array[index].natWord;
}

function submitEdit(array, index, input) {
  array[index].wType = typeOfWord.value;
  array[index].wArticle = deOfHet.value;
  array[index].nedWord = dWordInput.value;
  array[index].natWord = nWordInput.value;

  // if (array.some((e) => e.nedWord === input.value)) {
  //   alert("word is already here");
  // } else {
  //   array[index].wType = typeOfWord.value;
  //   array[index].wArticle = deOfHet.value;
  //   array[index].nedWord = dWordInput.value;
  //   array[index].natWord = nWordInput.value;
  // }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _word_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./word_creator */ "./src/word_creator.js");
/* harmony import */ var _dom_stuff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom_stuff */ "./src/dom_stuff.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game.js");




let allWords = getStorageData("wordsArray");

let gameArray = [];

let game = new _game__WEBPACK_IMPORTED_MODULE_2__.Game(gameArray, 0, getStorageData("hiScore"));

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
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.printWordInfo)(allWords, index);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm)(myFormEdit);
  }

  if (e.target.id === "btnAdd_edit") {
    if (
      editForm.childNodes[5].value !== "" &&
      editForm.childNodes[9].value !== ""
    ) {
      (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.submitEdit)(allWords, index, editForm.childNodes[5]);
      addToLocalStorage("wordsArray", allWords);
      (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords, containerBody);
      (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(myFormEdit);
    } else {
      alert("cant edit a word to empty fields!");
    }
  }
});

playBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();
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
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();
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
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();
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
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();
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

listBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords, containerBody);
});

resetBtn.addEventListener("click", () => {
  allWords.forEach((word) => {
    word.value = 0;
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords, containerBody);
    addToLocalStorage("wordsArray", allWords);
  });
  console.log(allWords);
});

instructionsBtn.addEventListener("click", () => {
  console.log("testing");
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameRules)();
});

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.createWord)(allWords);
    addToLocalStorage("wordsArray", allWords);
    addForm.reset();
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords);
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
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(filteredWords);
});

deleteWordBtn.addEventListener("click", (e) => {
  if (e.target.id === "delete_word") {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.deleteWord)(allWords, index);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords);
    addToLocalStorage("wordsArray", allWords);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(myFormEdit);
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

dropBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.showDropDown);

addWordBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm)(myFormAdd);
});

cancelBtnAdd.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(myFormAdd);
});

cancelBtnEdit.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(myFormEdit);
});

function addToLocalStorage(name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
}

function getStorageData(name) {
  return JSON.parse(localStorage.getItem(name) || "[]");
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsMERBQWM7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsRUFBRSx1REFBVztBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBVztBQUNmO0FBQ0EsR0FBRztBQUNIO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSwyREFBZTtBQUNqQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQVU7QUFDZDtBQUNBO0FBQ0EsSUFBSSx1REFBVztBQUNmO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFLHVEQUFXO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFVO0FBQ2QsSUFBSSx1REFBVztBQUNmO0FBQ0EsSUFBSSxxREFBUztBQUNiO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGtDQUFrQyxvREFBWTs7QUFFOUM7QUFDQSxFQUFFLG9EQUFRO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9kb21fc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL3dvcmRfY3JlYXRvci5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xubGV0IGFkZEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9lZGl0XCIpO1xubGV0IGNvbnRhaW5lckdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lcl9nYW1lXCIpO1xuXG5sZXQgaGVhZGVycyA9IFtcbiAgXCJUeXBlXCIsXG4gIFwiREUvSEVUXCIsXG4gIFwiV29yZFwiLFxuICBcIllvdXIgTWVhbmluZ1wiLFxuICBcInNjb3JlXCIsXG4gIFwiV29vcmRlbnNib2VrIE1lYW5pbmdcIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuRm9ybShodG1sRWxlbWVudCkge1xuICBodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VGb3JtKGh0bWxFbGVtZW50KSB7XG4gIGh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuLyogV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJ1dHRvbixcbnRvZ2dsZSBiZXR3ZWVuIGhpZGluZyBhbmQgc2hvd2luZyB0aGUgZHJvcGRvd24gY29udGVudCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dEcm9wRG93bigpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteURyb3Bkb3duXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyV29yZHMoYXJyKSB7XG4gIGVtcHR5Tm9kZShjb250YWluZXJCb2R5KTtcblxuICBsZXQgdGFibGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBsZXQgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICB0YWJsZVdyYXBwZXIuaWQgPSBcInRhYmxlV3JhcHBlclwiO1xuICB0YWJsZS5pZCA9IFwid29yZHNUYWJsZVwiO1xuXG4gIGhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyVGV4dCkgPT4ge1xuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgbGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGVhZGVyVGV4dCk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgfSk7XG4gIHRhYmxlLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG5cbiAgYXJyLmZvckVhY2goKHdvcmQpID0+IHtcbiAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHJvdy5pZCA9IHdvcmQubmVkV29yZDtcbiAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGxpbmsudGV4dCA9IFwiU2VhcmNoXCI7XG4gICAgbGluay5ocmVmID0gY3JlYXRlV29yZExpbmsod29yZCk7XG4gICAgbGluay50YXJnZXQgPSBcIl9ibGFua1wiO1xuICAgIE9iamVjdC52YWx1ZXMod29yZCkuZm9yRWFjaCgodGV4dCkgPT4ge1xuICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9KTtcblxuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XG5cbiAgICBpZiAod29yZC52YWx1ZSA8IDApIHtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwibmVnYXRpdmVTY29yZVwiKTtcbiAgICB9IGVsc2UgaWYgKHdvcmQudmFsdWUgPiAwKSB7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZChcInBvc2l0aXZlU2NvcmVcIik7XG4gICAgfVxuICB9KTtcblxuICB0YWJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKHRhYmxlV3JhcHBlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJHYW1lSW5mbygpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckdhbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyR2FtZVJ1bGVzKCkge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG5cbiAgbGV0IHJ1bGVzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHJ1bGVzVGl0bGUudGV4dENvbnRlbnQgPSBcIlJ1bGVzICYgR2VuZXJhbCBJbmZvXCI7XG4gIHJ1bGVzVGl0bGUuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChydWxlc1RpdGxlKTtcblxuICBsZXQgcnVsZXNVTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgcnVsZXNVTC50ZXh0Q29udGVudCA9IFwiU29tZSBSdWxlc1wiO1xuICBydWxlc1VMLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQocnVsZXNVTCk7XG5cbiAgcnVsZUNyZWF0b3IoXCJGaXJzdCBhZGQgYXMgbWFueSB3b3JkcyB5b3Ugd2FudC5cIiwgcnVsZXNVTCk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiVGhlbiBoZWFkIHRvIE1FTlUgLT4gUGxheSBBbGwgV29yZHMgdG8gc3RhcnQgYSBuZXcgZ2FtZSB3aXRoIGFsbCB0aGUgd29yZHMgeW91IGFkZGVkLlwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJUaGUgZ2FtZSBjb25zaXN0cyBvbiBtYXRjaGluZyB0aGUgRHV0Y2ggV29yZCB3aXRoIHlvdXIgb3duIE1lYW5pbmcuIFBBUyBPUCEgUHJvbnVuY2lhdGlvbiBjb3VudHMuXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIkNvcnJlY3QgYW5zd2VycyB3aWxsIGVhcm4geW91IGEgcG9pbnQsIHdoaWxlIGluY29ycmVjdCB3aWxsIG5vdC5cIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQXMgeW91IHBsYXkgdGhyb3VnaCwgZGVwZW5kaW5nIG9uIHdldGhlciB0aGUgYW5zd2VyIHdhcyBjb3JyZWN0IG9yIG5vdCwgZWFjaCBpbmRpdmlkdWFsIHdvcmQgd2lsbCBiZSBnYWluaW5nIG9yIGxvb3NpbmcgYSB2YWx1ZS9zY29yZS5cIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiWW91IGNhbiBwbGF5IHRoaXMgbW9kZSBhcyBtYW55IHRpbWVzIHlvdSB3YW50LCB3aXRoIGhvdyBtYW55IHdvcmRzIHlvdSB3YW50LiBUaGUgbW9yZSB3b3JkcyB5b3UgYWRkIHRoZSBiZXR0ZXIhXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIlRoZSBzZWNvbmQgbW9kZSwgUGxheSBXcm9uZyBXb3JkcywgbGV0cyB5b3UgcHJhY3RpY2Ugb24gdGhlIHdvcmRzIHlvdSBhcmUgbGVzcyBzdHJvbmcgKG9yIGhhdmUgbmVnYXRpdmUgdmFsdWUvc2NvcmUpXCIsXG4gICAgcnVsZXNVTFxuICApO1xuXG4gIGxldCBpbmZvVUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIGluZm9VTC50ZXh0Q29udGVudCA9IFwiU29tZSBJbmZvXCI7XG4gIGluZm9VTC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGluZm9VTCk7XG5cbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJBbGwgd29yZHMgdGhhdCB5b3UgY3JlYXRlIHdpbGwgYmUgc3RvcmVkIG9uIHRoZSBsb2NhbFN0b3JhZ2Ugb2YgdGhlIGJyb3dzZXIgeW91IGNyZWF0ZWQgdGhlbSB3aXRoLlwiLFxuICAgIGluZm9VTFxuICApO1xuXG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQmVjYXVzZSB0aGUgZGF0YSBpcyBzdG9yZWQgb24geW91ciBvd24gYnJvd3NlciBzdG9yYWdlLCB0cnkgYW5kIGRvbid0IGRlbGV0ZSBpdCBieSBnb2luZyBpbnRvIGJyb3dzZXIgc2V0dGluZ3MvaGlzdG9yeS9kYXRhIGV0Yy5cIixcbiAgICBpbmZvVUxcbiAgKTtcblxuICBydWxlQ3JlYXRvcihcbiAgICBcIldpdGhpbiB0aGUgTGlzdCB5b3UgY2FuIGNsaWNrIGVhY2ggZWxlbWVudCBhbmQgRWRpdC9EZWxldGUgaXRzIGNvbnRlbnRzIGluIGNhc2UgeW91IG1hZGUgYSBtaXN0YWtlIG9yIHdpc2ggdG8gY2hhbmdlIHRoZSBtZWFuaW5nIG9mIGl0LlwiLFxuICAgIGluZm9VTFxuICApO1xuXG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQmVjYXVzZSB0aGUgTGlzdCBtaWdodCBnZXQgdG9vIGxvbmcsIHlvdSBjYW4gdXNlIHRoZSBTZWFyY2ggZmVhdHVyZSB0byBmaWx0ZXIgdGhyb3VnaCBhbGwgd29yZHMhXCIsXG4gICAgaW5mb1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFwiQ2xpY2sgb24gSGlzY29yZSB0byByZXNldCB0aGUgbnVtYmVyIGJhY2sgdG8gMC5cIiwgaW5mb1VMKTtcbn1cblxuZnVuY3Rpb24gZW1wdHlOb2RlKG5vZGUpIHtcbiAgd2hpbGUgKG5vZGUubGFzdEVsZW1lbnRDaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0RWxlbWVudENoaWxkKTtcbiAgfVxuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGFkZEZvcm0pO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGVkaXRGb3JtKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlV29yZExpbmsod29yZCkge1xuICByZXR1cm4gYGh0dHBzOi8vd3d3Lndvb3JkZW4ub3JnL3dvb3JkLyR7d29yZC5uZWRXb3JkfWA7XG59XG5cbmZ1bmN0aW9uIHJ1bGVDcmVhdG9yKGluZm8sIHBhcmVudE5vZGUpIHtcbiAgbGV0IHJ1bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQocnVsZSk7XG4gIHJ1bGUudGV4dENvbnRlbnQgPSBpbmZvO1xufVxuXG4vLyBmdW5jdGlvbiBjcmVhdGVJZCgpIHtcbi8vICAgY29uc3QgY2hhcmFjdGVycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiO1xuLy8gICBjb25zdCBsZW5ndGggPSA1O1xuLy8gICBsZXQgcmFuZG9tU3RyID0gXCJcIjtcblxuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4vLyAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVycy5sZW5ndGgpO1xuLy8gICAgIHJhbmRvbVN0ciArPSBjaGFyYWN0ZXJzW3JhbmRvbU51bV07XG4vLyAgIH1cbi8vICAgcmV0dXJuIHJhbmRvbVN0cjtcbi8vIH1cbiIsImV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoZ2FtZUFycmF5LCBjdXJyZW50U2NvcmUsIGhpU2NvcmUpIHtcbiAgICB0aGlzLmdhbWVBcnJheSA9IGdhbWVBcnJheTtcbiAgICB0aGlzLmN1cnJlbnRTY29yZSA9IGN1cnJlbnRTY29yZTtcbiAgICB0aGlzLmhpU2NvcmUgPSBoaVNjb3JlO1xuICB9XG5cbiAgc3RhcnRHYW1lKGFycmF5LCBodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gWy4uLmFycmF5XTtcbiAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XG4gICAgdGhpcy51cGRhdGVTY29yZShodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCk7XG4gIH1cblxuICBjb21wYXJlV29yZHMoaW5wdXQsIGh0bWxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZ2FtZUFycmF5WzBdLm5hdFdvcmQgPT09IGlucHV0LnZhbHVlKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFBvaW50VG9TY29yZSgpO1xuICAgICAgaHRtbEVsZW1lbnQudGV4dENvbnRlbnQgPSBgQ29ycmVjdCEgJHt0aGlzLmRpc3BsYXlDb3JyZWN0QW5zd2VyKCl9IFlvdXIgQW5zd2VyIC0+ICR7XG4gICAgICAgIGlucHV0LnZhbHVlXG4gICAgICB9YDtcbiAgICAgIHRoaXMuYWRkQ29ycmVjdEljb24oaHRtbEVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVZhbHVlKCk7XG4gICAgICBodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IGBXcm9uZyEgJHt0aGlzLmRpc3BsYXlDb3JyZWN0QW5zd2VyKCl9IFlvdXIgQW5zd2VyIC0+ICR7XG4gICAgICAgIGlucHV0LnZhbHVlXG4gICAgICB9YDtcbiAgICAgIHRoaXMuYWRkV3JvbmdJY29uKGh0bWxFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5Q29ycmVjdEFuc3dlcigpIHtcbiAgICByZXR1cm4gYENvcnJlY3QgQW5zd2VyIC0+ICAke3RoaXMuZ2FtZUFycmF5WzBdLm5hdFdvcmR9YDtcbiAgfVxuXG4gIG5leHRXb3JkKGh0bWxFbGVtZW50LCBodG1sRWxlbWVudDApIHtcbiAgICBodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IGAke3RoaXMuZ2FtZUFycmF5WzBdLm5lZFdvcmR9YDtcbiAgICBodG1sRWxlbWVudDAudGV4dENvbnRlbnQgPSBgLyR7dGhpcy5yZW1haW5pbmdXb3JkcygpfSB3b3Jkc2A7XG4gIH1cblxuICBhZGRQb2ludFRvU2NvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNjb3JlKys7XG4gIH1cblxuICB1cGRhdGVTY29yZShodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCkge1xuICAgIHRoaXMuY2hlY2tGb3JIaXNjb3JlKCk7XG4gICAgaHRtbEVsZW1lbnRDLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgaHRtbEVsZW1lbnRILnRleHRDb250ZW50ID0gdGhpcy5oaVNjb3JlO1xuICB9XG5cbiAgY2hlY2tGb3JIaXNjb3JlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTY29yZSA+PSB0aGlzLmhpU2NvcmUpIHtcbiAgICAgIHRoaXMuaGlTY29yZSA9IHRoaXMuY3VycmVudFNjb3JlO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheVswXS52YWx1ZSsrO1xuICB9XG5cbiAgcmVtb3ZlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5WzBdLnZhbHVlLS07XG4gIH1cblxuICByZW1vdmVGaXJzdE9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXkuc2hpZnQoKTtcbiAgfVxuXG4gIHJhbmRvbWl6ZUFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zb3J0KChhLCBiKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgfVxuICB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeSh0aGlzLmhpU2NvcmUpKTtcbiAgfVxuXG4gIHJlbWFpbmluZ1dvcmRzKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5sZW5ndGgudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGFkZENvcnJlY3RJY29uKGh0bWxFbGVtZW50KSB7XG4gICAgbGV0IGljb25DID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgaWNvbkMudGV4dENvbnRlbnQgPSBcImNoZWNrXCI7XG4gICAgaWNvbkMuY2xhc3NMaXN0LmFkZChcIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCIpO1xuICAgIGljb25DLnN0eWxlLmNvbG9yID0gXCJncmVlblwiO1xuICAgIGljb25DLnN0eWxlLmZvbnRTaXplID0gXCI1NXB4XCI7XG4gICAgaHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbkMpO1xuICB9XG5cbiAgYWRkV3JvbmdJY29uKGh0bWxFbGVtZW50KSB7XG4gICAgbGV0IGljb25XID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgaWNvblcudGV4dENvbnRlbnQgPSBcImNsZWFyXCI7XG4gICAgaWNvblcuY2xhc3NMaXN0LmFkZChcIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCIpO1xuICAgIGljb25XLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICBpY29uVy5zdHlsZS5mb250U2l6ZSA9IFwiNTVweFwiO1xuICAgIGh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGljb25XKTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShuYW1lLCBvYmpLZXkpIHtcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkob2JqS2V5KSk7XG4vLyB9XG4iLCJsZXQgdHlwZU9mV29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZU9mV29yZF9lZGl0XCIpO1xubGV0IGRlT2ZIZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlT2ZIZXRfZWRpdFwiKTtcbmxldCBkV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfZWRpdFwiKTtcbmxldCBuV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXRpdmVXb3JkX2lucHV0X2VkaXRcIik7XG5cbmNsYXNzIFdvcmQge1xuICBjb25zdHJ1Y3Rvcih3VHlwZSwgd0FydGljbGUsIG5lZFdvcmQsIG5hdFdvcmQsIHZhbHVlLCBsaW5rKSB7XG4gICAgdGhpcy53VHlwZSA9IHdUeXBlO1xuICAgIHRoaXMud0FydGljbGUgPSB3QXJ0aWNsZTtcbiAgICB0aGlzLm5lZFdvcmQgPSBuZWRXb3JkO1xuICAgIHRoaXMubmF0V29yZCA9IG5hdFdvcmQ7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMubGluayA9IGxpbms7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmQoYXJyKSB7XG4gIGxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkX2FkZFwiKS52YWx1ZTtcbiAgbGV0IGRlT2ZIZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlT2ZIZXRfYWRkXCIpLnZhbHVlO1xuICBsZXQgZFdvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHV0Y2hXb3JkX2lucHV0X2FkZFwiKS52YWx1ZTtcbiAgbGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRfYWRkXCIpLnZhbHVlO1xuICAvL1xuICBsZXQgbmV3V29yZCA9IG5ldyBXb3JkKFxuICAgIHR5cGVPZldvcmQsXG4gICAgZGVPZkhldCxcbiAgICBkV29yZElucHV0LFxuICAgIG5Xb3JkSW5wdXQsXG4gICAgMCxcbiAgICBcIk1lYW5pbmcgaW4gV29vcmRlbiAtID4gXCJcbiAgKTtcbiAgLy9cbiAgaWYgKGFyci5zb21lKChlKSA9PiBlLm5lZFdvcmQgPT09IGAke2RXb3JkSW5wdXR9YCkpIHtcbiAgICBhbGVydChcIndvcmQgaXMgYWxyZWFkeSBoZXJlXCIpO1xuICB9IGVsc2Uge1xuICAgIGFyci5wdXNoKG5ld1dvcmQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVXb3JkKGFycmF5LCBpbmRleCkge1xuICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50V29yZEluZm8oYXJyYXksIGluZGV4KSB7XG4gIHR5cGVPZldvcmQudmFsdWUgPSBhcnJheVtpbmRleF0ud1R5cGU7XG4gIGRlT2ZIZXQudmFsdWUgPSBhcnJheVtpbmRleF0ud0FydGljbGU7XG4gIGRXb3JkSW5wdXQudmFsdWUgPSBhcnJheVtpbmRleF0ubmVkV29yZDtcbiAgbldvcmRJbnB1dC52YWx1ZSA9IGFycmF5W2luZGV4XS5uYXRXb3JkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0RWRpdChhcnJheSwgaW5kZXgsIGlucHV0KSB7XG4gIGFycmF5W2luZGV4XS53VHlwZSA9IHR5cGVPZldvcmQudmFsdWU7XG4gIGFycmF5W2luZGV4XS53QXJ0aWNsZSA9IGRlT2ZIZXQudmFsdWU7XG4gIGFycmF5W2luZGV4XS5uZWRXb3JkID0gZFdvcmRJbnB1dC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLm5hdFdvcmQgPSBuV29yZElucHV0LnZhbHVlO1xuXG4gIC8vIGlmIChhcnJheS5zb21lKChlKSA9PiBlLm5lZFdvcmQgPT09IGlucHV0LnZhbHVlKSkge1xuICAvLyAgIGFsZXJ0KFwid29yZCBpcyBhbHJlYWR5IGhlcmVcIik7XG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgYXJyYXlbaW5kZXhdLndUeXBlID0gdHlwZU9mV29yZC52YWx1ZTtcbiAgLy8gICBhcnJheVtpbmRleF0ud0FydGljbGUgPSBkZU9mSGV0LnZhbHVlO1xuICAvLyAgIGFycmF5W2luZGV4XS5uZWRXb3JkID0gZFdvcmRJbnB1dC52YWx1ZTtcbiAgLy8gICBhcnJheVtpbmRleF0ubmF0V29yZCA9IG5Xb3JkSW5wdXQudmFsdWU7XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgY3JlYXRlV29yZCxcbiAgcHJpbnRXb3JkSW5mbyxcbiAgZGVsZXRlV29yZCxcbiAgc3VibWl0RWRpdCxcbn0gZnJvbSBcIi4vd29yZF9jcmVhdG9yXCI7XG5pbXBvcnQge1xuICBvcGVuRm9ybSxcbiAgY2xvc2VGb3JtLFxuICBzaG93RHJvcERvd24sXG4gIHJlbmRlckdhbWVJbmZvLFxuICByZW5kZXJXb3JkcyxcbiAgcmVuZGVyR2FtZVJ1bGVzLFxufSBmcm9tIFwiLi9kb21fc3R1ZmZcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmxldCBhbGxXb3JkcyA9IGdldFN0b3JhZ2VEYXRhKFwid29yZHNBcnJheVwiKTtcblxubGV0IGdhbWVBcnJheSA9IFtdO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGdhbWVBcnJheSwgMCwgZ2V0U3RvcmFnZURhdGEoXCJoaVNjb3JlXCIpKTtcblxubGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xuXG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9jb250YWluZXJfYWRkXCIpO1xubGV0IGVkaXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2NvbnRhaW5lcl9lZGl0XCIpO1xuXG5sZXQgZHJvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGJ0blwiKTtcblxubGV0IGFkZFdvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF93b3JkXCIpO1xubGV0IGRlbGV0ZVdvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZV93b3JkXCIpO1xuXG5sZXQgYWRkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5BZGRfYWRkXCIpO1xuXG5sZXQgY2FuY2VsQnRuQWRkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5DYW5jZWxfYWRkXCIpO1xubGV0IGNhbmNlbEJ0bkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbF9lZGl0XCIpO1xuXG5sZXQgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ0blwiKTtcbmxldCBwbGF5QnRuXyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ0bl9cIik7XG5sZXQgd29yZHNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlXb3Jkc1wiKTtcbmxldCBwcmVwb3NpdGlvbnNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlQcmVwb3NpdGlvbnNcIik7XG5sZXQgaW5zdHJ1Y3Rpb25zQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnN0cnVjdGlvbnNcIik7XG5cbmxldCBpbnB1dEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfYW5zd2VyXCIpO1xubGV0IHdvcmRPblNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid29yZE9uU2NyZWVuXCIpO1xubGV0IGN1cnJlbnRTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50X3Njb3JlX3ZhbHVlXCIpO1xubGV0IGhpU2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaF9zY29yZV92YWx1ZVwiKTtcbmxldCBoaVNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoX3Njb3JlXCIpO1xubGV0IGxpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlZVdvcmRzQnRuXCIpO1xubGV0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldFdvcmRzU2NvcmVcIik7XG5cbmxldCBteUZvcm1BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgbXlGb3JtRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5cbmxldCBzZWFyY2hCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJhclwiKTtcbmxldCBjb3JyZWN0QW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3JyZWN0QW5zd2VyXCIpO1xuXG5sZXQgaW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRpY2F0b3JcIik7XG5sZXQgcmVtYWluaW5nV29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbWFpbmluZ193b3Jkc1wiKTtcblxuaGlTY29yZVZhbHVlLnRleHRDb250ZW50ID0gZ2FtZS5oaVNjb3JlO1xuXG5sZXQgaW5kZXggPSB1bmRlZmluZWQ7XG5cbmNvbnRhaW5lckJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3dcIiB8fFxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvdyBwb3NpdGl2ZVNjb3JlXCIgfHxcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3cgbmVnYXRpdmVTY29yZVwiXG4gICkge1xuICAgIGluZGV4ID0gYWxsV29yZHMuZmluZEluZGV4KCh3b3JkKSA9PiB7XG4gICAgICByZXR1cm4gd29yZC5uZWRXb3JkID09PSBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWA7XG4gICAgfSk7XG4gICAgcHJpbnRXb3JkSW5mbyhhbGxXb3JkcywgaW5kZXgpO1xuICAgIG9wZW5Gb3JtKG15Rm9ybUVkaXQpO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImJ0bkFkZF9lZGl0XCIpIHtcbiAgICBpZiAoXG4gICAgICBlZGl0Rm9ybS5jaGlsZE5vZGVzWzVdLnZhbHVlICE9PSBcIlwiICYmXG4gICAgICBlZGl0Rm9ybS5jaGlsZE5vZGVzWzldLnZhbHVlICE9PSBcIlwiXG4gICAgKSB7XG4gICAgICBzdWJtaXRFZGl0KGFsbFdvcmRzLCBpbmRleCwgZWRpdEZvcm0uY2hpbGROb2Rlc1s1XSk7XG4gICAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgICAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xuICAgICAgY2xvc2VGb3JtKG15Rm9ybUVkaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcImNhbnQgZWRpdCBhIHdvcmQgdG8gZW1wdHkgZmllbGRzIVwiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlckdhbWVJbmZvKCk7XG4gIGdhbWUuc3RhcnRHYW1lKGFsbFdvcmRzLCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgY29ycmVjdEFuc3dlci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGluZGljYXRvci50ZXh0Q29udGVudCA9IFwiV29yZCAtPlwiO1xuXG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4sIHJlbWFpbmluZ1dvcmRzKTtcbiAgfSBlbHNlIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkFERCBTT01FIFdPUkRTIEJFRk9SRSBQTEFZSU5HIVwiO1xuICB9XG59KTtcblxucGxheUJ0bl8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcbiAgY29ycmVjdEFuc3dlci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGluZGljYXRvci50ZXh0Q29udGVudCA9IFwiV29yZCAtPlwiO1xuXG4gIGxldCBhbGxOZWdhdGl2ZVdvcmRzQXJyYXkgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+IHdvcmQudmFsdWUgPCAwKTtcbiAgZ2FtZS5zdGFydEdhbWUoYWxsTmVnYXRpdmVXb3Jkc0FycmF5LCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcblxuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuLCByZW1haW5pbmdXb3Jkcyk7XG4gIH0gZWxzZSBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCIwIE5FR0FUSVZFIFNDT1JFIFdPUkRTIVwiO1xuICB9XG59KTtcblxud29yZHNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcbiAgY29ycmVjdEFuc3dlci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGluZGljYXRvci50ZXh0Q29udGVudCA9IFwiV29yZCAtPlwiO1xuXG4gIGxldCBhbGxXb29yZGVuc2NoYXRBcnJheSA9IGFsbFdvcmRzLmZpbHRlcihcbiAgICAod29yZCkgPT4gIXdvcmQubmVkV29yZC5pbmNsdWRlcyhcIkFSVElDTEVcIilcbiAgKTtcblxuICBnYW1lLnN0YXJ0R2FtZShhbGxXb29yZGVuc2NoYXRBcnJheSwgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG5cbiAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgIGdhbWUucmFuZG9taXplQXJyYXkoKTtcbiAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbiwgcmVtYWluaW5nV29yZHMpO1xuICB9IGVsc2UgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiMCBXT09SREVOU0NIQVQgTEVGVCFcIjtcbiAgfVxufSk7XG5cbnByZXBvc2l0aW9uc0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZW5kZXJHYW1lSW5mbygpO1xuICBjb3JyZWN0QW5zd2VyLnRleHRDb250ZW50ID0gXCJcIjtcbiAgaW5kaWNhdG9yLnRleHRDb250ZW50ID0gXCJXb3JkIC0+XCI7XG5cbiAgbGV0IGFsbFByZXBvc2l0aW9uc0FycmF5ID0gYWxsV29yZHMuZmlsdGVyKCh3b3JkKSA9PlxuICAgIHdvcmQubmVkV29yZC5pbmNsdWRlcyhcIkFSVElDTEVcIilcbiAgKTtcblxuICBnYW1lLnN0YXJ0R2FtZShhbGxQcmVwb3NpdGlvbnNBcnJheSwgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG5cbiAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgIGdhbWUucmFuZG9taXplQXJyYXkoKTtcbiAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbiwgcmVtYWluaW5nV29yZHMpO1xuICB9IGVsc2UgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiMCBQUkVQT1NJVElPTlMgTEVGVCFcIjtcbiAgfVxufSk7XG5cbmxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xufSk7XG5cbnJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFsbFdvcmRzLmZvckVhY2goKHdvcmQpID0+IHtcbiAgICB3b3JkLnZhbHVlID0gMDtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3JkcywgY29udGFpbmVyQm9keSk7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGFsbFdvcmRzKTtcbn0pO1xuXG5pbnN0cnVjdGlvbnNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJ0ZXN0aW5nXCIpO1xuICByZW5kZXJHYW1lUnVsZXMoKTtcbn0pO1xuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChhZGRGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVXb3JkKGFsbFdvcmRzKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGFkZEZvcm0ucmVzZXQoKTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3Jkcyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfYWRkXCIpLmZvY3VzKCk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIsIGNvcnJlY3RBbnN3ZXIpO1xuICAgIGdhbWUucmVtb3ZlRmlyc3RPYmplY3QoKTtcbiAgICBnYW1lLnVwZGF0ZVNjb3JlKGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICAgIGdhbWUudXBkYXRlTG9jYWxTdG9yYWdlKFwiaGlTY29yZVwiKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuLCByZW1haW5pbmdXb3Jkcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiRE9ORSFcIjtcbiAgICAgIHJlbWFpbmluZ1dvcmRzLnRleHRDb250ZW50ID0gXCIvMCB3b3Jkc1wiO1xuICAgIH1cbiAgICBpbnB1dEFuc3dlci52YWx1ZSA9IFwiXCI7XG4gIH1cbn0pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNlYXJjaFN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkV29yZHMgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgd29yZC5uZWRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKSB8fFxuICAgICAgd29yZC5uYXRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKVxuICAgICk7XG4gIH0pO1xuICByZW5kZXJXb3JkcyhmaWx0ZXJlZFdvcmRzKTtcbn0pO1xuXG5kZWxldGVXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiZGVsZXRlX3dvcmRcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkZWxldGVXb3JkKGFsbFdvcmRzLCBpbmRleCk7XG4gICAgcmVuZGVyV29yZHMoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgY2xvc2VGb3JtKG15Rm9ybUVkaXQpO1xuICB9XG59KTtcblxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGJ0blwiKSkge1xuICAgIGxldCBkcm9wZG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd25fY29udGVudFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wZW5Ecm9wZG93biA9IGRyb3Bkb3duc1tpXTtcbiAgICAgIGlmIChvcGVuRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5oaVNjb3JlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGdhbWUuaGlTY29yZSA9IDA7XG4gIGhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcbiAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xufSk7XG5cbmRyb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dEcm9wRG93bik7XG5cbmFkZFdvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgb3BlbkZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xvc2VGb3JtKG15Rm9ybUFkZCk7XG59KTtcblxuY2FuY2VsQnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0obXlGb3JtRWRpdCk7XG59KTtcblxuZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgYXJyKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGFycikpO1xufVxuXG5mdW5jdGlvbiBnZXRTdG9yYWdlRGF0YShuYW1lKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpIHx8IFwiW11cIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=