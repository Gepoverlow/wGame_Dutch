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
let addForm = document.getElementById("myForm");
let containerGame = document.getElementById("container_game");

let headers = ["Type", "DE/HET", "Word", "Your Meaning", "score"];

function openForm() {
  addForm.style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
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

  arr.forEach((emp) => {
    let row = document.createElement("tr");
    Object.values(emp).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
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
/* harmony export */   "createWord": () => (/* binding */ createWord)
/* harmony export */ });
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
  let typeOfWord = document.getElementById("typeOfWord").value;
  let deOfHet = document.getElementById("deOfHet").value;
  let dWordInput = document.getElementById("dutchWord_input").value;
  let nWordInput = document.getElementById("nativeWord_input").value;
  //

  let newWord = new Word(typeOfWord, deOfHet, dWordInput, nWordInput, 0);

  //
  if (arr.some((e) => e.nedWord === `${dWordInput}`)) {
    alert("word is already here");
  } else {
    arr.push(newWord);
  }
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

let addForm = document.querySelector(".form-container");
let dropBtn = document.querySelector(".dropbtn");
let addWord = document.querySelector(".add_word");
let cancelBtn = document.getElementById("btnCancel");
let addBtn = document.getElementById("btnAdd");
let playBtn = document.getElementById("playBtn");
let inputAnswer = document.getElementById("input_answer");
let wordOnScreen = document.getElementById("wordOnScreen");
let currentScoreValue = document.getElementById("current_score_value");
let hiScoreValue = document.getElementById("high_score_value");
let listWords = document.getElementById("seeWordsBtn");

hiScoreValue.textContent = game.hiScore;

playBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderGameInfo)();
  game.startGame(allWords, currentScoreValue, hiScoreValue);
  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen);
  }
});

listWords.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(allWords);
});

dropBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.showDropDown);

addWord.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm);

cancelBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm);

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    // createWord(gameArray);
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

function addToLocalStorage(name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
}

