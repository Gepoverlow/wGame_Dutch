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
    wordOnScreen.textContent = "0 NEGATIVE SCORE WORDS!";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHVEQUFXO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVEQUFXO0FBQ2Y7QUFDQSxHQUFHO0FBQ0g7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxFQUFFLDJEQUFlO0FBQ2pCLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBVTtBQUNkO0FBQ0E7QUFDQSxJQUFJLHVEQUFXO0FBQ2Y7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUUsdURBQVc7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQVU7QUFDZCxJQUFJLHVEQUFXO0FBQ2Y7QUFDQSxJQUFJLHFEQUFTO0FBQ2I7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsa0NBQWtDLG9EQUFZOztBQUU5QztBQUNBLEVBQUUsb0RBQVE7QUFDVixDQUFDOztBQUVEO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2RvbV9zdHVmZi5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvd29yZF9jcmVhdG9yLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2FkZFwiKTtcbmxldCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5sZXQgY29udGFpbmVyR2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyX2dhbWVcIik7XG5cbmxldCBoZWFkZXJzID0gW1xuICBcIlR5cGVcIixcbiAgXCJERS9IRVRcIixcbiAgXCJXb3JkXCIsXG4gIFwiWW91ciBNZWFuaW5nXCIsXG4gIFwic2NvcmVcIixcbiAgXCJXb29yZGVuc2JvZWsgTWVhbmluZ1wiLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Gb3JtKGh0bWxFbGVtZW50KSB7XG4gIGh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUZvcm0oaHRtbEVsZW1lbnQpIHtcbiAgaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vKiBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLFxudG9nZ2xlIGJldHdlZW4gaGlkaW5nIGFuZCBzaG93aW5nIHRoZSBkcm9wZG93biBjb250ZW50ICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Ryb3BEb3duKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RHJvcGRvd25cIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXb3JkcyhhcnIpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuXG4gIGxldCB0YWJsZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRhYmxlV3JhcHBlci5pZCA9IFwidGFibGVXcmFwcGVyXCI7XG4gIHRhYmxlLmlkID0gXCJ3b3Jkc1RhYmxlXCI7XG5cbiAgaGVhZGVycy5mb3JFYWNoKChoZWFkZXJUZXh0KSA9PiB7XG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoZWFkZXJUZXh0KTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICB9KTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcblxuICBhcnIuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgcm93LmlkID0gd29yZC5uZWRXb3JkO1xuICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgbGluay50ZXh0ID0gXCJTZWFyY2hcIjtcbiAgICBsaW5rLmhyZWYgPSBjcmVhdGVXb3JkTGluayh3b3JkKTtcbiAgICBsaW5rLnRhcmdldCA9IFwiX2JsYW5rXCI7XG4gICAgT2JqZWN0LnZhbHVlcyh3b3JkKS5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICBjZWxsLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0pO1xuXG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcblxuICAgIGlmICh3b3JkLnZhbHVlIDwgMCkge1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoXCJuZWdhdGl2ZVNjb3JlXCIpO1xuICAgIH0gZWxzZSBpZiAod29yZC52YWx1ZSA+IDApIHtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicG9zaXRpdmVTY29yZVwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIHRhYmxlV3JhcHBlci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQodGFibGVXcmFwcGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdhbWVJbmZvKCkge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyR2FtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJHYW1lUnVsZXMoKSB7XG4gIGVtcHR5Tm9kZShjb250YWluZXJCb2R5KTtcblxuICBsZXQgcnVsZXNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgcnVsZXNUaXRsZS50ZXh0Q29udGVudCA9IFwiUnVsZXMgJiBHZW5lcmFsIEluZm9cIjtcbiAgcnVsZXNUaXRsZS5zdHlsZS5mb250U2l6ZSA9IFwiMzBweFwiO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKHJ1bGVzVGl0bGUpO1xuXG4gIGxldCBydWxlc1VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICBydWxlc1VMLnRleHRDb250ZW50ID0gXCJTb21lIFJ1bGVzXCI7XG4gIHJ1bGVzVUwuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChydWxlc1VMKTtcblxuICBydWxlQ3JlYXRvcihcIkZpcnN0IGFkZCBhcyBtYW55IHdvcmRzIHlvdSB3YW50LlwiLCBydWxlc1VMKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJUaGVuIGhlYWQgdG8gTUVOVSAtPiBQbGF5IEFsbCBXb3JkcyB0byBzdGFydCBhIG5ldyBnYW1lIHdpdGggYWxsIHRoZSB3b3JkcyB5b3UgYWRkZWQuXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIlRoZSBnYW1lIGNvbnNpc3RzIG9uIG1hdGNoaW5nIHRoZSBEdXRjaCBXb3JkIHdpdGggeW91ciBvd24gTWVhbmluZy4gUEFTIE9QISBQcm9udW5jaWF0aW9uIGNvdW50cy5cIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQ29ycmVjdCBhbnN3ZXJzIHdpbGwgZWFybiB5b3UgYSBwb2ludCwgd2hpbGUgaW5jb3JyZWN0IHdpbGwgbm90LlwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJBcyB5b3UgcGxheSB0aHJvdWdoLCBkZXBlbmRpbmcgb24gd2V0aGVyIHRoZSBhbnN3ZXIgd2FzIGNvcnJlY3Qgb3Igbm90LCBlYWNoIGluZGl2aWR1YWwgd29yZCB3aWxsIGJlIGdhaW5pbmcgb3IgbG9vc2luZyBhIHZhbHVlL3Njb3JlLlwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJZb3UgY2FuIHBsYXkgdGhpcyBtb2RlIGFzIG1hbnkgdGltZXMgeW91IHdhbnQsIHdpdGggaG93IG1hbnkgd29yZHMgeW91IHdhbnQuIFRoZSBtb3JlIHdvcmRzIHlvdSBhZGQgdGhlIGJldHRlciFcIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiVGhlIHNlY29uZCBtb2RlLCBQbGF5IFdyb25nIFdvcmRzLCBsZXRzIHlvdSBwcmFjdGljZSBvbiB0aGUgd29yZHMgeW91IGFyZSBsZXNzIHN0cm9uZyAob3IgaGF2ZSBuZWdhdGl2ZSB2YWx1ZS9zY29yZSlcIixcbiAgICBydWxlc1VMXG4gICk7XG5cbiAgbGV0IGluZm9VTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgaW5mb1VMLnRleHRDb250ZW50ID0gXCJTb21lIEluZm9cIjtcbiAgaW5mb1VMLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoaW5mb1VMKTtcblxuICBydWxlQ3JlYXRvcihcbiAgICBcIkFsbCB3b3JkcyB0aGF0IHlvdSBjcmVhdGUgd2lsbCBiZSBzdG9yZWQgb24gdGhlIGxvY2FsU3RvcmFnZSBvZiB0aGUgYnJvd3NlciB5b3UgY3JlYXRlZCB0aGVtIHdpdGguXCIsXG4gICAgaW5mb1VMXG4gICk7XG5cbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJCZWNhdXNlIHRoZSBkYXRhIGlzIHN0b3JlZCBvbiB5b3VyIG93biBicm93c2VyIHN0b3JhZ2UsIHRyeSBhbmQgZG9uJ3QgZGVsZXRlIGl0IGJ5IGdvaW5nIGludG8gYnJvd3NlciBzZXR0aW5ncy9oaXN0b3J5L2RhdGEgZXRjLlwiLFxuICAgIGluZm9VTFxuICApO1xuXG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiV2l0aGluIHRoZSBMaXN0IHlvdSBjYW4gY2xpY2sgZWFjaCBlbGVtZW50IGFuZCBFZGl0L0RlbGV0ZSBpdHMgY29udGVudHMgaW4gY2FzZSB5b3UgbWFkZSBhIG1pc3Rha2Ugb3Igd2lzaCB0byBjaGFuZ2UgdGhlIG1lYW5pbmcgb2YgaXQuXCIsXG4gICAgaW5mb1VMXG4gICk7XG5cbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJCZWNhdXNlIHRoZSBMaXN0IG1pZ2h0IGdldCB0b28gbG9uZywgeW91IGNhbiB1c2UgdGhlIFNlYXJjaCBmZWF0dXJlIHRvIGZpbHRlciB0aHJvdWdoIGFsbCB3b3JkcyFcIixcbiAgICBpbmZvVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXCJDbGljayBvbiBIaXNjb3JlIHRvIHJlc2V0IHRoZSBudW1iZXIgYmFjayB0byAwLlwiLCBpbmZvVUwpO1xufVxuXG5mdW5jdGlvbiBlbXB0eU5vZGUobm9kZSkge1xuICB3aGlsZSAobm9kZS5sYXN0RWxlbWVudENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RFbGVtZW50Q2hpbGQpO1xuICB9XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoYWRkRm9ybSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoZWRpdEZvcm0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVXb3JkTGluayh3b3JkKSB7XG4gIHJldHVybiBgaHR0cHM6Ly93d3cud29vcmRlbi5vcmcvd29vcmQvJHt3b3JkLm5lZFdvcmR9YDtcbn1cblxuZnVuY3Rpb24gcnVsZUNyZWF0b3IoaW5mbywgcGFyZW50Tm9kZSkge1xuICBsZXQgcnVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChydWxlKTtcbiAgcnVsZS50ZXh0Q29udGVudCA9IGluZm87XG59XG5cbi8vIGZ1bmN0aW9uIGNyZWF0ZUlkKCkge1xuLy8gICBjb25zdCBjaGFyYWN0ZXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XG4vLyAgIGNvbnN0IGxlbmd0aCA9IDU7XG4vLyAgIGxldCByYW5kb21TdHIgPSBcIlwiO1xuXG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbi8vICAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCk7XG4vLyAgICAgcmFuZG9tU3RyICs9IGNoYXJhY3RlcnNbcmFuZG9tTnVtXTtcbi8vICAgfVxuLy8gICByZXR1cm4gcmFuZG9tU3RyO1xuLy8gfVxuIiwiZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihnYW1lQXJyYXksIGN1cnJlbnRTY29yZSwgaGlTY29yZSkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gZ2FtZUFycmF5O1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gY3VycmVudFNjb3JlO1xuICAgIHRoaXMuaGlTY29yZSA9IGhpU2NvcmU7XG4gIH1cblxuICBzdGFydEdhbWUoYXJyYXksIGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5nYW1lQXJyYXkgPSBbLi4uYXJyYXldO1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKTtcbiAgfVxuXG4gIGNvbXBhcmVXb3JkcyhpbnB1dCwgaHRtbEVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5nYW1lQXJyYXlbMF0ubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgIHRoaXMuYWRkVmFsdWUoKTtcbiAgICAgIHRoaXMuYWRkUG9pbnRUb1Njb3JlKCk7XG4gICAgICBodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IGBDb3JyZWN0ISAke3RoaXMuZGlzcGxheUNvcnJlY3RBbnN3ZXIoKX0gWW91ciBBbnN3ZXIgLT4gJHtcbiAgICAgICAgaW5wdXQudmFsdWVcbiAgICAgIH1gO1xuICAgICAgdGhpcy5hZGRDb3JyZWN0SWNvbihodG1sRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlVmFsdWUoKTtcbiAgICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gYFdyb25nISAke3RoaXMuZGlzcGxheUNvcnJlY3RBbnN3ZXIoKX0gWW91ciBBbnN3ZXIgLT4gJHtcbiAgICAgICAgaW5wdXQudmFsdWVcbiAgICAgIH1gO1xuICAgICAgdGhpcy5hZGRXcm9uZ0ljb24oaHRtbEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BsYXlDb3JyZWN0QW5zd2VyKCkge1xuICAgIHJldHVybiBgQ29ycmVjdCBBbnN3ZXIgLT4gICR7dGhpcy5nYW1lQXJyYXlbMF0ubmF0V29yZH1gO1xuICB9XG5cbiAgbmV4dFdvcmQoaHRtbEVsZW1lbnQsIGh0bWxFbGVtZW50MCkge1xuICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gYCR7dGhpcy5nYW1lQXJyYXlbMF0ubmVkV29yZH1gO1xuICAgIGh0bWxFbGVtZW50MC50ZXh0Q29udGVudCA9IGAvJHt0aGlzLnJlbWFpbmluZ1dvcmRzKCl9IHdvcmRzYDtcbiAgfVxuXG4gIGFkZFBvaW50VG9TY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmUrKztcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5jaGVja0Zvckhpc2NvcmUoKTtcbiAgICBodG1sRWxlbWVudEMudGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICBodG1sRWxlbWVudEgudGV4dENvbnRlbnQgPSB0aGlzLmhpU2NvcmU7XG4gIH1cblxuICBjaGVja0Zvckhpc2NvcmUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNjb3JlID49IHRoaXMuaGlTY29yZSkge1xuICAgICAgdGhpcy5oaVNjb3JlID0gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgfVxuICB9XG5cbiAgYWRkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5WzBdLnZhbHVlKys7XG4gIH1cblxuICByZW1vdmVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUtLTtcbiAgfVxuXG4gIHJlbW92ZUZpcnN0T2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zaGlmdCgpO1xuICB9XG5cbiAgcmFuZG9taXplQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNvcnQoKGEsIGIpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICB9XG4gIHVwZGF0ZUxvY2FsU3RvcmFnZShuYW1lKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KHRoaXMuaGlTY29yZSkpO1xuICB9XG5cbiAgcmVtYWluaW5nV29yZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5Lmxlbmd0aC50b1N0cmluZygpO1xuICB9XG5cbiAgYWRkQ29ycmVjdEljb24oaHRtbEVsZW1lbnQpIHtcbiAgICBsZXQgaWNvbkMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBpY29uQy50ZXh0Q29udGVudCA9IFwiY2hlY2tcIjtcbiAgICBpY29uQy5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIik7XG4gICAgaWNvbkMuc3R5bGUuY29sb3IgPSBcImdyZWVuXCI7XG4gICAgaWNvbkMuc3R5bGUuZm9udFNpemUgPSBcIjU1cHhcIjtcbiAgICBodG1sRWxlbWVudC5hcHBlbmRDaGlsZChpY29uQyk7XG4gIH1cblxuICBhZGRXcm9uZ0ljb24oaHRtbEVsZW1lbnQpIHtcbiAgICBsZXQgaWNvblcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBpY29uVy50ZXh0Q29udGVudCA9IFwiY2xlYXJcIjtcbiAgICBpY29uVy5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIik7XG4gICAgaWNvblcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgIGljb25XLnN0eWxlLmZvbnRTaXplID0gXCI1NXB4XCI7XG4gICAgaHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvblcpO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIGFkZFRvTG9jYWxTdG9yYWdlKG5hbWUsIG9iaktleSkge1xuLy8gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShvYmpLZXkpKTtcbi8vIH1cbiIsImxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkX2VkaXRcIik7XG5sZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldF9lZGl0XCIpO1xubGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9lZGl0XCIpO1xubGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRfZWRpdFwiKTtcblxuY2xhc3MgV29yZCB7XG4gIGNvbnN0cnVjdG9yKHdUeXBlLCB3QXJ0aWNsZSwgbmVkV29yZCwgbmF0V29yZCwgdmFsdWUsIGxpbmspIHtcbiAgICB0aGlzLndUeXBlID0gd1R5cGU7XG4gICAgdGhpcy53QXJ0aWNsZSA9IHdBcnRpY2xlO1xuICAgIHRoaXMubmVkV29yZCA9IG5lZFdvcmQ7XG4gICAgdGhpcy5uYXRXb3JkID0gbmF0V29yZDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5saW5rID0gbGluaztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yZChhcnIpIHtcbiAgbGV0IHR5cGVPZldvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cGVPZldvcmRfYWRkXCIpLnZhbHVlO1xuICBsZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldF9hZGRcIikudmFsdWU7XG4gIGxldCBkV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfYWRkXCIpLnZhbHVlO1xuICBsZXQgbldvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF0aXZlV29yZF9pbnB1dF9hZGRcIikudmFsdWU7XG4gIC8vXG4gIGxldCBuZXdXb3JkID0gbmV3IFdvcmQoXG4gICAgdHlwZU9mV29yZCxcbiAgICBkZU9mSGV0LFxuICAgIGRXb3JkSW5wdXQsXG4gICAgbldvcmRJbnB1dCxcbiAgICAwLFxuICAgIFwiTWVhbmluZyBpbiBXb29yZGVuIC0gPiBcIlxuICApO1xuICAvL1xuICBpZiAoYXJyLnNvbWUoKGUpID0+IGUubmVkV29yZCA9PT0gYCR7ZFdvcmRJbnB1dH1gKSkge1xuICAgIGFsZXJ0KFwid29yZCBpcyBhbHJlYWR5IGhlcmVcIik7XG4gIH0gZWxzZSB7XG4gICAgYXJyLnB1c2gobmV3V29yZCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVdvcmQoYXJyYXksIGluZGV4KSB7XG4gIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRXb3JkSW5mbyhhcnJheSwgaW5kZXgpIHtcbiAgdHlwZU9mV29yZC52YWx1ZSA9IGFycmF5W2luZGV4XS53VHlwZTtcbiAgZGVPZkhldC52YWx1ZSA9IGFycmF5W2luZGV4XS53QXJ0aWNsZTtcbiAgZFdvcmRJbnB1dC52YWx1ZSA9IGFycmF5W2luZGV4XS5uZWRXb3JkO1xuICBuV29yZElucHV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLm5hdFdvcmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRFZGl0KGFycmF5LCBpbmRleCwgaW5wdXQpIHtcbiAgYXJyYXlbaW5kZXhdLndUeXBlID0gdHlwZU9mV29yZC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLndBcnRpY2xlID0gZGVPZkhldC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLm5lZFdvcmQgPSBkV29yZElucHV0LnZhbHVlO1xuICBhcnJheVtpbmRleF0ubmF0V29yZCA9IG5Xb3JkSW5wdXQudmFsdWU7XG5cbiAgLy8gaWYgKGFycmF5LnNvbWUoKGUpID0+IGUubmVkV29yZCA9PT0gaW5wdXQudmFsdWUpKSB7XG4gIC8vICAgYWxlcnQoXCJ3b3JkIGlzIGFscmVhZHkgaGVyZVwiKTtcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICBhcnJheVtpbmRleF0ud1R5cGUgPSB0eXBlT2ZXb3JkLnZhbHVlO1xuICAvLyAgIGFycmF5W2luZGV4XS53QXJ0aWNsZSA9IGRlT2ZIZXQudmFsdWU7XG4gIC8vICAgYXJyYXlbaW5kZXhdLm5lZFdvcmQgPSBkV29yZElucHV0LnZhbHVlO1xuICAvLyAgIGFycmF5W2luZGV4XS5uYXRXb3JkID0gbldvcmRJbnB1dC52YWx1ZTtcbiAgLy8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBjcmVhdGVXb3JkLFxuICBwcmludFdvcmRJbmZvLFxuICBkZWxldGVXb3JkLFxuICBzdWJtaXRFZGl0LFxufSBmcm9tIFwiLi93b3JkX2NyZWF0b3JcIjtcbmltcG9ydCB7XG4gIG9wZW5Gb3JtLFxuICBjbG9zZUZvcm0sXG4gIHNob3dEcm9wRG93bixcbiAgcmVuZGVyR2FtZUluZm8sXG4gIHJlbmRlcldvcmRzLFxuICByZW5kZXJHYW1lUnVsZXMsXG59IGZyb20gXCIuL2RvbV9zdHVmZlwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcblxubGV0IGFsbFdvcmRzID0gZ2V0U3RvcmFnZURhdGEoXCJ3b3Jkc0FycmF5XCIpO1xuXG5sZXQgZ2FtZUFycmF5ID0gW107XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZUFycmF5LCAwLCBnZXRTdG9yYWdlRGF0YShcImhpU2NvcmVcIikpO1xuXG5sZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5cbmxldCBhZGRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2NvbnRhaW5lcl9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1fY29udGFpbmVyX2VkaXRcIik7XG5cbmxldCBkcm9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wYnRuXCIpO1xuXG5sZXQgYWRkV29yZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX3dvcmRcIik7XG5sZXQgZGVsZXRlV29yZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlX3dvcmRcIik7XG5cbmxldCBhZGRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkFkZF9hZGRcIik7XG5cbmxldCBjYW5jZWxCdG5BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbF9hZGRcIik7XG5sZXQgY2FuY2VsQnRuRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQ2FuY2VsX2VkaXRcIik7XG5cbmxldCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnRuXCIpO1xubGV0IHBsYXlCdG5fID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnRuX1wiKTtcbmxldCBwcmVwb3NpdGlvbnNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlQcmVwb3NpdGlvbnNcIik7XG5sZXQgaW5zdHJ1Y3Rpb25zQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnN0cnVjdGlvbnNcIik7XG5cbmxldCBpbnB1dEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfYW5zd2VyXCIpO1xubGV0IHdvcmRPblNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid29yZE9uU2NyZWVuXCIpO1xubGV0IGN1cnJlbnRTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50X3Njb3JlX3ZhbHVlXCIpO1xubGV0IGhpU2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaF9zY29yZV92YWx1ZVwiKTtcbmxldCBoaVNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoX3Njb3JlXCIpO1xubGV0IGxpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlZVdvcmRzQnRuXCIpO1xubGV0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldFdvcmRzU2NvcmVcIik7XG5cbmxldCBteUZvcm1BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgbXlGb3JtRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5cbmxldCBzZWFyY2hCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJhclwiKTtcbmxldCBjb3JyZWN0QW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3JyZWN0QW5zd2VyXCIpO1xuXG5sZXQgaW5kaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbmRpY2F0b3JcIik7XG5sZXQgcmVtYWluaW5nV29yZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlbWFpbmluZ193b3Jkc1wiKTtcblxuaGlTY29yZVZhbHVlLnRleHRDb250ZW50ID0gZ2FtZS5oaVNjb3JlO1xuXG5sZXQgaW5kZXggPSB1bmRlZmluZWQ7XG5cbmNvbnRhaW5lckJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3dcIiB8fFxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvdyBwb3NpdGl2ZVNjb3JlXCIgfHxcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3cgbmVnYXRpdmVTY29yZVwiXG4gICkge1xuICAgIGluZGV4ID0gYWxsV29yZHMuZmluZEluZGV4KCh3b3JkKSA9PiB7XG4gICAgICByZXR1cm4gd29yZC5uZWRXb3JkID09PSBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWA7XG4gICAgfSk7XG4gICAgcHJpbnRXb3JkSW5mbyhhbGxXb3JkcywgaW5kZXgpO1xuICAgIG9wZW5Gb3JtKG15Rm9ybUVkaXQpO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImJ0bkFkZF9lZGl0XCIpIHtcbiAgICBpZiAoXG4gICAgICBlZGl0Rm9ybS5jaGlsZE5vZGVzWzVdLnZhbHVlICE9PSBcIlwiICYmXG4gICAgICBlZGl0Rm9ybS5jaGlsZE5vZGVzWzldLnZhbHVlICE9PSBcIlwiXG4gICAgKSB7XG4gICAgICBzdWJtaXRFZGl0KGFsbFdvcmRzLCBpbmRleCwgZWRpdEZvcm0uY2hpbGROb2Rlc1s1XSk7XG4gICAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgICAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xuICAgICAgY2xvc2VGb3JtKG15Rm9ybUVkaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcImNhbnQgZWRpdCBhIHdvcmQgdG8gZW1wdHkgZmllbGRzIVwiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlckdhbWVJbmZvKCk7XG4gIGdhbWUuc3RhcnRHYW1lKGFsbFdvcmRzLCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgY29ycmVjdEFuc3dlci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGluZGljYXRvci50ZXh0Q29udGVudCA9IFwiV29yZCAtPlwiO1xuXG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4sIHJlbWFpbmluZ1dvcmRzKTtcbiAgfSBlbHNlIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkFERCBTT01FIFdPUkRTIEJFRk9SRSBQTEFZSU5HIVwiO1xuICB9XG59KTtcblxucGxheUJ0bl8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcbiAgY29ycmVjdEFuc3dlci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGluZGljYXRvci50ZXh0Q29udGVudCA9IFwiV29yZCAtPlwiO1xuXG4gIGxldCBhbGxOZWdhdGl2ZVdvcmRzQXJyYXkgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+IHdvcmQudmFsdWUgPCAwKTtcbiAgZ2FtZS5zdGFydEdhbWUoYWxsTmVnYXRpdmVXb3Jkc0FycmF5LCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcblxuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuLCByZW1haW5pbmdXb3Jkcyk7XG4gIH0gZWxzZSBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCIwIE5FR0FUSVZFIFNDT1JFIFdPUkRTIVwiO1xuICB9XG59KTtcblxucHJlcG9zaXRpb25zQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIHJlbmRlckdhbWVJbmZvKCk7XG4gIGNvcnJlY3RBbnN3ZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBpbmRpY2F0b3IudGV4dENvbnRlbnQgPSBcIldvcmQgLT5cIjtcblxuICBsZXQgYWxsUHJlcG9zaXRpb25zQXJyYXkgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+XG4gICAgd29yZC5uZWRXb3JkLmluY2x1ZGVzKFwiQVJUSUNMRVwiKVxuICApO1xuXG4gIGdhbWUuc3RhcnRHYW1lKGFsbFByZXBvc2l0aW9uc0FycmF5LCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcblxuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuLCByZW1haW5pbmdXb3Jkcyk7XG4gIH0gZWxzZSBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoID09PSAwKSB7XG4gICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCIwIE5FR0FUSVZFIFNDT1JFIFdPUkRTIVwiO1xuICB9XG59KTtcblxubGlzdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICByZW5kZXJXb3JkcyhhbGxXb3JkcywgY29udGFpbmVyQm9keSk7XG59KTtcblxucmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgYWxsV29yZHMuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgIHdvcmQudmFsdWUgPSAwO1xuICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzLCBjb250YWluZXJCb2R5KTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICB9KTtcbiAgY29uc29sZS5sb2coYWxsV29yZHMpO1xufSk7XG5cbmluc3RydWN0aW9uc0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBjb25zb2xlLmxvZyhcInRlc3RpbmdcIik7XG4gIHJlbmRlckdhbWVSdWxlcygpO1xufSk7XG5cbmFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGFkZEZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVdvcmQoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgYWRkRm9ybS5yZXNldCgpO1xuICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9hZGRcIikuZm9jdXMoKTtcbiAgfVxufSk7XG5cbmlucHV0QW5zd2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLmNvbXBhcmVXb3JkcyhpbnB1dEFuc3dlciwgY29ycmVjdEFuc3dlcik7XG4gICAgZ2FtZS5yZW1vdmVGaXJzdE9iamVjdCgpO1xuICAgIGdhbWUudXBkYXRlU2NvcmUoY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gICAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4sIHJlbWFpbmluZ1dvcmRzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCJET05FIVwiO1xuICAgICAgcmVtYWluaW5nV29yZHMudGV4dENvbnRlbnQgPSBcIi8wIHdvcmRzXCI7XG4gICAgfVxuICAgIGlucHV0QW5zd2VyLnZhbHVlID0gXCJcIjtcbiAgfVxufSk7XG5cbnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgY29uc3Qgc2VhcmNoU3RyaW5nID0gZS50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZmlsdGVyZWRXb3JkcyA9IGFsbFdvcmRzLmZpbHRlcigod29yZCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICB3b3JkLm5lZFdvcmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcpIHx8XG4gICAgICB3b3JkLm5hdFdvcmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcpXG4gICAgKTtcbiAgfSk7XG4gIHJlbmRlcldvcmRzKGZpbHRlcmVkV29yZHMpO1xufSk7XG5cbmRlbGV0ZVdvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJkZWxldGVfd29yZFwiKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGRlbGV0ZVdvcmQoYWxsV29yZHMsIGluZGV4KTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3Jkcyk7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgICBjbG9zZUZvcm0obXlGb3JtRWRpdCk7XG4gIH1cbn0pO1xuXG4vLyBDbG9zZSB0aGUgZHJvcGRvd24gbWVudSBpZiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBpdFxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5kcm9wYnRuXCIpKSB7XG4gICAgbGV0IGRyb3Bkb3ducyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkcm9wZG93bl9jb250ZW50XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJvcGRvd25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgb3BlbkRyb3Bkb3duID0gZHJvcGRvd25zW2ldO1xuICAgICAgaWYgKG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93XCIpKSB7XG4gICAgICAgIG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmhpU2NvcmUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgZ2FtZS5oaVNjb3JlID0gMDtcbiAgaGlTY29yZVZhbHVlLnRleHRDb250ZW50ID0gZ2FtZS5oaVNjb3JlO1xuICBnYW1lLnVwZGF0ZUxvY2FsU3RvcmFnZShcImhpU2NvcmVcIik7XG59KTtcblxuZHJvcEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd0Ryb3BEb3duKTtcblxuYWRkV29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBvcGVuRm9ybShteUZvcm1BZGQpO1xufSk7XG5cbmNhbmNlbEJ0bkFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5FZGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsb3NlRm9ybShteUZvcm1FZGl0KTtcbn0pO1xuXG5mdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShuYW1lLCBhcnIpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XG59XG5cbmZ1bmN0aW9uIGdldFN0b3JhZ2VEYXRhKG5hbWUpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSkgfHwgXCJbXVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==