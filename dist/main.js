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
  containerBody.appendChild(editForm);
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
/* harmony export */   "printWordInfo": () => (/* binding */ printWordInfo),
/* harmony export */   "submitEdit": () => (/* binding */ submitEdit)
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

hiScoreValue.textContent = game.hiScore;

let indexx = undefined;

containerBody.addEventListener("click", function (e) {
  if (e.target.parentNode.className === "row") {
    indexx = e.target.parentNode.rowIndex - 1;
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.printWordInfo)(allWords, indexx);
    (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm)(editForm);
  }

  if (e.target.id === "btnAdd_edit") {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.submitEdit)(allWords, indexx);
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

addWord.addEventListener("click", function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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c0JBQXNCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQyxvREFBWTs7QUFFOUM7QUFDQSxFQUFFLG9EQUFRO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9kb21fc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL3dvcmRfY3JlYXRvci5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xubGV0IGFkZEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9lZGl0XCIpO1xubGV0IGNvbnRhaW5lckdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lcl9nYW1lXCIpO1xuXG5sZXQgaGVhZGVycyA9IFtcIlR5cGVcIiwgXCJERS9IRVRcIiwgXCJXb3JkXCIsIFwiWW91ciBNZWFuaW5nXCIsIFwic2NvcmVcIl07XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuRm9ybShodG1sRWxlbWVudCkge1xuICBodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VGb3JtKGh0bWxFbGVtZW50KSB7XG4gIGh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuLyogV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJ1dHRvbixcbnRvZ2dsZSBiZXR3ZWVuIGhpZGluZyBhbmQgc2hvd2luZyB0aGUgZHJvcGRvd24gY29udGVudCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dEcm9wRG93bigpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteURyb3Bkb3duXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyV29yZHMoYXJyKSB7XG4gIGVtcHR5Tm9kZShjb250YWluZXJCb2R5KTtcblxuICBsZXQgdGFibGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBsZXQgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICB0YWJsZVdyYXBwZXIuaWQgPSBcInRhYmxlV3JhcHBlclwiO1xuICB0YWJsZS5pZCA9IFwid29yZHNUYWJsZVwiO1xuXG4gIGhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyVGV4dCkgPT4ge1xuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgbGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGVhZGVyVGV4dCk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgfSk7XG4gIHRhYmxlLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG5cbiAgYXJyLmZvckVhY2goKGVtcCkgPT4ge1xuICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgT2JqZWN0LnZhbHVlcyhlbXApLmZvckVhY2goKHRleHQpID0+IHtcbiAgICAgIGxldCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRkXCIpO1xuICAgICAgbGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCk7XG4gICAgICBjZWxsLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICAgIHJvdy5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICB9KTtcbiAgICByb3cuY2xhc3NMaXN0LmFkZChcInJvd1wiKTtcbiAgICB0YWJsZS5hcHBlbmRDaGlsZChyb3cpO1xuICB9KTtcbiAgdGFibGVXcmFwcGVyLmFwcGVuZENoaWxkKHRhYmxlKTtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZCh0YWJsZVdyYXBwZXIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyR2FtZUluZm8oKSB7XG4gIGVtcHR5Tm9kZShjb250YWluZXJCb2R5KTtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChjb250YWluZXJHYW1lKTtcbn1cblxuZnVuY3Rpb24gZW1wdHlOb2RlKG5vZGUpIHtcbiAgd2hpbGUgKG5vZGUubGFzdEVsZW1lbnRDaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0RWxlbWVudENoaWxkKTtcbiAgfVxuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGFkZEZvcm0pO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGVkaXRGb3JtKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoZ2FtZUFycmF5LCBjb3JyZWN0QXJyYXksIHdyb25nQXJyYXksIGN1cnJlbnRTY29yZSwgaGlTY29yZSkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gZ2FtZUFycmF5O1xuICAgIHRoaXMuY29ycmVjdEFycmF5ID0gY29ycmVjdEFycmF5O1xuICAgIHRoaXMud3JvbmdBcnJheSA9IHdyb25nQXJyYXk7XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XG4gICAgdGhpcy5oaVNjb3JlID0gaGlTY29yZTtcbiAgfVxuXG4gIHN0YXJ0R2FtZShhbGxXb3JkcywgaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmdhbWVBcnJheSA9IFsuLi5hbGxXb3Jkc107XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xuICAgIHRoaXMudXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpO1xuICB9XG5cbiAgY29tcGFyZVdvcmRzKGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZ2FtZUFycmF5WzBdLm5hdFdvcmQgPT09IGlucHV0LnZhbHVlKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFBvaW50VG9TY29yZSgpO1xuICAgICAgdGhpcy5hZGRUb0NvcnJlY3RBcnJheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFRvV3JvbmdBcnJheSgpO1xuICAgIH1cbiAgfVxuXG4gIG5leHRXb3JkKGh0bWxFbGVtZW50KSB7XG4gICAgcmV0dXJuIChodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuZ2FtZUFycmF5WzBdLm5lZFdvcmQpO1xuICB9XG5cbiAgYWRkUG9pbnRUb1Njb3JlKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZSsrO1xuICB9XG5cbiAgdXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmNoZWNrRm9ySGlzY29yZSgpO1xuICAgIGh0bWxFbGVtZW50Qy50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudFNjb3JlO1xuICAgIGh0bWxFbGVtZW50SC50ZXh0Q29udGVudCA9IHRoaXMuaGlTY29yZTtcbiAgfVxuXG4gIGNoZWNrRm9ySGlzY29yZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NvcmUgPj0gdGhpcy5oaVNjb3JlKSB7XG4gICAgICB0aGlzLmhpU2NvcmUgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICB9XG4gIH1cblxuICBhZGRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUrKztcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheVswXS52YWx1ZS0tO1xuICB9XG5cbiAgcmVtb3ZlRmlyc3RPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNoaWZ0KCk7XG4gIH1cblxuICBhZGRUb0NvcnJlY3RBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JyZWN0QXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG5cbiAgYWRkVG9Xcm9uZ0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLndyb25nQXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG4gIHJhbmRvbWl6ZUFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zb3J0KChhLCBiKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgfVxuICB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeSh0aGlzLmhpU2NvcmUpKTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShuYW1lLCBvYmpLZXkpIHtcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkob2JqS2V5KSk7XG4vLyB9XG4iLCJsZXQgdHlwZU9mV29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZU9mV29yZF9lZGl0XCIpO1xubGV0IGRlT2ZIZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlT2ZIZXRfZWRpdFwiKTtcbmxldCBkV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfZWRpdFwiKTtcbmxldCBuV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXRpdmVXb3JkX2lucHV0X2VkaXRcIik7XG5cbmNsYXNzIFdvcmQge1xuICBjb25zdHJ1Y3Rvcih3VHlwZSwgd0FydGljbGUsIG5lZFdvcmQsIG5hdFdvcmQsIHZhbHVlKSB7XG4gICAgdGhpcy53VHlwZSA9IHdUeXBlO1xuICAgIHRoaXMud0FydGljbGUgPSB3QXJ0aWNsZTtcbiAgICB0aGlzLm5lZFdvcmQgPSBuZWRXb3JkO1xuICAgIHRoaXMubmF0V29yZCA9IG5hdFdvcmQ7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkKGFycikge1xuICBsZXQgdHlwZU9mV29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZU9mV29yZF9hZGRcIikudmFsdWU7XG4gIGxldCBkZU9mSGV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZU9mSGV0X2FkZFwiKS52YWx1ZTtcbiAgbGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9hZGRcIikudmFsdWU7XG4gIGxldCBuV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXRpdmVXb3JkX2lucHV0X2FkZFwiKS52YWx1ZTtcbiAgLy9cbiAgbGV0IG5ld1dvcmQgPSBuZXcgV29yZCh0eXBlT2ZXb3JkLCBkZU9mSGV0LCBkV29yZElucHV0LCBuV29yZElucHV0LCAwKTtcbiAgLy9cbiAgaWYgKGFyci5zb21lKChlKSA9PiBlLm5lZFdvcmQgPT09IGAke2RXb3JkSW5wdXR9YCkpIHtcbiAgICBhbGVydChcIndvcmQgaXMgYWxyZWFkeSBoZXJlXCIpO1xuICB9IGVsc2Uge1xuICAgIGFyci5wdXNoKG5ld1dvcmQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludFdvcmRJbmZvKGFycmF5LCBpbmRleCkge1xuICB0eXBlT2ZXb3JkLnZhbHVlID0gYXJyYXlbaW5kZXhdLndUeXBlO1xuICBkZU9mSGV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLndBcnRpY2xlO1xuICBkV29yZElucHV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLm5lZFdvcmQ7XG4gIG5Xb3JkSW5wdXQudmFsdWUgPSBhcnJheVtpbmRleF0ubmF0V29yZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEVkaXQoYXJyYXksIGluZGV4KSB7XG4gIGFycmF5W2luZGV4XS53VHlwZSA9IHR5cGVPZldvcmQudmFsdWU7XG4gIGFycmF5W2luZGV4XS53QXJ0aWNsZSA9IGRlT2ZIZXQudmFsdWU7XG4gIGFycmF5W2luZGV4XS5uZWRXb3JkID0gZFdvcmRJbnB1dC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLm5hdFdvcmQgPSBuV29yZElucHV0LnZhbHVlO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBjcmVhdGVXb3JkLCBwcmludFdvcmRJbmZvLCBzdWJtaXRFZGl0IH0gZnJvbSBcIi4vd29yZF9jcmVhdG9yXCI7XG5pbXBvcnQge1xuICBvcGVuRm9ybSxcbiAgY2xvc2VGb3JtLFxuICBzaG93RHJvcERvd24sXG4gIHJlbmRlckdhbWVJbmZvLFxuICByZW5kZXJXb3Jkcyxcbn0gZnJvbSBcIi4vZG9tX3N0dWZmXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5sZXQgYWxsV29yZHMgPSBnZXRTdG9yYWdlRGF0YShcIndvcmRzQXJyYXlcIik7XG5cbmxldCBnYW1lQXJyYXkgPSBbXTtcbmxldCBjb3JyZWN0QXJyYXkgPSBbXTtcbmxldCB3cm9uZ0FycmF5ID0gW107XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoXG4gIGdhbWVBcnJheSxcbiAgY29ycmVjdEFycmF5LFxuICB3cm9uZ0FycmF5LFxuICAwLFxuICBnZXRTdG9yYWdlRGF0YShcImhpU2NvcmVcIilcbik7XG5cbmxldCBjb250YWluZXJCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJfYm9keVwiKTtcbmxldCBhZGRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtX2NvbnRhaW5lclwiKTtcbmxldCBkcm9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wYnRuXCIpO1xubGV0IGFkZFdvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZF93b3JkXCIpO1xuXG5sZXQgYWRkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5BZGRfYWRkXCIpO1xuLy8gbGV0IGVkaXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkFkZF9lZGl0XCIpO1xuXG5sZXQgY2FuY2VsQnRuQWRkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5DYW5jZWxfYWRkXCIpO1xubGV0IGNhbmNlbEJ0bkVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbF9lZGl0XCIpO1xuXG5sZXQgcGxheUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheUJ0blwiKTtcbmxldCBpbnB1dEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRfYW5zd2VyXCIpO1xubGV0IHdvcmRPblNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid29yZE9uU2NyZWVuXCIpO1xubGV0IGN1cnJlbnRTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjdXJyZW50X3Njb3JlX3ZhbHVlXCIpO1xubGV0IGhpU2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaF9zY29yZV92YWx1ZVwiKTtcbmxldCBsaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWVXb3Jkc0J0blwiKTtcblxubGV0IG15Rm9ybUFkZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2FkZFwiKTtcbmxldCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5cbmhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcblxubGV0IGluZGV4eCA9IHVuZGVmaW5lZDtcblxuY29udGFpbmVyQm9keS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvd1wiKSB7XG4gICAgaW5kZXh4ID0gZS50YXJnZXQucGFyZW50Tm9kZS5yb3dJbmRleCAtIDE7XG4gICAgcHJpbnRXb3JkSW5mbyhhbGxXb3JkcywgaW5kZXh4KTtcbiAgICBvcGVuRm9ybShlZGl0Rm9ybSk7XG4gIH1cblxuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiYnRuQWRkX2VkaXRcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzdWJtaXRFZGl0KGFsbFdvcmRzLCBpbmRleHgpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xuICAgIGNsb3NlRm9ybShlZGl0Rm9ybSk7XG4gIH1cbn0pO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlckdhbWVJbmZvKCk7XG4gIGdhbWUuc3RhcnRHYW1lKGFsbFdvcmRzLCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgIGdhbWUucmFuZG9taXplQXJyYXkoKTtcbiAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbik7XG4gIH1cbn0pO1xuXG5saXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlcldvcmRzKGFsbFdvcmRzLCBjb250YWluZXJCb2R5KTtcbn0pO1xuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChhZGRGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVXb3JkKGFsbFdvcmRzKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGFkZEZvcm0ucmVzZXQoKTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3Jkcyk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIpO1xuICAgIGdhbWUudXBkYXRlU2NvcmUoY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gICAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkRPTkUhXCI7XG4gICAgfVxuICAgIGlucHV0QW5zd2VyLnZhbHVlID0gXCJcIjtcbiAgfVxufSk7XG5cbi8vIENsb3NlIHRoZSBkcm9wZG93biBtZW51IGlmIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0XG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmRyb3BidG5cIikpIHtcbiAgICBsZXQgZHJvcGRvd25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRyb3Bkb3duX2NvbnRlbnRcIik7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcm9wZG93bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICBpZiAob3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIikpIHtcbiAgICAgICAgb3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZHJvcEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd0Ryb3BEb3duKTtcblxuYWRkV29yZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBvcGVuRm9ybShteUZvcm1BZGQpO1xufSk7XG5cbmNhbmNlbEJ0bkFkZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5FZGl0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsb3NlRm9ybShlZGl0Rm9ybSk7XG59KTtcblxuZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgYXJyKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGFycikpO1xufVxuXG5mdW5jdGlvbiBnZXRTdG9yYWdlRGF0YShuYW1lKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpIHx8IFwiW11cIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=