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

let containerBody = document.querySelector(".container_body");
let addForm = document.querySelector(".form-container-add");
let dropBtn = document.querySelector(".dropbtn");
let addWord = document.querySelector(".add_word");
let cancelBtn = document.getElementById("btnCancel");
let addBtn = document.getElementById("btnAdd");
let playBtn = document.getElementById("playBtn");
let inputAnswer = document.getElementById("input_answer");
let wordOnScreen = document.getElementById("wordOnScreen");
let currentScoreValue = document.getElementById("current_score_value");
let hiScoreValue = document.getElementById("high_score_value");
let listBtn = document.getElementById("seeWordsBtn");

let myForm = document.getElementById("myForm");

hiScoreValue.textContent = game.hiScore;

containerBody.addEventListener("click", function (e) {
  if (e.target.parentNode.className === "row") {
    console.log(e.target.parentNode.rowIndex);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm)();
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

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

dropBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.showDropDown);

addWord.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm)(myForm);
});

cancelBtn.addEventListener("click", function () {
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm)(myForm);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L2RvbV9zdHVmZi5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvd29yZF9jcmVhdG9yLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtXCIpO1xubGV0IGNvbnRhaW5lckdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lcl9nYW1lXCIpO1xuXG5sZXQgaGVhZGVycyA9IFtcIlR5cGVcIiwgXCJERS9IRVRcIiwgXCJXb3JkXCIsIFwiWW91ciBNZWFuaW5nXCIsIFwic2NvcmVcIl07XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuRm9ybSgpIHtcbiAgYWRkRm9ybS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VGb3JtKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8qIFdoZW4gdGhlIHVzZXIgY2xpY2tzIG9uIHRoZSBidXR0b24sXG50b2dnbGUgYmV0d2VlbiBoaWRpbmcgYW5kIHNob3dpbmcgdGhlIGRyb3Bkb3duIGNvbnRlbnQgKi9cbmV4cG9ydCBmdW5jdGlvbiBzaG93RHJvcERvd24oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlEcm9wZG93blwiKS5jbGFzc0xpc3QudG9nZ2xlKFwic2hvd1wiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlcldvcmRzKGFycikge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG5cbiAgbGV0IHRhYmxlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcbiAgbGV0IGhlYWRlclJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcbiAgdGFibGVXcmFwcGVyLmlkID0gXCJ0YWJsZVdyYXBwZXJcIjtcbiAgdGFibGUuaWQgPSBcIndvcmRzVGFibGVcIjtcblxuICBoZWFkZXJzLmZvckVhY2goKGhlYWRlclRleHQpID0+IHtcbiAgICBsZXQgaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRoXCIpO1xuICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGhlYWRlclRleHQpO1xuICAgIGhlYWRlci5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgaGVhZGVyUm93LmFwcGVuZENoaWxkKGhlYWRlcik7XG4gIH0pO1xuICB0YWJsZS5hcHBlbmRDaGlsZChoZWFkZXJSb3cpO1xuXG4gIGFyci5mb3JFYWNoKChlbXApID0+IHtcbiAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIE9iamVjdC52YWx1ZXMoZW1wKS5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgfSk7XG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgfSk7XG4gIHRhYmxlV3JhcHBlci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQodGFibGVXcmFwcGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdhbWVJbmZvKCkge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyR2FtZSk7XG59XG5cbmZ1bmN0aW9uIGVtcHR5Tm9kZShub2RlKSB7XG4gIHdoaWxlIChub2RlLmxhc3RFbGVtZW50Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUubGFzdEVsZW1lbnRDaGlsZCk7XG4gIH1cbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChhZGRGb3JtKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoZ2FtZUFycmF5LCBjb3JyZWN0QXJyYXksIHdyb25nQXJyYXksIGN1cnJlbnRTY29yZSwgaGlTY29yZSkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gZ2FtZUFycmF5O1xuICAgIHRoaXMuY29ycmVjdEFycmF5ID0gY29ycmVjdEFycmF5O1xuICAgIHRoaXMud3JvbmdBcnJheSA9IHdyb25nQXJyYXk7XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XG4gICAgdGhpcy5oaVNjb3JlID0gaGlTY29yZTtcbiAgfVxuXG4gIHN0YXJ0R2FtZShhbGxXb3JkcywgaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmdhbWVBcnJheSA9IFsuLi5hbGxXb3Jkc107XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xuICAgIHRoaXMudXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpO1xuICB9XG5cbiAgY29tcGFyZVdvcmRzKGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZ2FtZUFycmF5WzBdLm5hdFdvcmQgPT09IGlucHV0LnZhbHVlKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFBvaW50VG9TY29yZSgpO1xuICAgICAgdGhpcy5hZGRUb0NvcnJlY3RBcnJheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFRvV3JvbmdBcnJheSgpO1xuICAgIH1cbiAgfVxuXG4gIG5leHRXb3JkKGh0bWxFbGVtZW50KSB7XG4gICAgcmV0dXJuIChodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuZ2FtZUFycmF5WzBdLm5lZFdvcmQpO1xuICB9XG5cbiAgYWRkUG9pbnRUb1Njb3JlKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZSsrO1xuICB9XG5cbiAgdXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmNoZWNrRm9ySGlzY29yZSgpO1xuICAgIGh0bWxFbGVtZW50Qy50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudFNjb3JlO1xuICAgIGh0bWxFbGVtZW50SC50ZXh0Q29udGVudCA9IHRoaXMuaGlTY29yZTtcbiAgfVxuXG4gIGNoZWNrRm9ySGlzY29yZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NvcmUgPj0gdGhpcy5oaVNjb3JlKSB7XG4gICAgICB0aGlzLmhpU2NvcmUgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICB9XG4gIH1cblxuICBhZGRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUrKztcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheVswXS52YWx1ZS0tO1xuICB9XG5cbiAgcmVtb3ZlRmlyc3RPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNoaWZ0KCk7XG4gIH1cblxuICBhZGRUb0NvcnJlY3RBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JyZWN0QXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG5cbiAgYWRkVG9Xcm9uZ0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLndyb25nQXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG4gIHJhbmRvbWl6ZUFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zb3J0KChhLCBiKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgfVxuICB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeSh0aGlzLmhpU2NvcmUpKTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShuYW1lLCBvYmpLZXkpIHtcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkob2JqS2V5KSk7XG4vLyB9XG4iLCJjbGFzcyBXb3JkIHtcbiAgY29uc3RydWN0b3Iod1R5cGUsIHdBcnRpY2xlLCBuZWRXb3JkLCBuYXRXb3JkLCB2YWx1ZSkge1xuICAgIHRoaXMud1R5cGUgPSB3VHlwZTtcbiAgICB0aGlzLndBcnRpY2xlID0gd0FydGljbGU7XG4gICAgdGhpcy5uZWRXb3JkID0gbmVkV29yZDtcbiAgICB0aGlzLm5hdFdvcmQgPSBuYXRXb3JkO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yZChhcnIpIHtcbiAgbGV0IHR5cGVPZldvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cGVPZldvcmRcIikudmFsdWU7XG4gIGxldCBkZU9mSGV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZU9mSGV0XCIpLnZhbHVlO1xuICBsZXQgZFdvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHV0Y2hXb3JkX2lucHV0XCIpLnZhbHVlO1xuICBsZXQgbldvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF0aXZlV29yZF9pbnB1dFwiKS52YWx1ZTtcbiAgLy9cblxuICBsZXQgbmV3V29yZCA9IG5ldyBXb3JkKHR5cGVPZldvcmQsIGRlT2ZIZXQsIGRXb3JkSW5wdXQsIG5Xb3JkSW5wdXQsIDApO1xuXG4gIC8vXG4gIGlmIChhcnIuc29tZSgoZSkgPT4gZS5uZWRXb3JkID09PSBgJHtkV29yZElucHV0fWApKSB7XG4gICAgYWxlcnQoXCJ3b3JkIGlzIGFscmVhZHkgaGVyZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBhcnIucHVzaChuZXdXb3JkKTtcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVXb3JkIH0gZnJvbSBcIi4vd29yZF9jcmVhdG9yXCI7XG5pbXBvcnQge1xuICBvcGVuRm9ybSxcbiAgY2xvc2VGb3JtLFxuICBzaG93RHJvcERvd24sXG4gIHJlbmRlckdhbWVJbmZvLFxuICByZW5kZXJXb3Jkcyxcbn0gZnJvbSBcIi4vZG9tX3N0dWZmXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5sZXQgYWxsV29yZHMgPSBnZXRTdG9yYWdlRGF0YShcIndvcmRzQXJyYXlcIik7XG5cbmxldCBnYW1lQXJyYXkgPSBbXTtcbmxldCBjb3JyZWN0QXJyYXkgPSBbXTtcbmxldCB3cm9uZ0FycmF5ID0gW107XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoXG4gIGdhbWVBcnJheSxcbiAgY29ycmVjdEFycmF5LFxuICB3cm9uZ0FycmF5LFxuICAwLFxuICBnZXRTdG9yYWdlRGF0YShcImhpU2NvcmVcIilcbik7XG5cbmxldCBjb250YWluZXJCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJfYm9keVwiKTtcbmxldCBhZGRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lci1hZGRcIik7XG5sZXQgZHJvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGJ0blwiKTtcbmxldCBhZGRXb3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRfd29yZFwiKTtcbmxldCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbFwiKTtcbmxldCBhZGRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkFkZFwiKTtcbmxldCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnRuXCIpO1xubGV0IGlucHV0QW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dF9hbnN3ZXJcIik7XG5sZXQgd29yZE9uU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JkT25TY3JlZW5cIik7XG5sZXQgY3VycmVudFNjb3JlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRfc2NvcmVfdmFsdWVcIik7XG5sZXQgaGlTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoX3Njb3JlX3ZhbHVlXCIpO1xubGV0IGxpc3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNlZVdvcmRzQnRuXCIpO1xuXG5sZXQgbXlGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1cIik7XG5cbmhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcblxuY29udGFpbmVyQm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvd1wiKSB7XG4gICAgY29uc29sZS5sb2coZS50YXJnZXQucGFyZW50Tm9kZS5yb3dJbmRleCk7XG4gICAgb3BlbkZvcm0oKTtcbiAgfVxufSk7XG5cbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcbiAgZ2FtZS5zdGFydEdhbWUoYWxsV29yZHMsIGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgfVxufSk7XG5cbmxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xufSk7XG5cbmFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGFkZEZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVdvcmQoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgYWRkRm9ybS5yZXNldCgpO1xuICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzKTtcbiAgfVxufSk7XG5cbmlucHV0QW5zd2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLmNvbXBhcmVXb3JkcyhpbnB1dEFuc3dlcik7XG4gICAgZ2FtZS51cGRhdGVTY29yZShjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgICBnYW1lLnVwZGF0ZUxvY2FsU3RvcmFnZShcImhpU2NvcmVcIik7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiRE9ORSFcIjtcbiAgICB9XG4gICAgaW5wdXRBbnN3ZXIudmFsdWUgPSBcIlwiO1xuICB9XG59KTtcblxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGJ0blwiKSkge1xuICAgIGxldCBkcm9wZG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd24tY29udGVudFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wZW5Ecm9wZG93biA9IGRyb3Bkb3duc1tpXTtcbiAgICAgIGlmIChvcGVuRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5kcm9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93RHJvcERvd24pO1xuXG5hZGRXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIG9wZW5Gb3JtKG15Rm9ybSk7XG59KTtcblxuY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsb3NlRm9ybShteUZvcm0pO1xufSk7XG5cbmZ1bmN0aW9uIGFkZFRvTG9jYWxTdG9yYWdlKG5hbWUsIGFycikge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShhcnIpKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RvcmFnZURhdGEobmFtZSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShuYW1lKSB8fCBcIltdXCIpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9