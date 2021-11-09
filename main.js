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

  nextWord(htmlElement) {
    return (htmlElement.textContent = `${
      this.gameArray[0].nedWord
    }        /${this.remainingWords()}`);
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
  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "ADD SOME WORDS BEFORE PLAYING!";
  }
});

playBtn_.addEventListener("click", () => {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();

  let AllNegativeWordsArray = allWords.filter((word) => word.value < 0);
  game.startGame(AllNegativeWordsArray, currentScoreValue, hiScoreValue);
  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen);
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
      game.nextWord(wordOnScreen);
    } else {
      wordOnScreen.textContent = "DONE!";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQVU7QUFDZDtBQUNBO0FBQ0EsSUFBSSx1REFBVztBQUNmO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRSx1REFBVztBQUNiLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBVTtBQUNkLElBQUksdURBQVc7QUFDZjtBQUNBLElBQUkscURBQVM7QUFDYjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxrQ0FBa0Msb0RBQVk7O0FBRTlDO0FBQ0EsRUFBRSxvREFBUTtBQUNWLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZG9tX3N0dWZmLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy93b3JkX2NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBjb250YWluZXJCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJfYm9keVwiKTtcbmxldCBhZGRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1fYWRkXCIpO1xubGV0IGVkaXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1fZWRpdFwiKTtcbmxldCBjb250YWluZXJHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJfZ2FtZVwiKTtcblxubGV0IGhlYWRlcnMgPSBbXG4gIFwiVHlwZVwiLFxuICBcIkRFL0hFVFwiLFxuICBcIldvcmRcIixcbiAgXCJZb3VyIE1lYW5pbmdcIixcbiAgXCJzY29yZVwiLFxuICBcIldvb3JkZW5zYm9layBNZWFuaW5nXCIsXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkZvcm0oaHRtbEVsZW1lbnQpIHtcbiAgaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlRm9ybShodG1sRWxlbWVudCkge1xuICBodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8qIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBidXR0b24sXG50b2dnbGUgYmV0d2VlbiBoaWRpbmcgYW5kIHNob3dpbmcgdGhlIGRyb3Bkb3duIGNvbnRlbnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RHJvcERvd24oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlEcm9wZG93blwiKS5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldvcmRzKGFycikge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG5cbiAgbGV0IHRhYmxlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgdGFibGVXcmFwcGVyLmlkID0gXCJ0YWJsZVdyYXBwZXJcIjtcbiAgdGFibGUuaWQgPSBcIndvcmRzVGFibGVcIjtcblxuICBoZWFkZXJzLmZvckVhY2goKGhlYWRlclRleHQpID0+IHtcbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhlYWRlclRleHQpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIH0pO1xuICB0YWJsZS5hcHBlbmRDaGlsZChoZWFkZXJSb3cpO1xuXG4gIGFyci5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICByb3cuaWQgPSB3b3JkLm5lZFdvcmQ7XG4gICAgbGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICBsaW5rLnRleHQgPSBcIlNlYXJjaFwiO1xuICAgIGxpbmsuaHJlZiA9IGNyZWF0ZVdvcmRMaW5rKHdvcmQpO1xuICAgIGxpbmsudGFyZ2V0ID0gXCJfYmxhbmtcIjtcbiAgICBPYmplY3QudmFsdWVzKHdvcmQpLmZvckVhY2goKHRleHQpID0+IHtcbiAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgbGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICBjZWxsLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfSk7XG5cbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xuXG4gICAgaWYgKHdvcmQudmFsdWUgPCAwKSB7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZChcIm5lZ2F0aXZlU2NvcmVcIik7XG4gICAgfSBlbHNlIGlmICh3b3JkLnZhbHVlID4gMCkge1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoXCJwb3NpdGl2ZVNjb3JlXCIpO1xuICAgIH1cbiAgfSk7XG5cbiAgdGFibGVXcmFwcGVyLmFwcGVuZENoaWxkKHRhYmxlKTtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZCh0YWJsZVdyYXBwZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyR2FtZUluZm8oKSB7XG4gIGVtcHR5Tm9kZShjb250YWluZXJCb2R5KTtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChjb250YWluZXJHYW1lKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdhbWVSdWxlcygpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuXG4gIGxldCBydWxlc1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICBydWxlc1RpdGxlLnRleHRDb250ZW50ID0gXCJSdWxlcyAmIEdlbmVyYWwgSW5mb1wiO1xuICBydWxlc1RpdGxlLnN0eWxlLmZvbnRTaXplID0gXCIzMHB4XCI7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQocnVsZXNUaXRsZSk7XG5cbiAgbGV0IHJ1bGVzVUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIHJ1bGVzVUwudGV4dENvbnRlbnQgPSBcIlNvbWUgUnVsZXNcIjtcbiAgcnVsZXNVTC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKHJ1bGVzVUwpO1xuXG4gIHJ1bGVDcmVhdG9yKFwiRmlyc3QgYWRkIGFzIG1hbnkgd29yZHMgeW91IHdhbnQuXCIsIHJ1bGVzVUwpO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIlRoZW4gaGVhZCB0byBNRU5VIC0+IFBsYXkgQWxsIFdvcmRzIHRvIHN0YXJ0IGEgbmV3IGdhbWUgd2l0aCBhbGwgdGhlIHdvcmRzIHlvdSBhZGRlZC5cIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiVGhlIGdhbWUgY29uc2lzdHMgb24gbWF0Y2hpbmcgdGhlIER1dGNoIFdvcmQgd2l0aCB5b3VyIG93biBNZWFuaW5nLiBQQVMgT1AhIFByb251bmNpYXRpb24gY291bnRzLlwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJDb3JyZWN0IGFuc3dlcnMgd2lsbCBlYXJuIHlvdSBhIHBvaW50LCB3aGlsZSBpbmNvcnJlY3Qgd2lsbCBub3QuXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIkFzIHlvdSBwbGF5IHRocm91Z2gsIGRlcGVuZGluZyBvbiB3ZXRoZXIgdGhlIGFuc3dlciB3YXMgY29ycmVjdCBvciBub3QsIGVhY2ggaW5kaXZpZHVhbCB3b3JkIHdpbGwgYmUgZ2FpbmluZyBvciBsb29zaW5nIGEgdmFsdWUvc2NvcmUuXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIllvdSBjYW4gcGxheSB0aGlzIG1vZGUgYXMgbWFueSB0aW1lcyB5b3Ugd2FudCwgd2l0aCBob3cgbWFueSB3b3JkcyB5b3Ugd2FudC4gVGhlIG1vcmUgd29yZHMgeW91IGFkZCB0aGUgYmV0dGVyIVwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJUaGUgc2Vjb25kIG1vZGUsIFBsYXkgV3JvbmcgV29yZHMsIGxldHMgeW91IHByYWN0aWNlIG9uIHRoZSB3b3JkcyB5b3UgYXJlIGxlc3Mgc3Ryb25nIChvciBoYXZlIG5lZ2F0aXZlIHZhbHVlL3Njb3JlKVwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcblxuICBsZXQgaW5mb1VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICBpbmZvVUwudGV4dENvbnRlbnQgPSBcIlNvbWUgSW5mb1wiO1xuICBpbmZvVUwuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChpbmZvVUwpO1xuXG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQWxsIHdvcmRzIHRoYXQgeW91IGNyZWF0ZSB3aWxsIGJlIHN0b3JlZCBvbiB0aGUgbG9jYWxTdG9yYWdlIG9mIHRoZSBicm93c2VyIHlvdSBjcmVhdGVkIHRoZW0gd2l0aC5cIixcbiAgICBpbmZvVUxcbiAgKTtcblxuICBydWxlQ3JlYXRvcihcbiAgICBcIkJlY2F1c2UgdGhlIGRhdGEgaXMgc3RvcmVkIG9uIHlvdXIgb3duIGJyb3dzZXIgc3RvcmFnZSwgdHJ5IGFuZCBkb24ndCBkZWxldGUgaXQgYnkgZ29pbmcgaW50byBicm93c2VyIHNldHRpbmdzL2hpc3RvcnkvZGF0YSBldGMuXCIsXG4gICAgaW5mb1VMXG4gICk7XG5cbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJXaXRoaW4gdGhlIExpc3QgeW91IGNhbiBjbGljayBlYWNoIGVsZW1lbnQgYW5kIEVkaXQvRGVsZXRlIGl0cyBjb250ZW50cyBpbiBjYXNlIHlvdSBtYWRlIGEgbWlzdGFrZSBvciB3aXNoIHRvIGNoYW5nZSB0aGUgbWVhbmluZyBvZiBpdC5cIixcbiAgICBpbmZvVUxcbiAgKTtcblxuICBydWxlQ3JlYXRvcihcbiAgICBcIkJlY2F1c2UgdGhlIExpc3QgbWlnaHQgZ2V0IHRvbyBsb25nLCB5b3UgY2FuIHVzZSB0aGUgU2VhcmNoIGZlYXR1cmUgdG8gZmlsdGVyIHRocm91Z2ggYWxsIHdvcmRzIVwiLFxuICAgIGluZm9VTFxuICApO1xuICBydWxlQ3JlYXRvcihcIkNsaWNrIG9uIEhpc2NvcmUgdG8gcmVzZXQgdGhlIG51bWJlciBiYWNrIHRvIDAuXCIsIGluZm9VTCk7XG59XG5cbmZ1bmN0aW9uIGVtcHR5Tm9kZShub2RlKSB7XG4gIHdoaWxlIChub2RlLmxhc3RFbGVtZW50Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChhZGRGb3JtKTtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChlZGl0Rm9ybSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVdvcmRMaW5rKHdvcmQpIHtcbiAgcmV0dXJuIGBodHRwczovL3d3dy53b29yZGVuLm9yZy93b29yZC8ke3dvcmQubmVkV29yZH1gO1xufVxuXG5mdW5jdGlvbiBydWxlQ3JlYXRvcihpbmZvLCBwYXJlbnROb2RlKSB7XG4gIGxldCBydWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBwYXJlbnROb2RlLmFwcGVuZENoaWxkKHJ1bGUpO1xuICBydWxlLnRleHRDb250ZW50ID0gaW5mbztcbn1cblxuLy8gZnVuY3Rpb24gY3JlYXRlSWQoKSB7XG4vLyAgIGNvbnN0IGNoYXJhY3RlcnMgPSBcIkFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjtcbi8vICAgY29uc3QgbGVuZ3RoID0gNTtcbi8vICAgbGV0IHJhbmRvbVN0ciA9IFwiXCI7XG5cbi8vICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuLy8gICAgIGNvbnN0IHJhbmRvbU51bSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJhY3RlcnMubGVuZ3RoKTtcbi8vICAgICByYW5kb21TdHIgKz0gY2hhcmFjdGVyc1tyYW5kb21OdW1dO1xuLy8gICB9XG4vLyAgIHJldHVybiByYW5kb21TdHI7XG4vLyB9XG4iLCJleHBvcnQgY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWVBcnJheSwgY3VycmVudFNjb3JlLCBoaVNjb3JlKSB7XG4gICAgdGhpcy5nYW1lQXJyYXkgPSBnYW1lQXJyYXk7XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XG4gICAgdGhpcy5oaVNjb3JlID0gaGlTY29yZTtcbiAgfVxuXG4gIHN0YXJ0R2FtZShhcnJheSwgaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmdhbWVBcnJheSA9IFsuLi5hcnJheV07XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xuICAgIHRoaXMudXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpO1xuICB9XG5cbiAgY29tcGFyZVdvcmRzKGlucHV0LCBodG1sRWxlbWVudCkge1xuICAgIGlmICh0aGlzLmdhbWVBcnJheVswXS5uYXRXb3JkID09PSBpbnB1dC52YWx1ZSkge1xuICAgICAgdGhpcy5hZGRWYWx1ZSgpO1xuICAgICAgdGhpcy5hZGRQb2ludFRvU2NvcmUoKTtcbiAgICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gYENvcnJlY3QhICR7dGhpcy5kaXNwbGF5Q29ycmVjdEFuc3dlcigpfSBZb3VyIEFuc3dlciAtPiAke1xuICAgICAgICBpbnB1dC52YWx1ZVxuICAgICAgfWA7XG4gICAgICB0aGlzLmFkZENvcnJlY3RJY29uKGh0bWxFbGVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVWYWx1ZSgpO1xuICAgICAgaHRtbEVsZW1lbnQudGV4dENvbnRlbnQgPSBgV3JvbmchICR7dGhpcy5kaXNwbGF5Q29ycmVjdEFuc3dlcigpfSBZb3VyIEFuc3dlciAtPiAke1xuICAgICAgICBpbnB1dC52YWx1ZVxuICAgICAgfWA7XG4gICAgICB0aGlzLmFkZFdyb25nSWNvbihodG1sRWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgZGlzcGxheUNvcnJlY3RBbnN3ZXIoKSB7XG4gICAgcmV0dXJuIGBDb3JyZWN0IEFuc3dlciAtPiAgJHt0aGlzLmdhbWVBcnJheVswXS5uYXRXb3JkfWA7XG4gIH1cblxuICBuZXh0V29yZChodG1sRWxlbWVudCkge1xuICAgIHJldHVybiAoaHRtbEVsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtcbiAgICAgIHRoaXMuZ2FtZUFycmF5WzBdLm5lZFdvcmRcbiAgICB9ICAgICAgICAvJHt0aGlzLnJlbWFpbmluZ1dvcmRzKCl9YCk7XG4gIH1cblxuICBhZGRQb2ludFRvU2NvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNjb3JlKys7XG4gIH1cblxuICB1cGRhdGVTY29yZShodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCkge1xuICAgIHRoaXMuY2hlY2tGb3JIaXNjb3JlKCk7XG4gICAgaHRtbEVsZW1lbnRDLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgaHRtbEVsZW1lbnRILnRleHRDb250ZW50ID0gdGhpcy5oaVNjb3JlO1xuICB9XG5cbiAgY2hlY2tGb3JIaXNjb3JlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTY29yZSA+PSB0aGlzLmhpU2NvcmUpIHtcbiAgICAgIHRoaXMuaGlTY29yZSA9IHRoaXMuY3VycmVudFNjb3JlO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheVswXS52YWx1ZSsrO1xuICB9XG5cbiAgcmVtb3ZlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5WzBdLnZhbHVlLS07XG4gIH1cblxuICByZW1vdmVGaXJzdE9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXkuc2hpZnQoKTtcbiAgfVxuXG4gIHJhbmRvbWl6ZUFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zb3J0KChhLCBiKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgfVxuICB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeSh0aGlzLmhpU2NvcmUpKTtcbiAgfVxuXG4gIHJlbWFpbmluZ1dvcmRzKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5sZW5ndGgudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGFkZENvcnJlY3RJY29uKGh0bWxFbGVtZW50KSB7XG4gICAgbGV0IGljb25DID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgaWNvbkMudGV4dENvbnRlbnQgPSBcImNoZWNrXCI7XG4gICAgaWNvbkMuY2xhc3NMaXN0LmFkZChcIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCIpO1xuICAgIGljb25DLnN0eWxlLmNvbG9yID0gXCJncmVlblwiO1xuICAgIGljb25DLnN0eWxlLmZvbnRTaXplID0gXCI1NXB4XCI7XG4gICAgaHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvbkMpO1xuICB9XG5cbiAgYWRkV3JvbmdJY29uKGh0bWxFbGVtZW50KSB7XG4gICAgbGV0IGljb25XID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgaWNvblcudGV4dENvbnRlbnQgPSBcImNsZWFyXCI7XG4gICAgaWNvblcuY2xhc3NMaXN0LmFkZChcIm1hdGVyaWFsLWljb25zLW91dGxpbmVkXCIpO1xuICAgIGljb25XLnN0eWxlLmNvbG9yID0gXCJyZWRcIjtcbiAgICBpY29uVy5zdHlsZS5mb250U2l6ZSA9IFwiNTVweFwiO1xuICAgIGh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGljb25XKTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShuYW1lLCBvYmpLZXkpIHtcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkob2JqS2V5KSk7XG4vLyB9XG4iLCJsZXQgdHlwZU9mV29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZU9mV29yZF9lZGl0XCIpO1xubGV0IGRlT2ZIZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlT2ZIZXRfZWRpdFwiKTtcbmxldCBkV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfZWRpdFwiKTtcbmxldCBuV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXRpdmVXb3JkX2lucHV0X2VkaXRcIik7XG5cbmNsYXNzIFdvcmQge1xuICBjb25zdHJ1Y3Rvcih3VHlwZSwgd0FydGljbGUsIG5lZFdvcmQsIG5hdFdvcmQsIHZhbHVlLCBsaW5rKSB7XG4gICAgdGhpcy53VHlwZSA9IHdUeXBlO1xuICAgIHRoaXMud0FydGljbGUgPSB3QXJ0aWNsZTtcbiAgICB0aGlzLm5lZFdvcmQgPSBuZWRXb3JkO1xuICAgIHRoaXMubmF0V29yZCA9IG5hdFdvcmQ7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMubGluayA9IGxpbms7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmQoYXJyKSB7XG4gIGxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkX2FkZFwiKS52YWx1ZTtcbiAgbGV0IGRlT2ZIZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlT2ZIZXRfYWRkXCIpLnZhbHVlO1xuICBsZXQgZFdvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHV0Y2hXb3JkX2lucHV0X2FkZFwiKS52YWx1ZTtcbiAgbGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRfYWRkXCIpLnZhbHVlO1xuICAvL1xuICBsZXQgbmV3V29yZCA9IG5ldyBXb3JkKFxuICAgIHR5cGVPZldvcmQsXG4gICAgZGVPZkhldCxcbiAgICBkV29yZElucHV0LFxuICAgIG5Xb3JkSW5wdXQsXG4gICAgMCxcbiAgICBcIk1lYW5pbmcgaW4gV29vcmRlbiAtID4gXCJcbiAgKTtcbiAgLy9cbiAgaWYgKGFyci5zb21lKChlKSA9PiBlLm5lZFdvcmQgPT09IGAke2RXb3JkSW5wdXR9YCkpIHtcbiAgICBhbGVydChcIndvcmQgaXMgYWxyZWFkeSBoZXJlXCIpO1xuICB9IGVsc2Uge1xuICAgIGFyci5wdXNoKG5ld1dvcmQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVXb3JkKGFycmF5LCBpbmRleCkge1xuICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50V29yZEluZm8oYXJyYXksIGluZGV4KSB7XG4gIHR5cGVPZldvcmQudmFsdWUgPSBhcnJheVtpbmRleF0ud1R5cGU7XG4gIGRlT2ZIZXQudmFsdWUgPSBhcnJheVtpbmRleF0ud0FydGljbGU7XG4gIGRXb3JkSW5wdXQudmFsdWUgPSBhcnJheVtpbmRleF0ubmVkV29yZDtcbiAgbldvcmRJbnB1dC52YWx1ZSA9IGFycmF5W2luZGV4XS5uYXRXb3JkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0RWRpdChhcnJheSwgaW5kZXgsIGlucHV0KSB7XG4gIGFycmF5W2luZGV4XS53VHlwZSA9IHR5cGVPZldvcmQudmFsdWU7XG4gIGFycmF5W2luZGV4XS53QXJ0aWNsZSA9IGRlT2ZIZXQudmFsdWU7XG4gIGFycmF5W2luZGV4XS5uZWRXb3JkID0gZFdvcmRJbnB1dC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLm5hdFdvcmQgPSBuV29yZElucHV0LnZhbHVlO1xuXG4gIC8vIGlmIChhcnJheS5zb21lKChlKSA9PiBlLm5lZFdvcmQgPT09IGlucHV0LnZhbHVlKSkge1xuICAvLyAgIGFsZXJ0KFwid29yZCBpcyBhbHJlYWR5IGhlcmVcIik7XG4gIC8vIH0gZWxzZSB7XG4gIC8vICAgYXJyYXlbaW5kZXhdLndUeXBlID0gdHlwZU9mV29yZC52YWx1ZTtcbiAgLy8gICBhcnJheVtpbmRleF0ud0FydGljbGUgPSBkZU9mSGV0LnZhbHVlO1xuICAvLyAgIGFycmF5W2luZGV4XS5uZWRXb3JkID0gZFdvcmRJbnB1dC52YWx1ZTtcbiAgLy8gICBhcnJheVtpbmRleF0ubmF0V29yZCA9IG5Xb3JkSW5wdXQudmFsdWU7XG4gIC8vIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgY3JlYXRlV29yZCxcbiAgcHJpbnRXb3JkSW5mbyxcbiAgZGVsZXRlV29yZCxcbiAgc3VibWl0RWRpdCxcbn0gZnJvbSBcIi4vd29yZF9jcmVhdG9yXCI7XG5pbXBvcnQge1xuICBvcGVuRm9ybSxcbiAgY2xvc2VGb3JtLFxuICBzaG93RHJvcERvd24sXG4gIHJlbmRlckdhbWVJbmZvLFxuICByZW5kZXJXb3JkcyxcbiAgcmVuZGVyR2FtZVJ1bGVzLFxufSBmcm9tIFwiLi9kb21fc3R1ZmZcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmxldCBhbGxXb3JkcyA9IGdldFN0b3JhZ2VEYXRhKFwid29yZHNBcnJheVwiKTtcblxubGV0IGdhbWVBcnJheSA9IFtdO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKGdhbWVBcnJheSwgMCwgZ2V0U3RvcmFnZURhdGEoXCJoaVNjb3JlXCIpKTtcblxubGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xuXG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9jb250YWluZXJfYWRkXCIpO1xubGV0IGVkaXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2NvbnRhaW5lcl9lZGl0XCIpO1xuXG5sZXQgZHJvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGJ0blwiKTtcblxubGV0IGFkZFdvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF93b3JkXCIpO1xubGV0IGRlbGV0ZVdvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZV93b3JkXCIpO1xuXG5sZXQgYWRkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5BZGRfYWRkXCIpO1xuXG5sZXQgY2FuY2VsQnRuQWRkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5DYW5jZWxfYWRkXCIpO1xubGV0IGNhbmNlbEJ0bkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbF9lZGl0XCIpO1xuXG5sZXQgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ0blwiKTtcbmxldCBwbGF5QnRuXyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ0bl9cIik7XG5sZXQgaW5zdHJ1Y3Rpb25zQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnN0cnVjdGlvbnNcIik7XG5cbmxldCBpbnB1dEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfYW5zd2VyXCIpO1xubGV0IHdvcmRPblNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid29yZE9uU2NyZWVuXCIpO1xubGV0IGN1cnJlbnRTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50X3Njb3JlX3ZhbHVlXCIpO1xubGV0IGhpU2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaF9zY29yZV92YWx1ZVwiKTtcbmxldCBoaVNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoX3Njb3JlXCIpO1xubGV0IGxpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlZVdvcmRzQnRuXCIpO1xubGV0IHJlc2V0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZXNldFdvcmRzU2NvcmVcIik7XG5cbmxldCBteUZvcm1BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgbXlGb3JtRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5cbmxldCBzZWFyY2hCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJhclwiKTtcbmxldCBjb3JyZWN0QW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb3JyZWN0QW5zd2VyXCIpO1xuXG5oaVNjb3JlVmFsdWUudGV4dENvbnRlbnQgPSBnYW1lLmhpU2NvcmU7XG5cbmxldCBpbmRleCA9IHVuZGVmaW5lZDtcblxuY29udGFpbmVyQm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKFxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvd1wiIHx8XG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT09IFwicm93IHBvc2l0aXZlU2NvcmVcIiB8fFxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvdyBuZWdhdGl2ZVNjb3JlXCJcbiAgKSB7XG4gICAgaW5kZXggPSBhbGxXb3Jkcy5maW5kSW5kZXgoKHdvcmQpID0+IHtcbiAgICAgIHJldHVybiB3b3JkLm5lZFdvcmQgPT09IGAke2UudGFyZ2V0LnBhcmVudE5vZGUuaWR9YDtcbiAgICB9KTtcbiAgICBwcmludFdvcmRJbmZvKGFsbFdvcmRzLCBpbmRleCk7XG4gICAgb3BlbkZvcm0obXlGb3JtRWRpdCk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiYnRuQWRkX2VkaXRcIikge1xuICAgIGlmIChcbiAgICAgIGVkaXRGb3JtLmNoaWxkTm9kZXNbNV0udmFsdWUgIT09IFwiXCIgJiZcbiAgICAgIGVkaXRGb3JtLmNoaWxkTm9kZXNbOV0udmFsdWUgIT09IFwiXCJcbiAgICApIHtcbiAgICAgIHN1Ym1pdEVkaXQoYWxsV29yZHMsIGluZGV4LCBlZGl0Rm9ybS5jaGlsZE5vZGVzWzVdKTtcbiAgICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgICByZW5kZXJXb3JkcyhhbGxXb3JkcywgY29udGFpbmVyQm9keSk7XG4gICAgICBjbG9zZUZvcm0obXlGb3JtRWRpdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFwiY2FudCBlZGl0IGEgd29yZCB0byBlbXB0eSBmaWVsZHMhXCIpO1xuICAgIH1cbiAgfVxufSk7XG5cbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcbiAgZ2FtZS5zdGFydEdhbWUoYWxsV29yZHMsIGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgfSBlbHNlIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkFERCBTT01FIFdPUkRTIEJFRk9SRSBQTEFZSU5HIVwiO1xuICB9XG59KTtcblxucGxheUJ0bl8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcblxuICBsZXQgQWxsTmVnYXRpdmVXb3Jkc0FycmF5ID0gYWxsV29yZHMuZmlsdGVyKCh3b3JkKSA9PiB3b3JkLnZhbHVlIDwgMCk7XG4gIGdhbWUuc3RhcnRHYW1lKEFsbE5lZ2F0aXZlV29yZHNBcnJheSwgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICB9IGVsc2UgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiMCBORUdBVElWRSBTQ09SRSBXT1JEUyFcIjtcbiAgfVxufSk7XG5cbmxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xufSk7XG5cbnJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFsbFdvcmRzLmZvckVhY2goKHdvcmQpID0+IHtcbiAgICB3b3JkLnZhbHVlID0gMDtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3JkcywgY29udGFpbmVyQm9keSk7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGFsbFdvcmRzKTtcbn0pO1xuXG5pbnN0cnVjdGlvbnNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJ0ZXN0aW5nXCIpO1xuICByZW5kZXJHYW1lUnVsZXMoKTtcbn0pO1xuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChhZGRGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVXb3JkKGFsbFdvcmRzKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGFkZEZvcm0ucmVzZXQoKTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3Jkcyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfYWRkXCIpLmZvY3VzKCk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIsIGNvcnJlY3RBbnN3ZXIpO1xuICAgIGdhbWUucmVtb3ZlRmlyc3RPYmplY3QoKTtcbiAgICBnYW1lLnVwZGF0ZVNjb3JlKGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICAgIGdhbWUudXBkYXRlTG9jYWxTdG9yYWdlKFwiaGlTY29yZVwiKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCJET05FIVwiO1xuICAgIH1cbiAgICBpbnB1dEFuc3dlci52YWx1ZSA9IFwiXCI7XG4gIH1cbn0pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNlYXJjaFN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkV29yZHMgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgd29yZC5uZWRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKSB8fFxuICAgICAgd29yZC5uYXRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKVxuICAgICk7XG4gIH0pO1xuICByZW5kZXJXb3JkcyhmaWx0ZXJlZFdvcmRzKTtcbn0pO1xuXG5kZWxldGVXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiZGVsZXRlX3dvcmRcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkZWxldGVXb3JkKGFsbFdvcmRzLCBpbmRleCk7XG4gICAgcmVuZGVyV29yZHMoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgY2xvc2VGb3JtKG15Rm9ybUVkaXQpO1xuICB9XG59KTtcblxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGJ0blwiKSkge1xuICAgIGxldCBkcm9wZG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd25fY29udGVudFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wZW5Ecm9wZG93biA9IGRyb3Bkb3duc1tpXTtcbiAgICAgIGlmIChvcGVuRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5oaVNjb3JlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGdhbWUuaGlTY29yZSA9IDA7XG4gIGhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcbiAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xufSk7XG5cbmRyb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dEcm9wRG93bik7XG5cbmFkZFdvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgb3BlbkZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xvc2VGb3JtKG15Rm9ybUFkZCk7XG59KTtcblxuY2FuY2VsQnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0obXlGb3JtRWRpdCk7XG59KTtcblxuZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgYXJyKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGFycikpO1xufVxuXG5mdW5jdGlvbiBnZXRTdG9yYWdlRGF0YShuYW1lKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpIHx8IFwiW11cIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=