function getStorageData(name) {
  return JSON.parse(localStorage.getItem(name) || "[]");
}

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBOztBQUVPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQzdETztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHVDQUF1QyxXQUFXO0FBQ2xEO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7Ozs7OztVQ3pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNONEM7QUFPdkI7QUFDUzs7QUFFOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGVBQWUsdUNBQUk7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxFQUFFLDBEQUFjO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0EsRUFBRSx1REFBVztBQUNiLENBQUM7O0FBRUQsa0NBQWtDLG9EQUFZOztBQUU5QyxrQ0FBa0MsZ0RBQVE7O0FBRTFDLG9DQUFvQyxpREFBUzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFVO0FBQ2Q7QUFDQTtBQUNBLElBQUksdURBQVc7QUFDZjtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzQkFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9kb21fc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL3dvcmRfY3JlYXRvci5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xubGV0IGFkZEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybVwiKTtcbmxldCBjb250YWluZXJHYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb250YWluZXJfZ2FtZVwiKTtcblxubGV0IGhlYWRlcnMgPSBbXCJUeXBlXCIsIFwiREUvSEVUXCIsIFwiV29yZFwiLCBcIllvdXIgTWVhbmluZ1wiLCBcInNjb3JlXCJdO1xuXG5leHBvcnQgZnVuY3Rpb24gb3BlbkZvcm0oKSB7XG4gIGFkZEZvcm0uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vKiBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLFxudG9nZ2xlIGJldHdlZW4gaGlkaW5nIGFuZCBzaG93aW5nIHRoZSBkcm9wZG93biBjb250ZW50ICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Ryb3BEb3duKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RHJvcGRvd25cIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXb3JkcyhhcnIpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuXG4gIGxldCB0YWJsZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRhYmxlV3JhcHBlci5pZCA9IFwidGFibGVXcmFwcGVyXCI7XG4gIHRhYmxlLmlkID0gXCJ3b3Jkc1RhYmxlXCI7XG5cbiAgaGVhZGVycy5mb3JFYWNoKChoZWFkZXJUZXh0KSA9PiB7XG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoZWFkZXJUZXh0KTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICB9KTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcblxuICBhcnIuZm9yRWFjaCgoZW1wKSA9PiB7XG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgICBPYmplY3QudmFsdWVzKGVtcCkuZm9yRWFjaCgodGV4dCkgPT4ge1xuICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH0pO1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XG4gIH0pO1xuICB0YWJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKHRhYmxlV3JhcHBlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJHYW1lSW5mbygpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckdhbWUpO1xufVxuXG5mdW5jdGlvbiBlbXB0eU5vZGUobm9kZSkge1xuICB3aGlsZSAobm9kZS5sYXN0RWxlbWVudENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RFbGVtZW50Q2hpbGQpO1xuICB9XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoYWRkRm9ybSk7XG59XG4iLCJleHBvcnQgY2xhc3MgR2FtZSB7XG4gIGNvbnN0cnVjdG9yKGdhbWVBcnJheSwgY29ycmVjdEFycmF5LCB3cm9uZ0FycmF5LCBjdXJyZW50U2NvcmUsIGhpU2NvcmUpIHtcbiAgICB0aGlzLmdhbWVBcnJheSA9IGdhbWVBcnJheTtcbiAgICB0aGlzLmNvcnJlY3RBcnJheSA9IGNvcnJlY3RBcnJheTtcbiAgICB0aGlzLndyb25nQXJyYXkgPSB3cm9uZ0FycmF5O1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gY3VycmVudFNjb3JlO1xuICAgIHRoaXMuaGlTY29yZSA9IGhpU2NvcmU7XG4gIH1cblxuICBzdGFydEdhbWUoYWxsV29yZHMsIGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5nYW1lQXJyYXkgPSBbLi4uYWxsV29yZHNdO1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKTtcbiAgfVxuXG4gIGNvbXBhcmVXb3JkcyhpbnB1dCkge1xuICAgIGlmICh0aGlzLmdhbWVBcnJheVswXS5uYXRXb3JkID09PSBpbnB1dC52YWx1ZSkge1xuICAgICAgdGhpcy5hZGRWYWx1ZSgpO1xuICAgICAgdGhpcy5hZGRQb2ludFRvU2NvcmUoKTtcbiAgICAgIHRoaXMuYWRkVG9Db3JyZWN0QXJyYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVWYWx1ZSgpO1xuICAgICAgdGhpcy5hZGRUb1dyb25nQXJyYXkoKTtcbiAgICB9XG4gIH1cblxuICBuZXh0V29yZChodG1sRWxlbWVudCkge1xuICAgIHJldHVybiAoaHRtbEVsZW1lbnQudGV4dENvbnRlbnQgPSB0aGlzLmdhbWVBcnJheVswXS5uZWRXb3JkKTtcbiAgfVxuXG4gIGFkZFBvaW50VG9TY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmUrKztcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5jaGVja0Zvckhpc2NvcmUoKTtcbiAgICBodG1sRWxlbWVudEMudGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICBodG1sRWxlbWVudEgudGV4dENvbnRlbnQgPSB0aGlzLmhpU2NvcmU7XG4gIH1cblxuICBjaGVja0Zvckhpc2NvcmUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNjb3JlID49IHRoaXMuaGlTY29yZSkge1xuICAgICAgdGhpcy5oaVNjb3JlID0gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgfVxuICB9XG5cbiAgYWRkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5WzBdLnZhbHVlKys7XG4gIH1cblxuICByZW1vdmVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUtLTtcbiAgfVxuXG4gIHJlbW92ZUZpcnN0T2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zaGlmdCgpO1xuICB9XG5cbiAgYWRkVG9Db3JyZWN0QXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ycmVjdEFycmF5LnB1c2godGhpcy5yZW1vdmVGaXJzdE9iamVjdCgpKTtcbiAgfVxuXG4gIGFkZFRvV3JvbmdBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy53cm9uZ0FycmF5LnB1c2godGhpcy5yZW1vdmVGaXJzdE9iamVjdCgpKTtcbiAgfVxuICByYW5kb21pemVBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXkuc29ydCgoYSwgYikgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG4gIH1cbiAgdXBkYXRlTG9jYWxTdG9yYWdlKG5hbWUpIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkodGhpcy5oaVNjb3JlKSk7XG4gIH1cbn1cblxuLy8gZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgb2JqS2V5KSB7XG4vLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KG9iaktleSkpO1xuLy8gfVxuIiwiY2xhc3MgV29yZCB7XG4gIGNvbnN0cnVjdG9yKHdUeXBlLCB3QXJ0aWNsZSwgbmVkV29yZCwgbmF0V29yZCwgdmFsdWUpIHtcbiAgICB0aGlzLndUeXBlID0gd1R5cGU7XG4gICAgdGhpcy53QXJ0aWNsZSA9IHdBcnRpY2xlO1xuICAgIHRoaXMubmVkV29yZCA9IG5lZFdvcmQ7XG4gICAgdGhpcy5uYXRXb3JkID0gbmF0V29yZDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmQoYXJyKSB7XG4gIGxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkXCIpLnZhbHVlO1xuICBsZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldFwiKS52YWx1ZTtcbiAgbGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dFwiKS52YWx1ZTtcbiAgbGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRcIikudmFsdWU7XG4gIC8vXG5cbiAgbGV0IG5ld1dvcmQgPSBuZXcgV29yZCh0eXBlT2ZXb3JkLCBkZU9mSGV0LCBkV29yZElucHV0LCBuV29yZElucHV0LCAwKTtcblxuICAvL1xuICBpZiAoYXJyLnNvbWUoKGUpID0+IGUubmVkV29yZCA9PT0gYCR7ZFdvcmRJbnB1dH1gKSkge1xuICAgIGFsZXJ0KFwid29yZCBpcyBhbHJlYWR5IGhlcmVcIik7XG4gIH0gZWxzZSB7XG4gICAgYXJyLnB1c2gobmV3V29yZCk7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlV29yZCB9IGZyb20gXCIuL3dvcmRfY3JlYXRvclwiO1xuaW1wb3J0IHtcbiAgb3BlbkZvcm0sXG4gIGNsb3NlRm9ybSxcbiAgc2hvd0Ryb3BEb3duLFxuICByZW5kZXJHYW1lSW5mbyxcbiAgcmVuZGVyV29yZHMsXG59IGZyb20gXCIuL2RvbV9zdHVmZlwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcblxubGV0IGFsbFdvcmRzID0gZ2V0U3RvcmFnZURhdGEoXCJ3b3Jkc0FycmF5XCIpO1xuXG5sZXQgZ2FtZUFycmF5ID0gW107XG5sZXQgY29ycmVjdEFycmF5ID0gW107XG5sZXQgd3JvbmdBcnJheSA9IFtdO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKFxuICBnYW1lQXJyYXksXG4gIGNvcnJlY3RBcnJheSxcbiAgd3JvbmdBcnJheSxcbiAgMCxcbiAgZ2V0U3RvcmFnZURhdGEoXCJoaVNjb3JlXCIpXG4pO1xuXG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1jb250YWluZXJcIik7XG5sZXQgZHJvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGJ0blwiKTtcbmxldCBhZGRXb3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRfd29yZFwiKTtcbmxldCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbFwiKTtcbmxldCBhZGRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkFkZFwiKTtcbmxldCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnRuXCIpO1xubGV0IGlucHV0QW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dF9hbnN3ZXJcIik7XG5sZXQgd29yZE9uU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JkT25TY3JlZW5cIik7XG5sZXQgY3VycmVudFNjb3JlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRfc2NvcmVfdmFsdWVcIik7XG5sZXQgaGlTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoX3Njb3JlX3ZhbHVlXCIpO1xubGV0IGxpc3RXb3JkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VlV29yZHNCdG5cIik7XG5cbmhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcblxucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICByZW5kZXJHYW1lSW5mbygpO1xuICBnYW1lLnN0YXJ0R2FtZShhbGxXb3JkcywgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICB9XG59KTtcblxubGlzdFdvcmRzLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlcldvcmRzKGFsbFdvcmRzKTtcbn0pO1xuXG5kcm9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93RHJvcERvd24pO1xuXG5hZGRXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuRm9ybSk7XG5cbmNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VGb3JtKTtcblxuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoYWRkRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gY3JlYXRlV29yZChnYW1lQXJyYXkpO1xuICAgIGNyZWF0ZVdvcmQoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgYWRkRm9ybS5yZXNldCgpO1xuICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzKTtcbiAgfVxufSk7XG5cbmlucHV0QW5zd2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLmNvbXBhcmVXb3JkcyhpbnB1dEFuc3dlcik7XG4gICAgZ2FtZS51cGRhdGVTY29yZShjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgICBnYW1lLnVwZGF0ZUxvY2FsU3RvcmFnZShcImhpU2NvcmVcIik7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiRE9ORSFcIjtcbiAgICB9XG4gICAgaW5wdXRBbnN3ZXIudmFsdWUgPSBcIlwiO1xuICB9XG59KTtcblxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGJ0blwiKSkge1xuICAgIGxldCBkcm9wZG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd24tY29udGVudFwiKTtcbiAgICBsZXQgaTtcbiAgICBmb3IgKGkgPSAwOyBpIDwgZHJvcGRvd25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgb3BlbkRyb3Bkb3duID0gZHJvcGRvd25zW2ldO1xuICAgICAgaWYgKG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoXCJzaG93XCIpKSB7XG4gICAgICAgIG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKFwic2hvd1wiKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFkZFRvTG9jYWxTdG9yYWdlKG5hbWUsIGFycikge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShhcnIpKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RvcmFnZURhdGEobmFtZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKSB8fCBcIltdXCIpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9