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
    console.log(index);
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
  const searchString = e.target.value;
  const filteredWords = allWords.filter((word) => {
    return (
      word.nedWord.includes(searchString) || word.natWord.includes(searchString)
    );
  });
  (0,_dom_stuff__WEBPACK_IMPORTED_MODULE_1__.renderWords)(filteredWords);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VTtBQUNkO0FBQ0E7QUFDQSxJQUFJLHVEQUFXO0FBQ2Y7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFLHVEQUFXO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0NBQWtDLG9EQUFZOztBQUU5QztBQUNBLEVBQUUsb0RBQVE7QUFDVixDQUFDOztBQUVEO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2RvbV9zdHVmZi5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvd29yZF9jcmVhdG9yLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2FkZFwiKTtcbmxldCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5sZXQgY29udGFpbmVyR2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyX2dhbWVcIik7XG5cbmxldCBoZWFkZXJzID0gW1wiVHlwZVwiLCBcIkRFL0hFVFwiLCBcIldvcmRcIiwgXCJZb3VyIE1lYW5pbmdcIiwgXCJzY29yZVwiXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Gb3JtKGh0bWxFbGVtZW50KSB7XG4gIGh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUZvcm0oaHRtbEVsZW1lbnQpIHtcbiAgaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vKiBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLFxudG9nZ2xlIGJldHdlZW4gaGlkaW5nIGFuZCBzaG93aW5nIHRoZSBkcm9wZG93biBjb250ZW50ICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Ryb3BEb3duKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RHJvcGRvd25cIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXb3JkcyhhcnIpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuXG4gIGxldCB0YWJsZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRhYmxlV3JhcHBlci5pZCA9IFwidGFibGVXcmFwcGVyXCI7XG4gIHRhYmxlLmlkID0gXCJ3b3Jkc1RhYmxlXCI7XG5cbiAgaGVhZGVycy5mb3JFYWNoKChoZWFkZXJUZXh0KSA9PiB7XG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoZWFkZXJUZXh0KTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICB9KTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcblxuICBhcnIuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgcm93LmlkID0gd29yZC5uZWRXb3JkO1xuICAgIE9iamVjdC52YWx1ZXMod29yZCkuZm9yRWFjaCgodGV4dCkgPT4ge1xuICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgIH0pO1xuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XG4gIH0pO1xuICB0YWJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKHRhYmxlV3JhcHBlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJHYW1lSW5mbygpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckdhbWUpO1xufVxuXG5mdW5jdGlvbiBlbXB0eU5vZGUobm9kZSkge1xuICB3aGlsZSAobm9kZS5sYXN0RWxlbWVudENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RFbGVtZW50Q2hpbGQpO1xuICB9XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoYWRkRm9ybSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoZWRpdEZvcm0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVJZCgpIHtcbiAgY29uc3QgY2hhcmFjdGVycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiO1xuICBjb25zdCBsZW5ndGggPSA1O1xuICBsZXQgcmFuZG9tU3RyID0gXCJcIjtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVycy5sZW5ndGgpO1xuICAgIHJhbmRvbVN0ciArPSBjaGFyYWN0ZXJzW3JhbmRvbU51bV07XG4gIH1cbiAgcmV0dXJuIHJhbmRvbVN0cjtcbn1cbiIsImV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoZ2FtZUFycmF5LCBjb3JyZWN0QXJyYXksIHdyb25nQXJyYXksIGN1cnJlbnRTY29yZSwgaGlTY29yZSkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gZ2FtZUFycmF5O1xuICAgIHRoaXMuY29ycmVjdEFycmF5ID0gY29ycmVjdEFycmF5O1xuICAgIHRoaXMud3JvbmdBcnJheSA9IHdyb25nQXJyYXk7XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSBjdXJyZW50U2NvcmU7XG4gICAgdGhpcy5oaVNjb3JlID0gaGlTY29yZTtcbiAgfVxuXG4gIHN0YXJ0R2FtZShhbGxXb3JkcywgaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmdhbWVBcnJheSA9IFsuLi5hbGxXb3Jkc107XG4gICAgdGhpcy5jdXJyZW50U2NvcmUgPSAwO1xuICAgIHRoaXMudXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpO1xuICB9XG5cbiAgY29tcGFyZVdvcmRzKGlucHV0KSB7XG4gICAgaWYgKHRoaXMuZ2FtZUFycmF5WzBdLm5hdFdvcmQgPT09IGlucHV0LnZhbHVlKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFBvaW50VG9TY29yZSgpO1xuICAgICAgdGhpcy5hZGRUb0NvcnJlY3RBcnJheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFRvV3JvbmdBcnJheSgpO1xuICAgIH1cbiAgfVxuXG4gIG5leHRXb3JkKGh0bWxFbGVtZW50KSB7XG4gICAgcmV0dXJuIChodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IHRoaXMuZ2FtZUFycmF5WzBdLm5lZFdvcmQpO1xuICB9XG5cbiAgYWRkUG9pbnRUb1Njb3JlKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZSsrO1xuICB9XG5cbiAgdXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmNoZWNrRm9ySGlzY29yZSgpO1xuICAgIGh0bWxFbGVtZW50Qy50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudFNjb3JlO1xuICAgIGh0bWxFbGVtZW50SC50ZXh0Q29udGVudCA9IHRoaXMuaGlTY29yZTtcbiAgfVxuXG4gIGNoZWNrRm9ySGlzY29yZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NvcmUgPj0gdGhpcy5oaVNjb3JlKSB7XG4gICAgICB0aGlzLmhpU2NvcmUgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICB9XG4gIH1cblxuICBhZGRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUrKztcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheVswXS52YWx1ZS0tO1xuICB9XG5cbiAgcmVtb3ZlRmlyc3RPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNoaWZ0KCk7XG4gIH1cblxuICBhZGRUb0NvcnJlY3RBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JyZWN0QXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG5cbiAgYWRkVG9Xcm9uZ0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLndyb25nQXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG4gIHJhbmRvbWl6ZUFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zb3J0KChhLCBiKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgfVxuICB1cGRhdGVMb2NhbFN0b3JhZ2UobmFtZSkge1xuICAgIHJldHVybiBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeSh0aGlzLmhpU2NvcmUpKTtcbiAgfVxufVxuXG4vLyBmdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShuYW1lLCBvYmpLZXkpIHtcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkob2JqS2V5KSk7XG4vLyB9XG4iLCJsZXQgdHlwZU9mV29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZU9mV29yZF9lZGl0XCIpO1xubGV0IGRlT2ZIZXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRlT2ZIZXRfZWRpdFwiKTtcbmxldCBkV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfZWRpdFwiKTtcbmxldCBuV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXRpdmVXb3JkX2lucHV0X2VkaXRcIik7XG5cbmNsYXNzIFdvcmQge1xuICBjb25zdHJ1Y3Rvcih3VHlwZSwgd0FydGljbGUsIG5lZFdvcmQsIG5hdFdvcmQsIHZhbHVlKSB7XG4gICAgdGhpcy53VHlwZSA9IHdUeXBlO1xuICAgIHRoaXMud0FydGljbGUgPSB3QXJ0aWNsZTtcbiAgICB0aGlzLm5lZFdvcmQgPSBuZWRXb3JkO1xuICAgIHRoaXMubmF0V29yZCA9IG5hdFdvcmQ7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkKGFycikge1xuICBsZXQgdHlwZU9mV29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZU9mV29yZF9hZGRcIikudmFsdWU7XG4gIGxldCBkZU9mSGV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZU9mSGV0X2FkZFwiKS52YWx1ZTtcbiAgbGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9hZGRcIikudmFsdWU7XG4gIGxldCBuV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXRpdmVXb3JkX2lucHV0X2FkZFwiKS52YWx1ZTtcbiAgLy9cbiAgbGV0IG5ld1dvcmQgPSBuZXcgV29yZCh0eXBlT2ZXb3JkLCBkZU9mSGV0LCBkV29yZElucHV0LCBuV29yZElucHV0LCAwKTtcbiAgLy9cbiAgaWYgKGFyci5zb21lKChlKSA9PiBlLm5lZFdvcmQgPT09IGAke2RXb3JkSW5wdXR9YCkpIHtcbiAgICBhbGVydChcIndvcmQgaXMgYWxyZWFkeSBoZXJlXCIpO1xuICB9IGVsc2Uge1xuICAgIGFyci5wdXNoKG5ld1dvcmQpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludFdvcmRJbmZvKGFycmF5LCBpbmRleCkge1xuICB0eXBlT2ZXb3JkLnZhbHVlID0gYXJyYXlbaW5kZXhdLndUeXBlO1xuICBkZU9mSGV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLndBcnRpY2xlO1xuICBkV29yZElucHV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLm5lZFdvcmQ7XG4gIG5Xb3JkSW5wdXQudmFsdWUgPSBhcnJheVtpbmRleF0ubmF0V29yZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEVkaXQoYXJyYXksIGluZGV4KSB7XG4gIGFycmF5W2luZGV4XS53VHlwZSA9IHR5cGVPZldvcmQudmFsdWU7XG4gIGFycmF5W2luZGV4XS53QXJ0aWNsZSA9IGRlT2ZIZXQudmFsdWU7XG4gIGFycmF5W2luZGV4XS5uZWRXb3JkID0gZFdvcmRJbnB1dC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLm5hdFdvcmQgPSBuV29yZElucHV0LnZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmluZEluZGV4KGFyciwgdGFyZ2V0KSB7XG4gIGxldCBwb3MgPSBhcnJcbiAgICAubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICByZXR1cm4gZS5pZDtcbiAgICB9KVxuICAgIC5pbmRleE9mKHBhcnNlSW50KHRhcmdldCkpO1xuICByZXR1cm4gcG9zO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBjcmVhdGVXb3JkLFxuICBwcmludFdvcmRJbmZvLFxuICBzdWJtaXRFZGl0LFxuICBmaW5kSW5kZXgsXG59IGZyb20gXCIuL3dvcmRfY3JlYXRvclwiO1xuaW1wb3J0IHtcbiAgb3BlbkZvcm0sXG4gIGNsb3NlRm9ybSxcbiAgc2hvd0Ryb3BEb3duLFxuICByZW5kZXJHYW1lSW5mbyxcbiAgcmVuZGVyV29yZHMsXG59IGZyb20gXCIuL2RvbV9zdHVmZlwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcblxubGV0IGFsbFdvcmRzID0gZ2V0U3RvcmFnZURhdGEoXCJ3b3Jkc0FycmF5XCIpO1xuXG5sZXQgZ2FtZUFycmF5ID0gW107XG5sZXQgY29ycmVjdEFycmF5ID0gW107XG5sZXQgd3JvbmdBcnJheSA9IFtdO1xuXG5sZXQgZ2FtZSA9IG5ldyBHYW1lKFxuICBnYW1lQXJyYXksXG4gIGNvcnJlY3RBcnJheSxcbiAgd3JvbmdBcnJheSxcbiAgMCxcbiAgZ2V0U3RvcmFnZURhdGEoXCJoaVNjb3JlXCIpXG4pO1xuXG5sZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybV9jb250YWluZXJcIik7XG5sZXQgZHJvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGJ0blwiKTtcbmxldCBhZGRXb3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRfd29yZFwiKTtcblxubGV0IGFkZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQWRkX2FkZFwiKTtcbi8vIGxldCBlZGl0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5BZGRfZWRpdFwiKTtcblxubGV0IGNhbmNlbEJ0bkFkZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQ2FuY2VsX2FkZFwiKTtcbmxldCBjYW5jZWxCdG5FZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5DYW5jZWxfZWRpdFwiKTtcblxubGV0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdG5cIik7XG5sZXQgaW5wdXRBbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0X2Fuc3dlclwiKTtcbmxldCB3b3JkT25TY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndvcmRPblNjcmVlblwiKTtcbmxldCBjdXJyZW50U2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudF9zY29yZV92YWx1ZVwiKTtcbmxldCBoaVNjb3JlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2hfc2NvcmVfdmFsdWVcIik7XG5sZXQgbGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VlV29yZHNCdG5cIik7XG5cbmxldCBteUZvcm1BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9lZGl0XCIpO1xuXG5sZXQgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCYXJcIik7XG5cbmhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcblxubGV0IGluZGV4ID0gdW5kZWZpbmVkO1xuXG5jb250YWluZXJCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT09IFwicm93XCIpIHtcbiAgICBpbmRleCA9IGFsbFdvcmRzLmZpbmRJbmRleCgod29yZCkgPT4ge1xuICAgICAgcmV0dXJuIHdvcmQubmVkV29yZCA9PT0gYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gO1xuICAgIH0pO1xuICAgIHByaW50V29yZEluZm8oYWxsV29yZHMsIGluZGV4KTtcbiAgICBvcGVuRm9ybShlZGl0Rm9ybSk7XG4gICAgY29uc29sZS5sb2coaW5kZXgpO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImJ0bkFkZF9lZGl0XCIpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc3VibWl0RWRpdChhbGxXb3JkcywgaW5kZXgpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xuICAgIGNsb3NlRm9ybShlZGl0Rm9ybSk7XG4gIH1cbn0pO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlckdhbWVJbmZvKCk7XG4gIGdhbWUuc3RhcnRHYW1lKGFsbFdvcmRzLCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgIGdhbWUucmFuZG9taXplQXJyYXkoKTtcbiAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbik7XG4gIH1cbn0pO1xuXG5saXN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlcldvcmRzKGFsbFdvcmRzLCBjb250YWluZXJCb2R5KTtcbn0pO1xuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChhZGRGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVXb3JkKGFsbFdvcmRzKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGFkZEZvcm0ucmVzZXQoKTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3Jkcyk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIpO1xuICAgIGdhbWUudXBkYXRlU2NvcmUoY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gICAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkRPTkUhXCI7XG4gICAgfVxuICAgIGlucHV0QW5zd2VyLnZhbHVlID0gXCJcIjtcbiAgfVxufSk7XG5cbnNlYXJjaEJhci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgKGUpID0+IHtcbiAgY29uc3Qgc2VhcmNoU3RyaW5nID0gZS50YXJnZXQudmFsdWU7XG4gIGNvbnN0IGZpbHRlcmVkV29yZHMgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgd29yZC5uZWRXb3JkLmluY2x1ZGVzKHNlYXJjaFN0cmluZykgfHwgd29yZC5uYXRXb3JkLmluY2x1ZGVzKHNlYXJjaFN0cmluZylcbiAgICApO1xuICB9KTtcbiAgcmVuZGVyV29yZHMoZmlsdGVyZWRXb3Jkcyk7XG59KTtcblxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGJ0blwiKSkge1xuICAgIGxldCBkcm9wZG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd25fY29udGVudFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wZW5Ecm9wZG93biA9IGRyb3Bkb3duc1tpXTtcbiAgICAgIGlmIChvcGVuRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5kcm9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93RHJvcERvd24pO1xuXG5hZGRXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIG9wZW5Gb3JtKG15Rm9ybUFkZCk7XG59KTtcblxuY2FuY2VsQnRuQWRkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIGNsb3NlRm9ybShteUZvcm1BZGQpO1xufSk7XG5cbmNhbmNlbEJ0bkVkaXQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xvc2VGb3JtKGVkaXRGb3JtKTtcbn0pO1xuXG5mdW5jdGlvbiBhZGRUb0xvY2FsU3RvcmFnZShuYW1lLCBhcnIpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkoYXJyKSk7XG59XG5cbmZ1bmN0aW9uIGdldFN0b3JhZ2VEYXRhKG5hbWUpIHtcbiAgcmV0dXJuIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0obmFtZSkgfHwgXCJbXVwiKTtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==