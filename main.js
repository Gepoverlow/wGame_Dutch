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
/* harmony export */   "renderGameInfo": () => (/* binding */ renderGameInfo)
/* harmony export */ });
let containerBody = document.querySelector(".container_body");
let addForm = document.getElementById("myForm_add");
let editForm = document.getElementById("myForm_edit");
let containerGame = document.getElementById("container_game");

let headers = ["Type", "DE/HET", "Word", "Your Meaning", "score"];

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
    Object.values(word).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    row.classList.add("row");
    table.appendChild(row);
  });
  tableWrapper.appendChild(table);
  containerBody.appendChild(tableWrapper);
}

function renderGameInfo() {
  emptyNode(containerBody);
  containerBody.appendChild(containerGame);
}

function emptyNode(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
  containerBody.appendChild(addForm);
  containerBody.appendChild(editForm);
}

function createId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const length = 5;
  let randomStr = "";

  for (let i = 0; i < length; i++) {
    const randomNum = Math.floor(Math.random() * characters.length);
    randomStr += characters[randomNum];
  }
  return randomStr;
}


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
  constructor(gameArray, correctArray, wrongArray, currentScore, hiScore) {
    this.gameArray = gameArray;
    this.correctArray = correctArray;
    this.wrongArray = wrongArray;
    this.currentScore = currentScore;
    this.hiScore = hiScore;
  }

  startGame(allWords, htmlElementC, htmlElementH) {
    this.gameArray = [...allWords];
    this.currentScore = 0;
    this.updateScore(htmlElementC, htmlElementH);
  }

  compareWords(input) {
    if (this.gameArray[0].natWord === input.value) {
      this.addValue();
      this.addPointToScore();
      this.addToCorrectArray();
    } else {
      this.removeValue();
      this.addToWrongArray();
    }
  }

  nextWord(htmlElement) {
    return (htmlElement.textContent = this.gameArray[0].nedWord);
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

  addToCorrectArray() {
    return this.correctArray.push(this.removeFirstObject());
  }

  addToWrongArray() {
    return this.wrongArray.push(this.removeFirstObject());
  }
  randomizeArray() {
    return this.gameArray.sort((a, b) => 0.5 - Math.random());
  }
  updateLocalStorage(name) {
    return localStorage.setItem(name, JSON.stringify(this.hiScore));
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
/* harmony export */   "submitEdit": () => (/* binding */ submitEdit),
/* harmony export */   "findIndex": () => (/* binding */ findIndex)
/* harmony export */ });
let typeOfWord = document.getElementById("typeOfWord_edit");
let deOfHet = document.getElementById("deOfHet_edit");
let dWordInput = document.getElementById("dutchWord_input_edit");
let nWordInput = document.getElementById("nativeWord_input_edit");

class Word {
  constructor(wType, wArticle, nedWord, natWord, value) {
    this.wType = wType;
    this.wArticle = wArticle;
    this.nedWord = nedWord;
    this.natWord = natWord;
    this.value = value;
  }
}

function createWord(arr) {
  let typeOfWord = document.getElementById("typeOfWord_add").value;
  let deOfHet = document.getElementById("deOfHet_add").value;
  let dWordInput = document.getElementById("dutchWord_input_add").value;
  let nWordInput = document.getElementById("nativeWord_input_add").value;
  //
  let newWord = new Word(typeOfWord, deOfHet, dWordInput, nWordInput, 0);
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

function submitEdit(array, index) {
  array[index].wType = typeOfWord.value;
  array[index].wArticle = deOfHet.value;
  array[index].nedWord = dWordInput.value;
  array[index].natWord = nWordInput.value;
}

function findIndex(arr, target) {
  let pos = arr
    .map(function (e) {
      return e.id;
    })
    .indexOf(parseInt(target));
  return pos;
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
let correctArray = [];
let wrongArray = [];

let game = new _game__WEBPACK_IMPORTED_MODULE_2__.Game(
  gameArray,
  correctArray,
  wrongArray,
  0,
  getStorageData("hiScore")
);

let containerBody = document.querySelector(".container_body");
let addForm = document.querySelector(".form_container");
let dropBtn = document.querySelector(".dropbtn");

let addWordBtn = document.getElementById("add_word");
let deleteWordBtn = document.getElementById("delete_word");

let addBtn = document.getElementById("btnAdd_add");

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

let index = undefined;

containerBody.addEventListener("click", function (e) {
  if (e.target.parentNode.className === "row") {
    index = allWords.findIndex((word) => {
      return word.nedWord === `${e.target.parentNode.id}`;
    });
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.printWordInfo)(allWords, index);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm)(editForm);
  }

  if (e.target.id === "btnAdd_edit") {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.submitEdit)(allWords, index);
    addToLocalStorage("wordsArray", allWords);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords, containerBody);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(editForm);
  }
});

playBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();
  game.startGame(allWords, currentScoreValue, hiScoreValue);
  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen);
  }
});

listBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords, containerBody);
});

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.createWord)(allWords);
    addToLocalStorage("wordsArray", allWords);
    addForm.reset();
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords);
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
  e.preventDefault();
  (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.deleteWord)(allWords, index);
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords);
  addToLocalStorage("wordsArray", allWords);
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(editForm);
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

dropBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.showDropDown);

addWordBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm)(myFormAdd);
});

cancelBtnAdd.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(myFormAdd);
});

cancelBtnEdit.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(editForm);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLElBQUkseURBQVU7QUFDZDtBQUNBO0FBQ0EsSUFBSSx1REFBVztBQUNmO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFLHVEQUFXO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsRUFBRSx5REFBVTtBQUNaLEVBQUUsdURBQVc7QUFDYjtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0Msb0RBQVk7O0FBRTlDO0FBQ0EsRUFBRSxvREFBUTtBQUNWLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZG9tX3N0dWZmLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy93b3JkX2NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCBjb250YWluZXJCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJfYm9keVwiKTtcbmxldCBhZGRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1fYWRkXCIpO1xubGV0IGVkaXRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1fZWRpdFwiKTtcbmxldCBjb250YWluZXJHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJfZ2FtZVwiKTtcblxubGV0IGhlYWRlcnMgPSBbXCJUeXBlXCIsIFwiREUvSEVUXCIsIFwiV29yZFwiLCBcIllvdXIgTWVhbmluZ1wiLCBcInNjb3JlXCJdO1xuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkZvcm0oaHRtbEVsZW1lbnQpIHtcbiAgaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlRm9ybShodG1sRWxlbWVudCkge1xuICBodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8qIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBidXR0b24sXG50b2dnbGUgYmV0d2VlbiBoaWRpbmcgYW5kIHNob3dpbmcgdGhlIGRyb3Bkb3duIGNvbnRlbnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RHJvcERvd24oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlEcm9wZG93blwiKS5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldvcmRzKGFycikge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG5cbiAgbGV0IHRhYmxlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgdGFibGVXcmFwcGVyLmlkID0gXCJ0YWJsZVdyYXBwZXJcIjtcbiAgdGFibGUuaWQgPSBcIndvcmRzVGFibGVcIjtcblxuICBoZWFkZXJzLmZvckVhY2goKGhlYWRlclRleHQpID0+IHtcbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhlYWRlclRleHQpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIH0pO1xuICB0YWJsZS5hcHBlbmRDaGlsZChoZWFkZXJSb3cpO1xuXG4gIGFyci5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICByb3cuaWQgPSB3b3JkLm5lZFdvcmQ7XG4gICAgT2JqZWN0LnZhbHVlcyh3b3JkKS5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfSk7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgfSk7XG4gIHRhYmxlV3JhcHBlci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQodGFibGVXcmFwcGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdhbWVJbmZvKCkge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyR2FtZSk7XG59XG5cbmZ1bmN0aW9uIGVtcHR5Tm9kZShub2RlKSB7XG4gIHdoaWxlIChub2RlLmxhc3RFbGVtZW50Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChhZGRGb3JtKTtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChlZGl0Rm9ybSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUlkKCkge1xuICBjb25zdCBjaGFyYWN0ZXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XG4gIGNvbnN0IGxlbmd0aCA9IDU7XG4gIGxldCByYW5kb21TdHIgPSBcIlwiO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCk7XG4gICAgcmFuZG9tU3RyICs9IGNoYXJhY3RlcnNbcmFuZG9tTnVtXTtcbiAgfVxuICByZXR1cm4gcmFuZG9tU3RyO1xufVxuIiwiZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihnYW1lQXJyYXksIGNvcnJlY3RBcnJheSwgd3JvbmdBcnJheSwgY3VycmVudFNjb3JlLCBoaVNjb3JlKSB7XG4gICAgdGhpcy5nYW1lQXJyYXkgPSBnYW1lQXJyYXk7XG4gICAgdGhpcy5jb3JyZWN0QXJyYXkgPSBjb3JyZWN0QXJyYXk7XG4gICAgdGhpcy53cm9uZ0FycmF5ID0gd3JvbmdBcnJheTtcbiAgICB0aGlzLmN1cnJlbnRTY29yZSA9IGN1cnJlbnRTY29yZTtcbiAgICB0aGlzLmhpU2NvcmUgPSBoaVNjb3JlO1xuICB9XG5cbiAgc3RhcnRHYW1lKGFsbFdvcmRzLCBodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gWy4uLmFsbFdvcmRzXTtcbiAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XG4gICAgdGhpcy51cGRhdGVTY29yZShodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCk7XG4gIH1cblxuICBjb21wYXJlV29yZHMoaW5wdXQpIHtcbiAgICBpZiAodGhpcy5nYW1lQXJyYXlbMF0ubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgIHRoaXMuYWRkVmFsdWUoKTtcbiAgICAgIHRoaXMuYWRkUG9pbnRUb1Njb3JlKCk7XG4gICAgICB0aGlzLmFkZFRvQ29ycmVjdEFycmF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlVmFsdWUoKTtcbiAgICAgIHRoaXMuYWRkVG9Xcm9uZ0FycmF5KCk7XG4gICAgfVxuICB9XG5cbiAgbmV4dFdvcmQoaHRtbEVsZW1lbnQpIHtcbiAgICByZXR1cm4gKGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5nYW1lQXJyYXlbMF0ubmVkV29yZCk7XG4gIH1cblxuICBhZGRQb2ludFRvU2NvcmUoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFNjb3JlKys7XG4gIH1cblxuICB1cGRhdGVTY29yZShodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCkge1xuICAgIHRoaXMuY2hlY2tGb3JIaXNjb3JlKCk7XG4gICAgaHRtbEVsZW1lbnRDLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgaHRtbEVsZW1lbnRILnRleHRDb250ZW50ID0gdGhpcy5oaVNjb3JlO1xuICB9XG5cbiAgY2hlY2tGb3JIaXNjb3JlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTY29yZSA+PSB0aGlzLmhpU2NvcmUpIHtcbiAgICAgIHRoaXMuaGlTY29yZSA9IHRoaXMuY3VycmVudFNjb3JlO1xuICAgIH1cbiAgfVxuXG4gIGFkZFZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheVswXS52YWx1ZSsrO1xuICB9XG5cbiAgcmVtb3ZlVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5WzBdLnZhbHVlLS07XG4gIH1cblxuICByZW1vdmVGaXJzdE9iamVjdCgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXkuc2hpZnQoKTtcbiAgfVxuXG4gIGFkZFRvQ29ycmVjdEFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmNvcnJlY3RBcnJheS5wdXNoKHRoaXMucmVtb3ZlRmlyc3RPYmplY3QoKSk7XG4gIH1cblxuICBhZGRUb1dyb25nQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMud3JvbmdBcnJheS5wdXNoKHRoaXMucmVtb3ZlRmlyc3RPYmplY3QoKSk7XG4gIH1cbiAgcmFuZG9taXplQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNvcnQoKGEsIGIpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICB9XG4gIHVwZGF0ZUxvY2FsU3RvcmFnZShuYW1lKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KHRoaXMuaGlTY29yZSkpO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIGFkZFRvTG9jYWxTdG9yYWdlKG5hbWUsIG9iaktleSkge1xuLy8gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShvYmpLZXkpKTtcbi8vIH1cbiIsImxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkX2VkaXRcIik7XG5sZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldF9lZGl0XCIpO1xubGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9lZGl0XCIpO1xubGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRfZWRpdFwiKTtcblxuY2xhc3MgV29yZCB7XG4gIGNvbnN0cnVjdG9yKHdUeXBlLCB3QXJ0aWNsZSwgbmVkV29yZCwgbmF0V29yZCwgdmFsdWUpIHtcbiAgICB0aGlzLndUeXBlID0gd1R5cGU7XG4gICAgdGhpcy53QXJ0aWNsZSA9IHdBcnRpY2xlO1xuICAgIHRoaXMubmVkV29yZCA9IG5lZFdvcmQ7XG4gICAgdGhpcy5uYXRXb3JkID0gbmF0V29yZDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmQoYXJyKSB7XG4gIGxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkX2FkZFwiKS52YWx1ZTtcbiAgbGV0IGRlT2ZIZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlT2ZIZXRfYWRkXCIpLnZhbHVlO1xuICBsZXQgZFdvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHV0Y2hXb3JkX2lucHV0X2FkZFwiKS52YWx1ZTtcbiAgbGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRfYWRkXCIpLnZhbHVlO1xuICAvL1xuICBsZXQgbmV3V29yZCA9IG5ldyBXb3JkKHR5cGVPZldvcmQsIGRlT2ZIZXQsIGRXb3JkSW5wdXQsIG5Xb3JkSW5wdXQsIDApO1xuICAvL1xuICBpZiAoYXJyLnNvbWUoKGUpID0+IGUubmVkV29yZCA9PT0gYCR7ZFdvcmRJbnB1dH1gKSkge1xuICAgIGFsZXJ0KFwid29yZCBpcyBhbHJlYWR5IGhlcmVcIik7XG4gIH0gZWxzZSB7XG4gICAgYXJyLnB1c2gobmV3V29yZCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVdvcmQoYXJyYXksIGluZGV4KSB7XG4gIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRXb3JkSW5mbyhhcnJheSwgaW5kZXgpIHtcbiAgdHlwZU9mV29yZC52YWx1ZSA9IGFycmF5W2luZGV4XS53VHlwZTtcbiAgZGVPZkhldC52YWx1ZSA9IGFycmF5W2luZGV4XS53QXJ0aWNsZTtcbiAgZFdvcmRJbnB1dC52YWx1ZSA9IGFycmF5W2luZGV4XS5uZWRXb3JkO1xuICBuV29yZElucHV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLm5hdFdvcmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRFZGl0KGFycmF5LCBpbmRleCkge1xuICBhcnJheVtpbmRleF0ud1R5cGUgPSB0eXBlT2ZXb3JkLnZhbHVlO1xuICBhcnJheVtpbmRleF0ud0FydGljbGUgPSBkZU9mSGV0LnZhbHVlO1xuICBhcnJheVtpbmRleF0ubmVkV29yZCA9IGRXb3JkSW5wdXQudmFsdWU7XG4gIGFycmF5W2luZGV4XS5uYXRXb3JkID0gbldvcmRJbnB1dC52YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRJbmRleChhcnIsIHRhcmdldCkge1xuICBsZXQgcG9zID0gYXJyXG4gICAgLm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgcmV0dXJuIGUuaWQ7XG4gICAgfSlcbiAgICAuaW5kZXhPZihwYXJzZUludCh0YXJnZXQpKTtcbiAgcmV0dXJuIHBvcztcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtcbiAgY3JlYXRlV29yZCxcbiAgcHJpbnRXb3JkSW5mbyxcbiAgZGVsZXRlV29yZCxcbiAgc3VibWl0RWRpdCxcbiAgZmluZEluZGV4LFxufSBmcm9tIFwiLi93b3JkX2NyZWF0b3JcIjtcbmltcG9ydCB7XG4gIG9wZW5Gb3JtLFxuICBjbG9zZUZvcm0sXG4gIHNob3dEcm9wRG93bixcbiAgcmVuZGVyR2FtZUluZm8sXG4gIHJlbmRlcldvcmRzLFxufSBmcm9tIFwiLi9kb21fc3R1ZmZcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9nYW1lXCI7XG5cbmxldCBhbGxXb3JkcyA9IGdldFN0b3JhZ2VEYXRhKFwid29yZHNBcnJheVwiKTtcblxubGV0IGdhbWVBcnJheSA9IFtdO1xubGV0IGNvcnJlY3RBcnJheSA9IFtdO1xubGV0IHdyb25nQXJyYXkgPSBbXTtcblxubGV0IGdhbWUgPSBuZXcgR2FtZShcbiAgZ2FtZUFycmF5LFxuICBjb3JyZWN0QXJyYXksXG4gIHdyb25nQXJyYXksXG4gIDAsXG4gIGdldFN0b3JhZ2VEYXRhKFwiaGlTY29yZVwiKVxuKTtcblxubGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xubGV0IGFkZEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvcm1fY29udGFpbmVyXCIpO1xubGV0IGRyb3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyb3BidG5cIik7XG5cbmxldCBhZGRXb3JkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfd29yZFwiKTtcbmxldCBkZWxldGVXb3JkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWxldGVfd29yZFwiKTtcblxubGV0IGFkZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQWRkX2FkZFwiKTtcblxubGV0IGNhbmNlbEJ0bkFkZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQ2FuY2VsX2FkZFwiKTtcbmxldCBjYW5jZWxCdG5FZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5DYW5jZWxfZWRpdFwiKTtcblxubGV0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdG5cIik7XG5sZXQgaW5wdXRBbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0X2Fuc3dlclwiKTtcbmxldCB3b3JkT25TY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndvcmRPblNjcmVlblwiKTtcbmxldCBjdXJyZW50U2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudF9zY29yZV92YWx1ZVwiKTtcbmxldCBoaVNjb3JlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2hfc2NvcmVfdmFsdWVcIik7XG5sZXQgbGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VlV29yZHNCdG5cIik7XG5cbmxldCBteUZvcm1BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9lZGl0XCIpO1xuXG5sZXQgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCYXJcIik7XG5cbmhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcblxubGV0IGluZGV4ID0gdW5kZWZpbmVkO1xuXG5jb250YWluZXJCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT09IFwicm93XCIpIHtcbiAgICBpbmRleCA9IGFsbFdvcmRzLmZpbmRJbmRleCgod29yZCkgPT4ge1xuICAgICAgcmV0dXJuIHdvcmQubmVkV29yZCA9PT0gYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gO1xuICAgIH0pO1xuICAgIHByaW50V29yZEluZm8oYWxsV29yZHMsIGluZGV4KTtcbiAgICBvcGVuRm9ybShlZGl0Rm9ybSk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiYnRuQWRkX2VkaXRcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzdWJtaXRFZGl0KGFsbFdvcmRzLCBpbmRleCk7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3JkcywgY29udGFpbmVyQm9keSk7XG4gICAgY2xvc2VGb3JtKGVkaXRGb3JtKTtcbiAgfVxufSk7XG5cbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcbiAgZ2FtZS5zdGFydEdhbWUoYWxsV29yZHMsIGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgfVxufSk7XG5cbmxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xufSk7XG5cbmFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGFkZEZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVdvcmQoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgYWRkRm9ybS5yZXNldCgpO1xuICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzKTtcbiAgfVxufSk7XG5cbmlucHV0QW5zd2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLmNvbXBhcmVXb3JkcyhpbnB1dEFuc3dlcik7XG4gICAgZ2FtZS51cGRhdGVTY29yZShjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgICBnYW1lLnVwZGF0ZUxvY2FsU3RvcmFnZShcImhpU2NvcmVcIik7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiRE9ORSFcIjtcbiAgICB9XG4gICAgaW5wdXRBbnN3ZXIudmFsdWUgPSBcIlwiO1xuICB9XG59KTtcblxuc2VhcmNoQmFyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoZSkgPT4ge1xuICBjb25zdCBzZWFyY2hTdHJpbmcgPSBlLnRhcmdldC52YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICBjb25zdCBmaWx0ZXJlZFdvcmRzID0gYWxsV29yZHMuZmlsdGVyKCh3b3JkKSA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIHdvcmQubmVkV29yZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFN0cmluZykgfHxcbiAgICAgIHdvcmQubmF0V29yZC50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFN0cmluZylcbiAgICApO1xuICB9KTtcbiAgcmVuZGVyV29yZHMoZmlsdGVyZWRXb3Jkcyk7XG59KTtcblxuZGVsZXRlV29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBkZWxldGVXb3JkKGFsbFdvcmRzLCBpbmRleCk7XG4gIHJlbmRlcldvcmRzKGFsbFdvcmRzKTtcbiAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgY2xvc2VGb3JtKGVkaXRGb3JtKTtcbn0pO1xuXG4vLyBDbG9zZSB0aGUgZHJvcGRvd24gbWVudSBpZiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBpdFxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5kcm9wYnRuXCIpKSB7XG4gICAgbGV0IGRyb3Bkb3ducyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkcm9wZG93bl9jb250ZW50XCIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJvcGRvd25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgb3BlbkRyb3Bkb3duID0gZHJvcGRvd25zW2ldO1xuICAgICAgaWYgKG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93XCIpKSB7XG4gICAgICAgIG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmRyb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dEcm9wRG93bik7XG5cbmFkZFdvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgb3BlbkZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xvc2VGb3JtKG15Rm9ybUFkZCk7XG59KTtcblxuY2FuY2VsQnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0oZWRpdEZvcm0pO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFRvTG9jYWxTdG9yYWdlKG5hbWUsIGFycikge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShhcnIpKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RvcmFnZURhdGEobmFtZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKSB8fCBcIltdXCIpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9