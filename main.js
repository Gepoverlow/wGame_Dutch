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

let headers = ["Type", "DE/HET", "Word", "Your Meaning", "score", "Link"];

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

function emptyNode(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
  containerBody.appendChild(addForm);
  containerBody.appendChild(editForm);
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

  compareWords(input) {
    if (this.gameArray[0].natWord === input.value) {
      this.addValue();
      this.addPointToScore();
      this.removeFirstObject();
    } else {
      this.removeValue();
      this.removeFirstObject();
    }
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
    this.link = link + this.nedWord;
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
    "https://www.woorden.org/woord/"
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

function submitEdit(array, index) {
  array[index].wType = typeOfWord.value;
  array[index].wArticle = deOfHet.value;
  array[index].nedWord = dWordInput.value;
  array[index].natWord = nWordInput.value;
}

// export function findIndex(arr, target) {
//   let pos = arr
//     .map(function (e) {
//       return e.id;
//     })
//     .indexOf(parseInt(target));
//   return pos;
// }


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
let addForm = document.querySelector(".form_container");
let dropBtn = document.querySelector(".dropbtn");

let addWordBtn = document.getElementById("add_word");
let deleteWordBtn = document.getElementById("delete_word");

let addBtn = document.getElementById("btnAdd_add");

let cancelBtnAdd = document.getElementById("btnCancel_add");
let cancelBtnEdit = document.getElementById("btnCancel_edit");

let playBtn = document.getElementById("playBtn");
let playBtn_ = document.getElementById("playBtn_");

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
  if (
    e.target.parentNode.className === "row" ||
    e.target.parentNode.className === "row positiveScore" ||
    e.target.parentNode.className === "row negativeScore"
  ) {
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

playBtn_.addEventListener("click", () => {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();
  let AllNegativeWordsArray = allWords.filter((word) => word.value < 0);
  game.startGame(AllNegativeWordsArray, currentScoreValue, hiScoreValue);
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
    document.getElementById("dutchWord_input_add").focus();
    console.log(allWords);
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
  console.log(e.target);

  if (e.target.id === "delete_word") {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.deleteWord)(allWords, index);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords);
    addToLocalStorage("wordsArray", allWords);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(editForm);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsMERBQWM7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBLEVBQUUsdURBQVc7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQVU7QUFDZDtBQUNBO0FBQ0EsSUFBSSx1REFBVztBQUNmO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsRUFBRSx1REFBVztBQUNiLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSx5REFBVTtBQUNkLElBQUksdURBQVc7QUFDZjtBQUNBLElBQUkscURBQVM7QUFDYjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isc0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQyxvREFBWTs7QUFFOUM7QUFDQSxFQUFFLG9EQUFRO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9kb21fc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL3dvcmRfY3JlYXRvci5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xubGV0IGFkZEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9lZGl0XCIpO1xubGV0IGNvbnRhaW5lckdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lcl9nYW1lXCIpO1xuXG5sZXQgaGVhZGVycyA9IFtcIlR5cGVcIiwgXCJERS9IRVRcIiwgXCJXb3JkXCIsIFwiWW91ciBNZWFuaW5nXCIsIFwic2NvcmVcIiwgXCJMaW5rXCJdO1xuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkZvcm0oaHRtbEVsZW1lbnQpIHtcbiAgaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlRm9ybShodG1sRWxlbWVudCkge1xuICBodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8qIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBidXR0b24sXG50b2dnbGUgYmV0d2VlbiBoaWRpbmcgYW5kIHNob3dpbmcgdGhlIGRyb3Bkb3duIGNvbnRlbnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RHJvcERvd24oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlEcm9wZG93blwiKS5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldvcmRzKGFycikge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG5cbiAgbGV0IHRhYmxlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgdGFibGVXcmFwcGVyLmlkID0gXCJ0YWJsZVdyYXBwZXJcIjtcbiAgdGFibGUuaWQgPSBcIndvcmRzVGFibGVcIjtcblxuICBoZWFkZXJzLmZvckVhY2goKGhlYWRlclRleHQpID0+IHtcbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhlYWRlclRleHQpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIH0pO1xuICB0YWJsZS5hcHBlbmRDaGlsZChoZWFkZXJSb3cpO1xuXG4gIGFyci5mb3JFYWNoKCh3b3JkKSA9PiB7XG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICByb3cuaWQgPSB3b3JkLm5lZFdvcmQ7XG4gICAgT2JqZWN0LnZhbHVlcyh3b3JkKS5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfSk7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcblxuICAgIGlmICh3b3JkLnZhbHVlIDwgMCkge1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoXCJuZWdhdGl2ZVNjb3JlXCIpO1xuICAgIH0gZWxzZSBpZiAod29yZC52YWx1ZSA+IDApIHtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicG9zaXRpdmVTY29yZVwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIHRhYmxlV3JhcHBlci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQodGFibGVXcmFwcGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdhbWVJbmZvKCkge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyR2FtZSk7XG59XG5cbmZ1bmN0aW9uIGVtcHR5Tm9kZShub2RlKSB7XG4gIHdoaWxlIChub2RlLmxhc3RFbGVtZW50Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChhZGRGb3JtKTtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChlZGl0Rm9ybSk7XG59XG5cbi8vIGZ1bmN0aW9uIGNyZWF0ZUlkKCkge1xuLy8gICBjb25zdCBjaGFyYWN0ZXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XG4vLyAgIGNvbnN0IGxlbmd0aCA9IDU7XG4vLyAgIGxldCByYW5kb21TdHIgPSBcIlwiO1xuXG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbi8vICAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCk7XG4vLyAgICAgcmFuZG9tU3RyICs9IGNoYXJhY3RlcnNbcmFuZG9tTnVtXTtcbi8vICAgfVxuLy8gICByZXR1cm4gcmFuZG9tU3RyO1xuLy8gfVxuIiwiZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihnYW1lQXJyYXksIGN1cnJlbnRTY29yZSwgaGlTY29yZSkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gZ2FtZUFycmF5O1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gY3VycmVudFNjb3JlO1xuICAgIHRoaXMuaGlTY29yZSA9IGhpU2NvcmU7XG4gIH1cblxuICBzdGFydEdhbWUoYXJyYXksIGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5nYW1lQXJyYXkgPSBbLi4uYXJyYXldO1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKTtcbiAgfVxuXG4gIGNvbXBhcmVXb3JkcyhpbnB1dCkge1xuICAgIGlmICh0aGlzLmdhbWVBcnJheVswXS5uYXRXb3JkID09PSBpbnB1dC52YWx1ZSkge1xuICAgICAgdGhpcy5hZGRWYWx1ZSgpO1xuICAgICAgdGhpcy5hZGRQb2ludFRvU2NvcmUoKTtcbiAgICAgIHRoaXMucmVtb3ZlRmlyc3RPYmplY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVWYWx1ZSgpO1xuICAgICAgdGhpcy5yZW1vdmVGaXJzdE9iamVjdCgpO1xuICAgIH1cbiAgfVxuXG4gIG5leHRXb3JkKGh0bWxFbGVtZW50KSB7XG4gICAgcmV0dXJuIChodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IGAke1xuICAgICAgdGhpcy5nYW1lQXJyYXlbMF0ubmVkV29yZFxuICAgIH0gICAgICAgIC8ke3RoaXMucmVtYWluaW5nV29yZHMoKX1gKTtcbiAgfVxuXG4gIGFkZFBvaW50VG9TY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmUrKztcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5jaGVja0Zvckhpc2NvcmUoKTtcbiAgICBodG1sRWxlbWVudEMudGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICBodG1sRWxlbWVudEgudGV4dENvbnRlbnQgPSB0aGlzLmhpU2NvcmU7XG4gIH1cblxuICBjaGVja0Zvckhpc2NvcmUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNjb3JlID49IHRoaXMuaGlTY29yZSkge1xuICAgICAgdGhpcy5oaVNjb3JlID0gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgfVxuICB9XG5cbiAgYWRkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5WzBdLnZhbHVlKys7XG4gIH1cblxuICByZW1vdmVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUtLTtcbiAgfVxuXG4gIHJlbW92ZUZpcnN0T2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zaGlmdCgpO1xuICB9XG5cbiAgcmFuZG9taXplQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNvcnQoKGEsIGIpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICB9XG4gIHVwZGF0ZUxvY2FsU3RvcmFnZShuYW1lKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KHRoaXMuaGlTY29yZSkpO1xuICB9XG5cbiAgcmVtYWluaW5nV29yZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5Lmxlbmd0aC50b1N0cmluZygpO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIGFkZFRvTG9jYWxTdG9yYWdlKG5hbWUsIG9iaktleSkge1xuLy8gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShvYmpLZXkpKTtcbi8vIH1cbiIsImxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkX2VkaXRcIik7XG5sZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldF9lZGl0XCIpO1xubGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9lZGl0XCIpO1xubGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRfZWRpdFwiKTtcblxuY2xhc3MgV29yZCB7XG4gIGNvbnN0cnVjdG9yKHdUeXBlLCB3QXJ0aWNsZSwgbmVkV29yZCwgbmF0V29yZCwgdmFsdWUsIGxpbmspIHtcbiAgICB0aGlzLndUeXBlID0gd1R5cGU7XG4gICAgdGhpcy53QXJ0aWNsZSA9IHdBcnRpY2xlO1xuICAgIHRoaXMubmVkV29yZCA9IG5lZFdvcmQ7XG4gICAgdGhpcy5uYXRXb3JkID0gbmF0V29yZDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5saW5rID0gbGluayArIHRoaXMubmVkV29yZDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yZChhcnIpIHtcbiAgbGV0IHR5cGVPZldvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cGVPZldvcmRfYWRkXCIpLnZhbHVlO1xuICBsZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldF9hZGRcIikudmFsdWU7XG4gIGxldCBkV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfYWRkXCIpLnZhbHVlO1xuICBsZXQgbldvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF0aXZlV29yZF9pbnB1dF9hZGRcIikudmFsdWU7XG4gIC8vXG4gIGxldCBuZXdXb3JkID0gbmV3IFdvcmQoXG4gICAgdHlwZU9mV29yZCxcbiAgICBkZU9mSGV0LFxuICAgIGRXb3JkSW5wdXQsXG4gICAgbldvcmRJbnB1dCxcbiAgICAwLFxuICAgIFwiaHR0cHM6Ly93d3cud29vcmRlbi5vcmcvd29vcmQvXCJcbiAgKTtcbiAgLy9cbiAgaWYgKGFyci5zb21lKChlKSA9PiBlLm5lZFdvcmQgPT09IGAke2RXb3JkSW5wdXR9YCkpIHtcbiAgICBhbGVydChcIndvcmQgaXMgYWxyZWFkeSBoZXJlXCIpO1xuICB9IGVsc2Uge1xuICAgIGFyci5wdXNoKG5ld1dvcmQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVXb3JkKGFycmF5LCBpbmRleCkge1xuICByZXR1cm4gYXJyYXkuc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50V29yZEluZm8oYXJyYXksIGluZGV4KSB7XG4gIHR5cGVPZldvcmQudmFsdWUgPSBhcnJheVtpbmRleF0ud1R5cGU7XG4gIGRlT2ZIZXQudmFsdWUgPSBhcnJheVtpbmRleF0ud0FydGljbGU7XG4gIGRXb3JkSW5wdXQudmFsdWUgPSBhcnJheVtpbmRleF0ubmVkV29yZDtcbiAgbldvcmRJbnB1dC52YWx1ZSA9IGFycmF5W2luZGV4XS5uYXRXb3JkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3VibWl0RWRpdChhcnJheSwgaW5kZXgpIHtcbiAgYXJyYXlbaW5kZXhdLndUeXBlID0gdHlwZU9mV29yZC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLndBcnRpY2xlID0gZGVPZkhldC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLm5lZFdvcmQgPSBkV29yZElucHV0LnZhbHVlO1xuICBhcnJheVtpbmRleF0ubmF0V29yZCA9IG5Xb3JkSW5wdXQudmFsdWU7XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCB0YXJnZXQpIHtcbi8vICAgbGV0IHBvcyA9IGFyclxuLy8gICAgIC5tYXAoZnVuY3Rpb24gKGUpIHtcbi8vICAgICAgIHJldHVybiBlLmlkO1xuLy8gICAgIH0pXG4vLyAgICAgLmluZGV4T2YocGFyc2VJbnQodGFyZ2V0KSk7XG4vLyAgIHJldHVybiBwb3M7XG4vLyB9XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gIGNyZWF0ZVdvcmQsXG4gIHByaW50V29yZEluZm8sXG4gIGRlbGV0ZVdvcmQsXG4gIHN1Ym1pdEVkaXQsXG59IGZyb20gXCIuL3dvcmRfY3JlYXRvclwiO1xuaW1wb3J0IHtcbiAgb3BlbkZvcm0sXG4gIGNsb3NlRm9ybSxcbiAgc2hvd0Ryb3BEb3duLFxuICByZW5kZXJHYW1lSW5mbyxcbiAgcmVuZGVyV29yZHMsXG59IGZyb20gXCIuL2RvbV9zdHVmZlwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcblxubGV0IGFsbFdvcmRzID0gZ2V0U3RvcmFnZURhdGEoXCJ3b3Jkc0FycmF5XCIpO1xuXG5sZXQgZ2FtZUFycmF5ID0gW107XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZUFycmF5LCAwLCBnZXRTdG9yYWdlRGF0YShcImhpU2NvcmVcIikpO1xuXG5sZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9jb250YWluZXJcIik7XG5sZXQgZHJvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGJ0blwiKTtcblxubGV0IGFkZFdvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZF93b3JkXCIpO1xubGV0IGRlbGV0ZVdvcmRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlbGV0ZV93b3JkXCIpO1xuXG5sZXQgYWRkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5BZGRfYWRkXCIpO1xuXG5sZXQgY2FuY2VsQnRuQWRkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5DYW5jZWxfYWRkXCIpO1xubGV0IGNhbmNlbEJ0bkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbF9lZGl0XCIpO1xuXG5sZXQgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ0blwiKTtcbmxldCBwbGF5QnRuXyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ0bl9cIik7XG5cbmxldCBpbnB1dEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfYW5zd2VyXCIpO1xubGV0IHdvcmRPblNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid29yZE9uU2NyZWVuXCIpO1xubGV0IGN1cnJlbnRTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50X3Njb3JlX3ZhbHVlXCIpO1xubGV0IGhpU2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaF9zY29yZV92YWx1ZVwiKTtcbmxldCBsaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWVXb3Jkc0J0blwiKTtcblxubGV0IG15Rm9ybUFkZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2FkZFwiKTtcbmxldCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5cbmxldCBzZWFyY2hCYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlYXJjaEJhclwiKTtcblxuaGlTY29yZVZhbHVlLnRleHRDb250ZW50ID0gZ2FtZS5oaVNjb3JlO1xuXG5sZXQgaW5kZXggPSB1bmRlZmluZWQ7XG5cbmNvbnRhaW5lckJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3dcIiB8fFxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvdyBwb3NpdGl2ZVNjb3JlXCIgfHxcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3cgbmVnYXRpdmVTY29yZVwiXG4gICkge1xuICAgIGluZGV4ID0gYWxsV29yZHMuZmluZEluZGV4KCh3b3JkKSA9PiB7XG4gICAgICByZXR1cm4gd29yZC5uZWRXb3JkID09PSBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWA7XG4gICAgfSk7XG4gICAgcHJpbnRXb3JkSW5mbyhhbGxXb3JkcywgaW5kZXgpO1xuICAgIG9wZW5Gb3JtKGVkaXRGb3JtKTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJidG5BZGRfZWRpdFwiKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHN1Ym1pdEVkaXQoYWxsV29yZHMsIGluZGV4KTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzLCBjb250YWluZXJCb2R5KTtcbiAgICBjbG9zZUZvcm0oZWRpdEZvcm0pO1xuICB9XG59KTtcblxucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICByZW5kZXJHYW1lSW5mbygpO1xuICBnYW1lLnN0YXJ0R2FtZShhbGxXb3JkcywgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICB9XG59KTtcblxucGxheUJ0bl8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcbiAgbGV0IEFsbE5lZ2F0aXZlV29yZHNBcnJheSA9IGFsbFdvcmRzLmZpbHRlcigod29yZCkgPT4gd29yZC52YWx1ZSA8IDApO1xuICBnYW1lLnN0YXJ0R2FtZShBbGxOZWdhdGl2ZVdvcmRzQXJyYXksIGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgfVxufSk7XG5cbmxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xufSk7XG5cbmFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGFkZEZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVdvcmQoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgYWRkRm9ybS5yZXNldCgpO1xuICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9hZGRcIikuZm9jdXMoKTtcbiAgICBjb25zb2xlLmxvZyhhbGxXb3Jkcyk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIpO1xuICAgIGdhbWUudXBkYXRlU2NvcmUoY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gICAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkRPTkUhXCI7XG4gICAgfVxuICAgIGlucHV0QW5zd2VyLnZhbHVlID0gXCJcIjtcbiAgfVxufSk7XG5cbnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgY29uc3Qgc2VhcmNoU3RyaW5nID0gZS50YXJnZXQudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgY29uc3QgZmlsdGVyZWRXb3JkcyA9IGFsbFdvcmRzLmZpbHRlcigod29yZCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICB3b3JkLm5lZFdvcmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcpIHx8XG4gICAgICB3b3JkLm5hdFdvcmQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hTdHJpbmcpXG4gICAgKTtcbiAgfSk7XG4gIHJlbmRlcldvcmRzKGZpbHRlcmVkV29yZHMpO1xufSk7XG5cbmRlbGV0ZVdvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGNvbnNvbGUubG9nKGUudGFyZ2V0KTtcblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiZGVsZXRlX3dvcmRcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkZWxldGVXb3JkKGFsbFdvcmRzLCBpbmRleCk7XG4gICAgcmVuZGVyV29yZHMoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgY2xvc2VGb3JtKGVkaXRGb3JtKTtcbiAgfVxufSk7XG5cbi8vIENsb3NlIHRoZSBkcm9wZG93biBtZW51IGlmIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0XG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmRyb3BidG5cIikpIHtcbiAgICBsZXQgZHJvcGRvd25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRyb3Bkb3duX2NvbnRlbnRcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wZG93bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICBpZiAob3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIikpIHtcbiAgICAgICAgb3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZHJvcEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd0Ryb3BEb3duKTtcblxuYWRkV29yZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBvcGVuRm9ybShteUZvcm1BZGQpO1xufSk7XG5cbmNhbmNlbEJ0bkFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5FZGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsb3NlRm9ybShlZGl0Rm9ybSk7XG59KTtcblxuZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgYXJyKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGFycikpO1xufVxuXG5mdW5jdGlvbiBnZXRTdG9yYWdlRGF0YShuYW1lKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpIHx8IFwiW11cIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=