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
  correctAnswer.textContent = "";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBVTtBQUNkO0FBQ0E7QUFDQSxJQUFJLHVEQUFXO0FBQ2Y7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxFQUFFLHVEQUFXO0FBQ2IsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFVO0FBQ2QsSUFBSSx1REFBVztBQUNmO0FBQ0EsSUFBSSxxREFBUztBQUNiO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGtDQUFrQyxvREFBWTs7QUFFOUM7QUFDQSxFQUFFLG9EQUFRO0FBQ1YsQ0FBQzs7QUFFRDtBQUNBLEVBQUUscURBQVM7QUFDWCxDQUFDOztBQUVEO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9kb21fc3R1ZmYuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2dhbWUuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL3dvcmRfY3JlYXRvci5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGNvbnRhaW5lckJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRhaW5lcl9ib2R5XCIpO1xubGV0IGFkZEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9lZGl0XCIpO1xubGV0IGNvbnRhaW5lckdhbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRhaW5lcl9nYW1lXCIpO1xuXG5sZXQgaGVhZGVycyA9IFtcbiAgXCJUeXBlXCIsXG4gIFwiREUvSEVUXCIsXG4gIFwiV29yZFwiLFxuICBcIllvdXIgTWVhbmluZ1wiLFxuICBcInNjb3JlXCIsXG4gIFwiV29vcmRlbnNib2VrIE1lYW5pbmdcIixcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBvcGVuRm9ybShodG1sRWxlbWVudCkge1xuICBodG1sRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VGb3JtKGh0bWxFbGVtZW50KSB7XG4gIGh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuLyogV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJ1dHRvbixcbnRvZ2dsZSBiZXR3ZWVuIGhpZGluZyBhbmQgc2hvd2luZyB0aGUgZHJvcGRvd24gY29udGVudCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dEcm9wRG93bigpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteURyb3Bkb3duXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyV29yZHMoYXJyKSB7XG4gIGVtcHR5Tm9kZShjb250YWluZXJCb2R5KTtcblxuICBsZXQgdGFibGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGV0IHRhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRhYmxlXCIpO1xuICBsZXQgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICB0YWJsZVdyYXBwZXIuaWQgPSBcInRhYmxlV3JhcHBlclwiO1xuICB0YWJsZS5pZCA9IFwid29yZHNUYWJsZVwiO1xuXG4gIGhlYWRlcnMuZm9yRWFjaCgoaGVhZGVyVGV4dCkgPT4ge1xuICAgIGxldCBoZWFkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGhcIik7XG4gICAgbGV0IHRleHROb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoaGVhZGVyVGV4dCk7XG4gICAgaGVhZGVyLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcbiAgfSk7XG4gIHRhYmxlLmFwcGVuZENoaWxkKGhlYWRlclJvdyk7XG5cbiAgYXJyLmZvckVhY2goKHdvcmQpID0+IHtcbiAgICBsZXQgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRyXCIpO1xuICAgIHJvdy5pZCA9IHdvcmQubmVkV29yZDtcbiAgICBsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuICAgIGxpbmsudGV4dCA9IFwiU2VhcmNoXCI7XG4gICAgbGluay5ocmVmID0gY3JlYXRlV29yZExpbmsod29yZCk7XG4gICAgbGluay50YXJnZXQgPSBcIl9ibGFua1wiO1xuICAgIE9iamVjdC52YWx1ZXMod29yZCkuZm9yRWFjaCgodGV4dCkgPT4ge1xuICAgICAgbGV0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XG4gICAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KTtcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgICAgcm93LmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9KTtcblxuICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicm93XCIpO1xuICAgIHRhYmxlLmFwcGVuZENoaWxkKHJvdyk7XG5cbiAgICBpZiAod29yZC52YWx1ZSA8IDApIHtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwibmVnYXRpdmVTY29yZVwiKTtcbiAgICB9IGVsc2UgaWYgKHdvcmQudmFsdWUgPiAwKSB7XG4gICAgICByb3cuY2xhc3NMaXN0LmFkZChcInBvc2l0aXZlU2NvcmVcIik7XG4gICAgfVxuICB9KTtcblxuICB0YWJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQodGFibGUpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKHRhYmxlV3JhcHBlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJHYW1lSW5mbygpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lckdhbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVuZGVyR2FtZVJ1bGVzKCkge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG5cbiAgbGV0IHJ1bGVzVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gIHJ1bGVzVGl0bGUudGV4dENvbnRlbnQgPSBcIlJ1bGVzICYgR2VuZXJhbCBJbmZvXCI7XG4gIHJ1bGVzVGl0bGUuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChydWxlc1RpdGxlKTtcblxuICBsZXQgcnVsZXNVTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgcnVsZXNVTC50ZXh0Q29udGVudCA9IFwiU29tZSBSdWxlc1wiO1xuICBydWxlc1VMLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQocnVsZXNVTCk7XG5cbiAgcnVsZUNyZWF0b3IoXCJGaXJzdCBhZGQgYXMgbWFueSB3b3JkcyB5b3Ugd2FudC5cIiwgcnVsZXNVTCk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiVGhlbiBoZWFkIHRvIE1FTlUgLT4gUGxheSBBbGwgV29yZHMgdG8gc3RhcnQgYSBuZXcgZ2FtZSB3aXRoIGFsbCB0aGUgd29yZHMgeW91IGFkZGVkLlwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJUaGUgZ2FtZSBjb25zaXN0cyBvbiBtYXRjaGluZyB0aGUgRHV0Y2ggV29yZCB3aXRoIHlvdXIgb3duIE1lYW5pbmcuIFBBUyBPUCEgUHJvbnVuY2lhdGlvbiBjb3VudHMuXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIkNvcnJlY3QgYW5zd2VycyB3aWxsIGVhcm4geW91IGEgcG9pbnQsIHdoaWxlIGluY29ycmVjdCB3aWxsIG5vdC5cIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQXMgeW91IHBsYXkgdGhyb3VnaCwgZGVwZW5kaW5nIG9uIHdldGhlciB0aGUgYW5zd2VyIHdhcyBjb3JyZWN0IG9yIG5vdCwgZWFjaCBpbmRpdmlkdWFsIHdvcmQgd2lsbCBiZSBnYWluaW5nIG9yIGxvb3NpbmcgYSB2YWx1ZS9zY29yZS5cIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiWW91IGNhbiBwbGF5IHRoaXMgbW9kZSBhcyBtYW55IHRpbWVzIHlvdSB3YW50LCB3aXRoIGhvdyBtYW55IHdvcmRzIHlvdSB3YW50LiBUaGUgbW9yZSB3b3JkcyB5b3UgYWRkIHRoZSBiZXR0ZXIhXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIlRoZSBzZWNvbmQgbW9kZSwgUGxheSBXcm9uZyBXb3JkcywgbGV0cyB5b3UgcHJhY3RpY2Ugb24gdGhlIHdvcmRzIHlvdSBhcmUgbGVzcyBzdHJvbmcgKG9yIGhhdmUgbmVnYXRpdmUgdmFsdWUvc2NvcmUpXCIsXG4gICAgcnVsZXNVTFxuICApO1xuXG4gIGxldCBpbmZvVUwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidWxcIik7XG4gIGluZm9VTC50ZXh0Q29udGVudCA9IFwiU29tZSBJbmZvXCI7XG4gIGluZm9VTC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGluZm9VTCk7XG5cbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJBbGwgd29yZHMgdGhhdCB5b3UgY3JlYXRlIHdpbGwgYmUgc3RvcmVkIG9uIHRoZSBsb2NhbFN0b3JhZ2Ugb2YgdGhlIGJyb3dzZXIgeW91IGNyZWF0ZWQgdGhlbSB3aXRoLlwiLFxuICAgIGluZm9VTFxuICApO1xuXG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQmVjYXVzZSB0aGUgZGF0YSBpcyBzdG9yZWQgb24geW91ciBvd24gYnJvd3NlciBzdG9yYWdlLCB0cnkgYW5kIGRvbid0IGRlbGV0ZSBpdCBieSBnb2luZyBpbnRvIGJyb3dzZXIgc2V0dGluZ3MvaGlzdG9yeS9kYXRhIGV0Yy5cIixcbiAgICBpbmZvVUxcbiAgKTtcblxuICBydWxlQ3JlYXRvcihcbiAgICBcIldpdGhpbiB0aGUgTGlzdCB5b3UgY2FuIGNsaWNrIGVhY2ggZWxlbWVudCBhbmQgRWRpdC9EZWxldGUgaXRzIGNvbnRlbnRzIGluIGNhc2UgeW91IG1hZGUgYSBtaXN0YWtlIG9yIHdpc2ggdG8gY2hhbmdlIHRoZSBtZWFuaW5nIG9mIGl0LlwiLFxuICAgIGluZm9VTFxuICApO1xuXG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQmVjYXVzZSB0aGUgTGlzdCBtaWdodCBnZXQgdG9vIGxvbmcsIHlvdSBjYW4gdXNlIHRoZSBTZWFyY2ggZmVhdHVyZSB0byBmaWx0ZXIgdGhyb3VnaCBhbGwgd29yZHMhXCIsXG4gICAgaW5mb1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFwiQ2xpY2sgb24gSGlzY29yZSB0byByZXNldCB0aGUgbnVtYmVyIGJhY2sgdG8gMC5cIiwgaW5mb1VMKTtcbn1cblxuZnVuY3Rpb24gZW1wdHlOb2RlKG5vZGUpIHtcbiAgd2hpbGUgKG5vZGUubGFzdEVsZW1lbnRDaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5sYXN0RWxlbWVudENoaWxkKTtcbiAgfVxuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGFkZEZvcm0pO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKGVkaXRGb3JtKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlV29yZExpbmsod29yZCkge1xuICByZXR1cm4gYGh0dHBzOi8vd3d3Lndvb3JkZW4ub3JnL3dvb3JkLyR7d29yZC5uZWRXb3JkfWA7XG59XG5cbmZ1bmN0aW9uIHJ1bGVDcmVhdG9yKGluZm8sIHBhcmVudE5vZGUpIHtcbiAgbGV0IHJ1bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIHBhcmVudE5vZGUuYXBwZW5kQ2hpbGQocnVsZSk7XG4gIHJ1bGUudGV4dENvbnRlbnQgPSBpbmZvO1xufVxuXG4vLyBmdW5jdGlvbiBjcmVhdGVJZCgpIHtcbi8vICAgY29uc3QgY2hhcmFjdGVycyA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5elwiO1xuLy8gICBjb25zdCBsZW5ndGggPSA1O1xuLy8gICBsZXQgcmFuZG9tU3RyID0gXCJcIjtcblxuLy8gICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4vLyAgICAgY29uc3QgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcmFjdGVycy5sZW5ndGgpO1xuLy8gICAgIHJhbmRvbVN0ciArPSBjaGFyYWN0ZXJzW3JhbmRvbU51bV07XG4vLyAgIH1cbi8vICAgcmV0dXJuIHJhbmRvbVN0cjtcbi8vIH1cbiIsImV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3IoZ2FtZUFycmF5LCBjdXJyZW50U2NvcmUsIGhpU2NvcmUpIHtcbiAgICB0aGlzLmdhbWVBcnJheSA9IGdhbWVBcnJheTtcbiAgICB0aGlzLmN1cnJlbnRTY29yZSA9IGN1cnJlbnRTY29yZTtcbiAgICB0aGlzLmhpU2NvcmUgPSBoaVNjb3JlO1xuICB9XG5cbiAgc3RhcnRHYW1lKGFycmF5LCBodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gWy4uLmFycmF5XTtcbiAgICB0aGlzLmN1cnJlbnRTY29yZSA9IDA7XG4gICAgdGhpcy51cGRhdGVTY29yZShodG1sRWxlbWVudEMsIGh0bWxFbGVtZW50SCk7XG4gIH1cblxuICBjb21wYXJlV29yZHMoaW5wdXQsIGh0bWxFbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuZ2FtZUFycmF5WzBdLm5hdFdvcmQgPT09IGlucHV0LnZhbHVlKSB7XG4gICAgICB0aGlzLmFkZFZhbHVlKCk7XG4gICAgICB0aGlzLmFkZFBvaW50VG9TY29yZSgpO1xuICAgICAgaHRtbEVsZW1lbnQudGV4dENvbnRlbnQgPSBgQ29ycmVjdCEgJHt0aGlzLmRpc3BsYXlDb3JyZWN0QW5zd2VyKCl9IFlvdXIgQW5zd2VyIC0+ICR7XG4gICAgICAgIGlucHV0LnZhbHVlXG4gICAgICB9YDtcbiAgICAgIHRoaXMuYWRkQ29ycmVjdEljb24oaHRtbEVsZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlbW92ZVZhbHVlKCk7XG4gICAgICBodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IGBXcm9uZyEgJHt0aGlzLmRpc3BsYXlDb3JyZWN0QW5zd2VyKCl9IFlvdXIgQW5zd2VyIC0+ICR7XG4gICAgICAgIGlucHV0LnZhbHVlXG4gICAgICB9YDtcbiAgICAgIHRoaXMuYWRkV3JvbmdJY29uKGh0bWxFbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICBkaXNwbGF5Q29ycmVjdEFuc3dlcigpIHtcbiAgICByZXR1cm4gYENvcnJlY3QgQW5zd2VyIC0+ICAke3RoaXMuZ2FtZUFycmF5WzBdLm5hdFdvcmR9YDtcbiAgfVxuXG4gIG5leHRXb3JkKGh0bWxFbGVtZW50KSB7XG4gICAgcmV0dXJuIChodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IGAke1xuICAgICAgdGhpcy5nYW1lQXJyYXlbMF0ubmVkV29yZFxuICAgIH0gICAgICAgIC8ke3RoaXMucmVtYWluaW5nV29yZHMoKX1gKTtcbiAgfVxuXG4gIGFkZFBvaW50VG9TY29yZSgpIHtcbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U2NvcmUrKztcbiAgfVxuXG4gIHVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5jaGVja0Zvckhpc2NvcmUoKTtcbiAgICBodG1sRWxlbWVudEMudGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICBodG1sRWxlbWVudEgudGV4dENvbnRlbnQgPSB0aGlzLmhpU2NvcmU7XG4gIH1cblxuICBjaGVja0Zvckhpc2NvcmUoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFNjb3JlID49IHRoaXMuaGlTY29yZSkge1xuICAgICAgdGhpcy5oaVNjb3JlID0gdGhpcy5jdXJyZW50U2NvcmU7XG4gICAgfVxuICB9XG5cbiAgYWRkVmFsdWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5WzBdLnZhbHVlKys7XG4gIH1cblxuICByZW1vdmVWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUtLTtcbiAgfVxuXG4gIHJlbW92ZUZpcnN0T2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheS5zaGlmdCgpO1xuICB9XG5cbiAgcmFuZG9taXplQXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNvcnQoKGEsIGIpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuICB9XG4gIHVwZGF0ZUxvY2FsU3RvcmFnZShuYW1lKSB7XG4gICAgcmV0dXJuIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KHRoaXMuaGlTY29yZSkpO1xuICB9XG5cbiAgcmVtYWluaW5nV29yZHMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5Lmxlbmd0aC50b1N0cmluZygpO1xuICB9XG5cbiAgYWRkQ29ycmVjdEljb24oaHRtbEVsZW1lbnQpIHtcbiAgICBsZXQgaWNvbkMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBpY29uQy50ZXh0Q29udGVudCA9IFwiY2hlY2tcIjtcbiAgICBpY29uQy5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIik7XG4gICAgaWNvbkMuc3R5bGUuY29sb3IgPSBcImdyZWVuXCI7XG4gICAgaWNvbkMuc3R5bGUuZm9udFNpemUgPSBcIjU1cHhcIjtcbiAgICBodG1sRWxlbWVudC5hcHBlbmRDaGlsZChpY29uQyk7XG4gIH1cblxuICBhZGRXcm9uZ0ljb24oaHRtbEVsZW1lbnQpIHtcbiAgICBsZXQgaWNvblcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICBpY29uVy50ZXh0Q29udGVudCA9IFwiY2xlYXJcIjtcbiAgICBpY29uVy5jbGFzc0xpc3QuYWRkKFwibWF0ZXJpYWwtaWNvbnMtb3V0bGluZWRcIik7XG4gICAgaWNvblcuc3R5bGUuY29sb3IgPSBcInJlZFwiO1xuICAgIGljb25XLnN0eWxlLmZvbnRTaXplID0gXCI1NXB4XCI7XG4gICAgaHRtbEVsZW1lbnQuYXBwZW5kQ2hpbGQoaWNvblcpO1xuICB9XG59XG5cbi8vIGZ1bmN0aW9uIGFkZFRvTG9jYWxTdG9yYWdlKG5hbWUsIG9iaktleSkge1xuLy8gICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShuYW1lLCBKU09OLnN0cmluZ2lmeShvYmpLZXkpKTtcbi8vIH1cbiIsImxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkX2VkaXRcIik7XG5sZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldF9lZGl0XCIpO1xubGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9lZGl0XCIpO1xubGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRfZWRpdFwiKTtcblxuY2xhc3MgV29yZCB7XG4gIGNvbnN0cnVjdG9yKHdUeXBlLCB3QXJ0aWNsZSwgbmVkV29yZCwgbmF0V29yZCwgdmFsdWUsIGxpbmspIHtcbiAgICB0aGlzLndUeXBlID0gd1R5cGU7XG4gICAgdGhpcy53QXJ0aWNsZSA9IHdBcnRpY2xlO1xuICAgIHRoaXMubmVkV29yZCA9IG5lZFdvcmQ7XG4gICAgdGhpcy5uYXRXb3JkID0gbmF0V29yZDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5saW5rID0gbGluaztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yZChhcnIpIHtcbiAgbGV0IHR5cGVPZldvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cGVPZldvcmRfYWRkXCIpLnZhbHVlO1xuICBsZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldF9hZGRcIikudmFsdWU7XG4gIGxldCBkV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfYWRkXCIpLnZhbHVlO1xuICBsZXQgbldvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF0aXZlV29yZF9pbnB1dF9hZGRcIikudmFsdWU7XG4gIC8vXG4gIGxldCBuZXdXb3JkID0gbmV3IFdvcmQoXG4gICAgdHlwZU9mV29yZCxcbiAgICBkZU9mSGV0LFxuICAgIGRXb3JkSW5wdXQsXG4gICAgbldvcmRJbnB1dCxcbiAgICAwLFxuICAgIFwiTWVhbmluZyBpbiBXb29yZGVuIC0gPiBcIlxuICApO1xuICAvL1xuICBpZiAoYXJyLnNvbWUoKGUpID0+IGUubmVkV29yZCA9PT0gYCR7ZFdvcmRJbnB1dH1gKSkge1xuICAgIGFsZXJ0KFwid29yZCBpcyBhbHJlYWR5IGhlcmVcIik7XG4gIH0gZWxzZSB7XG4gICAgYXJyLnB1c2gobmV3V29yZCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVdvcmQoYXJyYXksIGluZGV4KSB7XG4gIHJldHVybiBhcnJheS5zcGxpY2UoaW5kZXgsIDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRXb3JkSW5mbyhhcnJheSwgaW5kZXgpIHtcbiAgdHlwZU9mV29yZC52YWx1ZSA9IGFycmF5W2luZGV4XS53VHlwZTtcbiAgZGVPZkhldC52YWx1ZSA9IGFycmF5W2luZGV4XS53QXJ0aWNsZTtcbiAgZFdvcmRJbnB1dC52YWx1ZSA9IGFycmF5W2luZGV4XS5uZWRXb3JkO1xuICBuV29yZElucHV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLm5hdFdvcmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdWJtaXRFZGl0KGFycmF5LCBpbmRleCwgaW5wdXQpIHtcbiAgYXJyYXlbaW5kZXhdLndUeXBlID0gdHlwZU9mV29yZC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLndBcnRpY2xlID0gZGVPZkhldC52YWx1ZTtcbiAgYXJyYXlbaW5kZXhdLm5lZFdvcmQgPSBkV29yZElucHV0LnZhbHVlO1xuICBhcnJheVtpbmRleF0ubmF0V29yZCA9IG5Xb3JkSW5wdXQudmFsdWU7XG5cbiAgLy8gaWYgKGFycmF5LnNvbWUoKGUpID0+IGUubmVkV29yZCA9PT0gaW5wdXQudmFsdWUpKSB7XG4gIC8vICAgYWxlcnQoXCJ3b3JkIGlzIGFscmVhZHkgaGVyZVwiKTtcbiAgLy8gfSBlbHNlIHtcbiAgLy8gICBhcnJheVtpbmRleF0ud1R5cGUgPSB0eXBlT2ZXb3JkLnZhbHVlO1xuICAvLyAgIGFycmF5W2luZGV4XS53QXJ0aWNsZSA9IGRlT2ZIZXQudmFsdWU7XG4gIC8vICAgYXJyYXlbaW5kZXhdLm5lZFdvcmQgPSBkV29yZElucHV0LnZhbHVlO1xuICAvLyAgIGFycmF5W2luZGV4XS5uYXRXb3JkID0gbldvcmRJbnB1dC52YWx1ZTtcbiAgLy8gfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge1xuICBjcmVhdGVXb3JkLFxuICBwcmludFdvcmRJbmZvLFxuICBkZWxldGVXb3JkLFxuICBzdWJtaXRFZGl0LFxufSBmcm9tIFwiLi93b3JkX2NyZWF0b3JcIjtcbmltcG9ydCB7XG4gIG9wZW5Gb3JtLFxuICBjbG9zZUZvcm0sXG4gIHNob3dEcm9wRG93bixcbiAgcmVuZGVyR2FtZUluZm8sXG4gIHJlbmRlcldvcmRzLFxuICByZW5kZXJHYW1lUnVsZXMsXG59IGZyb20gXCIuL2RvbV9zdHVmZlwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcblxubGV0IGFsbFdvcmRzID0gZ2V0U3RvcmFnZURhdGEoXCJ3b3Jkc0FycmF5XCIpO1xuXG5sZXQgZ2FtZUFycmF5ID0gW107XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoZ2FtZUFycmF5LCAwLCBnZXRTdG9yYWdlRGF0YShcImhpU2NvcmVcIikpO1xuXG5sZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5cbmxldCBhZGRGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmb3JtX2NvbnRhaW5lcl9hZGRcIik7XG5sZXQgZWRpdEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1fY29udGFpbmVyX2VkaXRcIik7XG5cbmxldCBkcm9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wYnRuXCIpO1xuXG5sZXQgYWRkV29yZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkX3dvcmRcIik7XG5sZXQgZGVsZXRlV29yZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVsZXRlX3dvcmRcIik7XG5cbmxldCBhZGRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkFkZF9hZGRcIik7XG5cbmxldCBjYW5jZWxCdG5BZGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbF9hZGRcIik7XG5sZXQgY2FuY2VsQnRuRWRpdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQ2FuY2VsX2VkaXRcIik7XG5cbmxldCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnRuXCIpO1xubGV0IHBsYXlCdG5fID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnRuX1wiKTtcbmxldCBpbnN0cnVjdGlvbnNCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImluc3RydWN0aW9uc1wiKTtcblxubGV0IGlucHV0QW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dF9hbnN3ZXJcIik7XG5sZXQgd29yZE9uU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JkT25TY3JlZW5cIik7XG5sZXQgY3VycmVudFNjb3JlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImN1cnJlbnRfc2NvcmVfdmFsdWVcIik7XG5sZXQgaGlTY29yZVZhbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJoaWdoX3Njb3JlX3ZhbHVlXCIpO1xubGV0IGhpU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2hfc2NvcmVcIik7XG5sZXQgbGlzdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VlV29yZHNCdG5cIik7XG5sZXQgcmVzZXRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlc2V0V29yZHNTY29yZVwiKTtcblxubGV0IG15Rm9ybUFkZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2FkZFwiKTtcbmxldCBteUZvcm1FZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1fZWRpdFwiKTtcblxubGV0IHNlYXJjaEJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2VhcmNoQmFyXCIpO1xubGV0IGNvcnJlY3RBbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvcnJlY3RBbnN3ZXJcIik7XG5cbmhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcblxubGV0IGluZGV4ID0gdW5kZWZpbmVkO1xuXG5jb250YWluZXJCb2R5LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoXG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT09IFwicm93XCIgfHxcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3cgcG9zaXRpdmVTY29yZVwiIHx8XG4gICAgZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc05hbWUgPT09IFwicm93IG5lZ2F0aXZlU2NvcmVcIlxuICApIHtcbiAgICBpbmRleCA9IGFsbFdvcmRzLmZpbmRJbmRleCgod29yZCkgPT4ge1xuICAgICAgcmV0dXJuIHdvcmQubmVkV29yZCA9PT0gYCR7ZS50YXJnZXQucGFyZW50Tm9kZS5pZH1gO1xuICAgIH0pO1xuICAgIHByaW50V29yZEluZm8oYWxsV29yZHMsIGluZGV4KTtcbiAgICBvcGVuRm9ybShteUZvcm1FZGl0KTtcbiAgfVxuXG4gIGlmIChlLnRhcmdldC5pZCA9PT0gXCJidG5BZGRfZWRpdFwiKSB7XG4gICAgaWYgKFxuICAgICAgZWRpdEZvcm0uY2hpbGROb2Rlc1s1XS52YWx1ZSAhPT0gXCJcIiAmJlxuICAgICAgZWRpdEZvcm0uY2hpbGROb2Rlc1s5XS52YWx1ZSAhPT0gXCJcIlxuICAgICkge1xuICAgICAgc3VibWl0RWRpdChhbGxXb3JkcywgaW5kZXgsIGVkaXRGb3JtLmNoaWxkTm9kZXNbNV0pO1xuICAgICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgICAgIHJlbmRlcldvcmRzKGFsbFdvcmRzLCBjb250YWluZXJCb2R5KTtcbiAgICAgIGNsb3NlRm9ybShteUZvcm1FZGl0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXCJjYW50IGVkaXQgYSB3b3JkIHRvIGVtcHR5IGZpZWxkcyFcIik7XG4gICAgfVxuICB9XG59KTtcblxucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICByZW5kZXJHYW1lSW5mbygpO1xuICBnYW1lLnN0YXJ0R2FtZShhbGxXb3JkcywgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gIGNvcnJlY3RBbnN3ZXIudGV4dENvbnRlbnQgPSBcIlwiO1xuICBpZiAoZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5yYW5kb21pemVBcnJheSgpO1xuICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgfSBlbHNlIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggPT09IDApIHtcbiAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkFERCBTT01FIFdPUkRTIEJFRk9SRSBQTEFZSU5HIVwiO1xuICB9XG59KTtcblxucGxheUJ0bl8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgcmVuZGVyR2FtZUluZm8oKTtcblxuICBsZXQgQWxsTmVnYXRpdmVXb3Jkc0FycmF5ID0gYWxsV29yZHMuZmlsdGVyKCh3b3JkKSA9PiB3b3JkLnZhbHVlIDwgMCk7XG4gIGdhbWUuc3RhcnRHYW1lKEFsbE5lZ2F0aXZlV29yZHNBcnJheSwgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICB9IGVsc2UgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiMCBORUdBVElWRSBTQ09SRSBXT1JEUyFcIjtcbiAgfVxufSk7XG5cbmxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xufSk7XG5cbnJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFsbFdvcmRzLmZvckVhY2goKHdvcmQpID0+IHtcbiAgICB3b3JkLnZhbHVlID0gMDtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3JkcywgY29udGFpbmVyQm9keSk7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGFsbFdvcmRzKTtcbn0pO1xuXG5pbnN0cnVjdGlvbnNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJ0ZXN0aW5nXCIpO1xuICByZW5kZXJHYW1lUnVsZXMoKTtcbn0pO1xuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChhZGRGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVXb3JkKGFsbFdvcmRzKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGFkZEZvcm0ucmVzZXQoKTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3Jkcyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfYWRkXCIpLmZvY3VzKCk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIsIGNvcnJlY3RBbnN3ZXIpO1xuICAgIGdhbWUucmVtb3ZlRmlyc3RPYmplY3QoKTtcbiAgICBnYW1lLnVwZGF0ZVNjb3JlKGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICAgIGdhbWUudXBkYXRlTG9jYWxTdG9yYWdlKFwiaGlTY29yZVwiKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCJET05FIVwiO1xuICAgIH1cbiAgICBpbnB1dEFuc3dlci52YWx1ZSA9IFwiXCI7XG4gIH1cbn0pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNlYXJjaFN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkV29yZHMgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgd29yZC5uZWRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKSB8fFxuICAgICAgd29yZC5uYXRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKVxuICAgICk7XG4gIH0pO1xuICByZW5kZXJXb3JkcyhmaWx0ZXJlZFdvcmRzKTtcbn0pO1xuXG5kZWxldGVXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiZGVsZXRlX3dvcmRcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkZWxldGVXb3JkKGFsbFdvcmRzLCBpbmRleCk7XG4gICAgcmVuZGVyV29yZHMoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgY2xvc2VGb3JtKG15Rm9ybUVkaXQpO1xuICB9XG59KTtcblxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGJ0blwiKSkge1xuICAgIGxldCBkcm9wZG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd25fY29udGVudFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wZW5Ecm9wZG93biA9IGRyb3Bkb3duc1tpXTtcbiAgICAgIGlmIChvcGVuRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5oaVNjb3JlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGdhbWUuaGlTY29yZSA9IDA7XG4gIGhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcbiAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xufSk7XG5cbmRyb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dEcm9wRG93bik7XG5cbmFkZFdvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgb3BlbkZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xvc2VGb3JtKG15Rm9ybUFkZCk7XG59KTtcblxuY2FuY2VsQnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0obXlGb3JtRWRpdCk7XG59KTtcblxuZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgYXJyKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGFycikpO1xufVxuXG5mdW5jdGlvbiBnZXRTdG9yYWdlRGF0YShuYW1lKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpIHx8IFwiW11cIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=