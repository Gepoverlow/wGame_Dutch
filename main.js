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
  correctAnswer.textContent = "";

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFVO0FBQ2Q7QUFDQTtBQUNBLElBQUksdURBQVc7QUFDZjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILEVBQUUsdURBQVc7QUFDYixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLElBQUkseURBQVU7QUFDZCxJQUFJLHVEQUFXO0FBQ2Y7QUFDQSxJQUFJLHFEQUFTO0FBQ2I7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLHNCQUFzQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsa0NBQWtDLG9EQUFZOztBQUU5QztBQUNBLEVBQUUsb0RBQVE7QUFDVixDQUFDOztBQUVEO0FBQ0EsRUFBRSxxREFBUztBQUNYLENBQUM7O0FBRUQ7QUFDQSxFQUFFLHFEQUFTO0FBQ1gsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2RvbV9zdHVmZi5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvd29yZF9jcmVhdG9yLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgY29udGFpbmVyQm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGFpbmVyX2JvZHlcIik7XG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2FkZFwiKTtcbmxldCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtX2VkaXRcIik7XG5sZXQgY29udGFpbmVyR2FtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGFpbmVyX2dhbWVcIik7XG5cbmxldCBoZWFkZXJzID0gW1xuICBcIlR5cGVcIixcbiAgXCJERS9IRVRcIixcbiAgXCJXb3JkXCIsXG4gIFwiWW91ciBNZWFuaW5nXCIsXG4gIFwic2NvcmVcIixcbiAgXCJXb29yZGVuc2JvZWsgTWVhbmluZ1wiLFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5Gb3JtKGh0bWxFbGVtZW50KSB7XG4gIGh0bWxFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUZvcm0oaHRtbEVsZW1lbnQpIHtcbiAgaHRtbEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vKiBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLFxudG9nZ2xlIGJldHdlZW4gaGlkaW5nIGFuZCBzaG93aW5nIHRoZSBkcm9wZG93biBjb250ZW50ICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Ryb3BEb3duKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RHJvcGRvd25cIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJXb3JkcyhhcnIpIHtcbiAgZW1wdHlOb2RlKGNvbnRhaW5lckJvZHkpO1xuXG4gIGxldCB0YWJsZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGFibGVcIik7XG4gIGxldCBoZWFkZXJSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gIHRhYmxlV3JhcHBlci5pZCA9IFwidGFibGVXcmFwcGVyXCI7XG4gIHRhYmxlLmlkID0gXCJ3b3Jkc1RhYmxlXCI7XG5cbiAgaGVhZGVycy5mb3JFYWNoKChoZWFkZXJUZXh0KSA9PiB7XG4gICAgbGV0IGhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0aFwiKTtcbiAgICBsZXQgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShoZWFkZXJUZXh0KTtcbiAgICBoZWFkZXIuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIGhlYWRlclJvdy5hcHBlbmRDaGlsZChoZWFkZXIpO1xuICB9KTtcbiAgdGFibGUuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcblxuICBhcnIuZm9yRWFjaCgod29yZCkgPT4ge1xuICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XG4gICAgcm93LmlkID0gd29yZC5uZWRXb3JkO1xuICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgbGluay50ZXh0ID0gXCJTZWFyY2hcIjtcbiAgICBsaW5rLmhyZWYgPSBjcmVhdGVXb3JkTGluayh3b3JkKTtcbiAgICBsaW5rLnRhcmdldCA9IFwiX2JsYW5rXCI7XG4gICAgT2JqZWN0LnZhbHVlcyh3b3JkKS5mb3JFYWNoKCh0ZXh0KSA9PiB7XG4gICAgICBsZXQgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZFwiKTtcbiAgICAgIGxldCB0ZXh0Tm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgICByb3cuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICBjZWxsLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH0pO1xuXG4gICAgcm93LmNsYXNzTGlzdC5hZGQoXCJyb3dcIik7XG4gICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcblxuICAgIGlmICh3b3JkLnZhbHVlIDwgMCkge1xuICAgICAgcm93LmNsYXNzTGlzdC5hZGQoXCJuZWdhdGl2ZVNjb3JlXCIpO1xuICAgIH0gZWxzZSBpZiAod29yZC52YWx1ZSA+IDApIHtcbiAgICAgIHJvdy5jbGFzc0xpc3QuYWRkKFwicG9zaXRpdmVTY29yZVwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIHRhYmxlV3JhcHBlci5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQodGFibGVXcmFwcGVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbmRlckdhbWVJbmZvKCkge1xuICBlbXB0eU5vZGUoY29udGFpbmVyQm9keSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyR2FtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJHYW1lUnVsZXMoKSB7XG4gIGVtcHR5Tm9kZShjb250YWluZXJCb2R5KTtcblxuICBsZXQgcnVsZXNUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMVwiKTtcbiAgcnVsZXNUaXRsZS50ZXh0Q29udGVudCA9IFwiUnVsZXMgJiBHZW5lcmFsIEluZm9cIjtcbiAgcnVsZXNUaXRsZS5zdHlsZS5mb250U2l6ZSA9IFwiMzBweFwiO1xuICBjb250YWluZXJCb2R5LmFwcGVuZENoaWxkKHJ1bGVzVGl0bGUpO1xuXG4gIGxldCBydWxlc1VMID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICBydWxlc1VMLnRleHRDb250ZW50ID0gXCJTb21lIFJ1bGVzXCI7XG4gIHJ1bGVzVUwuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgY29udGFpbmVyQm9keS5hcHBlbmRDaGlsZChydWxlc1VMKTtcblxuICBydWxlQ3JlYXRvcihcIkZpcnN0IGFkZCBhcyBtYW55IHdvcmRzIHlvdSB3YW50LlwiLCBydWxlc1VMKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJUaGVuIGhlYWQgdG8gTUVOVSAtPiBQbGF5IEFsbCBXb3JkcyB0byBzdGFydCBhIG5ldyBnYW1lIHdpdGggYWxsIHRoZSB3b3JkcyB5b3UgYWRkZWQuXCIsXG4gICAgcnVsZXNVTFxuICApO1xuICBydWxlQ3JlYXRvcihcbiAgICBcIlRoZSBnYW1lIGNvbnNpc3RzIG9uIG1hdGNoaW5nIHRoZSBEdXRjaCBXb3JkIHdpdGggeW91ciBvd24gTWVhbmluZy4gUEFTIE9QISBQcm9udW5jaWF0aW9uIGNvdW50cy5cIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiQ29ycmVjdCBhbnN3ZXJzIHdpbGwgZWFybiB5b3UgYSBwb2ludCwgd2hpbGUgaW5jb3JyZWN0IHdpbGwgbm90LlwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJBcyB5b3UgcGxheSB0aHJvdWdoLCBkZXBlbmRpbmcgb24gd2V0aGVyIHRoZSBhbnN3ZXIgd2FzIGNvcnJlY3Qgb3Igbm90LCBlYWNoIGluZGl2aWR1YWwgd29yZCB3aWxsIGJlIGdhaW5pbmcgb3IgbG9vc2luZyBhIHZhbHVlL3Njb3JlLlwiLFxuICAgIHJ1bGVzVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJZb3UgY2FuIHBsYXkgdGhpcyBtb2RlIGFzIG1hbnkgdGltZXMgeW91IHdhbnQsIHdpdGggaG93IG1hbnkgd29yZHMgeW91IHdhbnQuIFRoZSBtb3JlIHdvcmRzIHlvdSBhZGQgdGhlIGJldHRlciFcIixcbiAgICBydWxlc1VMXG4gICk7XG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiVGhlIHNlY29uZCBtb2RlLCBQbGF5IFdyb25nIFdvcmRzLCBsZXRzIHlvdSBwcmFjdGljZSBvbiB0aGUgd29yZHMgeW91IGFyZSBsZXNzIHN0cm9uZyAob3IgaGF2ZSBuZWdhdGl2ZSB2YWx1ZS9zY29yZSlcIixcbiAgICBydWxlc1VMXG4gICk7XG5cbiAgbGV0IGluZm9VTCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ1bFwiKTtcbiAgaW5mb1VMLnRleHRDb250ZW50ID0gXCJTb21lIEluZm9cIjtcbiAgaW5mb1VMLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoaW5mb1VMKTtcblxuICBydWxlQ3JlYXRvcihcbiAgICBcIkFsbCB3b3JkcyB0aGF0IHlvdSBjcmVhdGUgd2lsbCBiZSBzdG9yZWQgb24gdGhlIGxvY2FsU3RvcmFnZSBvZiB0aGUgYnJvd3NlciB5b3UgY3JlYXRlZCB0aGVtIHdpdGguXCIsXG4gICAgaW5mb1VMXG4gICk7XG5cbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJCZWNhdXNlIHRoZSBkYXRhIGlzIHN0b3JlZCBvbiB5b3VyIG93biBicm93c2VyIHN0b3JhZ2UsIHRyeSBhbmQgZG9uJ3QgZGVsZXRlIGl0IGJ5IGdvaW5nIGludG8gYnJvd3NlciBzZXR0aW5ncy9oaXN0b3J5L2RhdGEgZXRjLlwiLFxuICAgIGluZm9VTFxuICApO1xuXG4gIHJ1bGVDcmVhdG9yKFxuICAgIFwiV2l0aGluIHRoZSBMaXN0IHlvdSBjYW4gY2xpY2sgZWFjaCBlbGVtZW50IGFuZCBFZGl0L0RlbGV0ZSBpdHMgY29udGVudHMgaW4gY2FzZSB5b3UgbWFkZSBhIG1pc3Rha2Ugb3Igd2lzaCB0byBjaGFuZ2UgdGhlIG1lYW5pbmcgb2YgaXQuXCIsXG4gICAgaW5mb1VMXG4gICk7XG5cbiAgcnVsZUNyZWF0b3IoXG4gICAgXCJCZWNhdXNlIHRoZSBMaXN0IG1pZ2h0IGdldCB0b28gbG9uZywgeW91IGNhbiB1c2UgdGhlIFNlYXJjaCBmZWF0dXJlIHRvIGZpbHRlciB0aHJvdWdoIGFsbCB3b3JkcyFcIixcbiAgICBpbmZvVUxcbiAgKTtcbiAgcnVsZUNyZWF0b3IoXCJDbGljayBvbiBIaXNjb3JlIHRvIHJlc2V0IHRoZSBudW1iZXIgYmFjayB0byAwLlwiLCBpbmZvVUwpO1xufVxuXG5mdW5jdGlvbiBlbXB0eU5vZGUobm9kZSkge1xuICB3aGlsZSAobm9kZS5sYXN0RWxlbWVudENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmxhc3RFbGVtZW50Q2hpbGQpO1xuICB9XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoYWRkRm9ybSk7XG4gIGNvbnRhaW5lckJvZHkuYXBwZW5kQ2hpbGQoZWRpdEZvcm0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVXb3JkTGluayh3b3JkKSB7XG4gIHJldHVybiBgaHR0cHM6Ly93d3cud29vcmRlbi5vcmcvd29vcmQvJHt3b3JkLm5lZFdvcmR9YDtcbn1cblxuZnVuY3Rpb24gcnVsZUNyZWF0b3IoaW5mbywgcGFyZW50Tm9kZSkge1xuICBsZXQgcnVsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgcGFyZW50Tm9kZS5hcHBlbmRDaGlsZChydWxlKTtcbiAgcnVsZS50ZXh0Q29udGVudCA9IGluZm87XG59XG5cbi8vIGZ1bmN0aW9uIGNyZWF0ZUlkKCkge1xuLy8gICBjb25zdCBjaGFyYWN0ZXJzID0gXCJBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCI7XG4vLyAgIGNvbnN0IGxlbmd0aCA9IDU7XG4vLyAgIGxldCByYW5kb21TdHIgPSBcIlwiO1xuXG4vLyAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbi8vICAgICBjb25zdCByYW5kb21OdW0gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjaGFyYWN0ZXJzLmxlbmd0aCk7XG4vLyAgICAgcmFuZG9tU3RyICs9IGNoYXJhY3RlcnNbcmFuZG9tTnVtXTtcbi8vICAgfVxuLy8gICByZXR1cm4gcmFuZG9tU3RyO1xuLy8gfVxuIiwiZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcihnYW1lQXJyYXksIGN1cnJlbnRTY29yZSwgaGlTY29yZSkge1xuICAgIHRoaXMuZ2FtZUFycmF5ID0gZ2FtZUFycmF5O1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gY3VycmVudFNjb3JlO1xuICAgIHRoaXMuaGlTY29yZSA9IGhpU2NvcmU7XG4gIH1cblxuICBzdGFydEdhbWUoYXJyYXksIGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKSB7XG4gICAgdGhpcy5nYW1lQXJyYXkgPSBbLi4uYXJyYXldO1xuICAgIHRoaXMuY3VycmVudFNjb3JlID0gMDtcbiAgICB0aGlzLnVwZGF0ZVNjb3JlKGh0bWxFbGVtZW50QywgaHRtbEVsZW1lbnRIKTtcbiAgfVxuXG4gIGNvbXBhcmVXb3JkcyhpbnB1dCwgaHRtbEVsZW1lbnQpIHtcbiAgICBpZiAodGhpcy5nYW1lQXJyYXlbMF0ubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgIHRoaXMuYWRkVmFsdWUoKTtcbiAgICAgIHRoaXMuYWRkUG9pbnRUb1Njb3JlKCk7XG4gICAgICBodG1sRWxlbWVudC50ZXh0Q29udGVudCA9IGBDb3JyZWN0ISAke3RoaXMuZGlzcGxheUNvcnJlY3RBbnN3ZXIoKX0gWW91ciBBbnN3ZXIgLT4gJHtcbiAgICAgICAgaW5wdXQudmFsdWVcbiAgICAgIH1gO1xuICAgICAgdGhpcy5hZGRDb3JyZWN0SWNvbihodG1sRWxlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlVmFsdWUoKTtcbiAgICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gYFdyb25nISAke3RoaXMuZGlzcGxheUNvcnJlY3RBbnN3ZXIoKX0gWW91ciBBbnN3ZXIgLT4gJHtcbiAgICAgICAgaW5wdXQudmFsdWVcbiAgICAgIH1gO1xuICAgICAgdGhpcy5hZGRXcm9uZ0ljb24oaHRtbEVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIGRpc3BsYXlDb3JyZWN0QW5zd2VyKCkge1xuICAgIHJldHVybiBgQ29ycmVjdCBBbnN3ZXIgLT4gICR7dGhpcy5nYW1lQXJyYXlbMF0ubmF0V29yZH1gO1xuICB9XG5cbiAgbmV4dFdvcmQoaHRtbEVsZW1lbnQpIHtcbiAgICByZXR1cm4gKGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gYCR7XG4gICAgICB0aGlzLmdhbWVBcnJheVswXS5uZWRXb3JkXG4gICAgfSAgICAgICAgLyR7dGhpcy5yZW1haW5pbmdXb3JkcygpfWApO1xuICB9XG5cbiAgYWRkUG9pbnRUb1Njb3JlKCkge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTY29yZSsrO1xuICB9XG5cbiAgdXBkYXRlU2NvcmUoaHRtbEVsZW1lbnRDLCBodG1sRWxlbWVudEgpIHtcbiAgICB0aGlzLmNoZWNrRm9ySGlzY29yZSgpO1xuICAgIGh0bWxFbGVtZW50Qy50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudFNjb3JlO1xuICAgIGh0bWxFbGVtZW50SC50ZXh0Q29udGVudCA9IHRoaXMuaGlTY29yZTtcbiAgfVxuXG4gIGNoZWNrRm9ySGlzY29yZSgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U2NvcmUgPj0gdGhpcy5oaVNjb3JlKSB7XG4gICAgICB0aGlzLmhpU2NvcmUgPSB0aGlzLmN1cnJlbnRTY29yZTtcbiAgICB9XG4gIH1cblxuICBhZGRWYWx1ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXlbMF0udmFsdWUrKztcbiAgfVxuXG4gIHJlbW92ZVZhbHVlKCkge1xuICAgIHJldHVybiB0aGlzLmdhbWVBcnJheVswXS52YWx1ZS0tO1xuICB9XG5cbiAgcmVtb3ZlRmlyc3RPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2FtZUFycmF5LnNoaWZ0KCk7XG4gIH1cblxuICByYW5kb21pemVBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXkuc29ydCgoYSwgYikgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG4gIH1cbiAgdXBkYXRlTG9jYWxTdG9yYWdlKG5hbWUpIHtcbiAgICByZXR1cm4gbG9jYWxTdG9yYWdlLnNldEl0ZW0obmFtZSwgSlNPTi5zdHJpbmdpZnkodGhpcy5oaVNjb3JlKSk7XG4gIH1cblxuICByZW1haW5pbmdXb3JkcygpIHtcbiAgICByZXR1cm4gdGhpcy5nYW1lQXJyYXkubGVuZ3RoLnRvU3RyaW5nKCk7XG4gIH1cblxuICBhZGRDb3JyZWN0SWNvbihodG1sRWxlbWVudCkge1xuICAgIGxldCBpY29uQyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGljb25DLnRleHRDb250ZW50ID0gXCJjaGVja1wiO1xuICAgIGljb25DLmNsYXNzTGlzdC5hZGQoXCJtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiKTtcbiAgICBpY29uQy5zdHlsZS5jb2xvciA9IFwiZ3JlZW5cIjtcbiAgICBpY29uQy5zdHlsZS5mb250U2l6ZSA9IFwiNTVweFwiO1xuICAgIGh0bWxFbGVtZW50LmFwcGVuZENoaWxkKGljb25DKTtcbiAgfVxuXG4gIGFkZFdyb25nSWNvbihodG1sRWxlbWVudCkge1xuICAgIGxldCBpY29uVyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIGljb25XLnRleHRDb250ZW50ID0gXCJjbGVhclwiO1xuICAgIGljb25XLmNsYXNzTGlzdC5hZGQoXCJtYXRlcmlhbC1pY29ucy1vdXRsaW5lZFwiKTtcbiAgICBpY29uVy5zdHlsZS5jb2xvciA9IFwicmVkXCI7XG4gICAgaWNvblcuc3R5bGUuZm9udFNpemUgPSBcIjU1cHhcIjtcbiAgICBodG1sRWxlbWVudC5hcHBlbmRDaGlsZChpY29uVyk7XG4gIH1cbn1cblxuLy8gZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgb2JqS2V5KSB7XG4vLyAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KG9iaktleSkpO1xuLy8gfVxuIiwibGV0IHR5cGVPZldvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cGVPZldvcmRfZWRpdFwiKTtcbmxldCBkZU9mSGV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZU9mSGV0X2VkaXRcIik7XG5sZXQgZFdvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHV0Y2hXb3JkX2lucHV0X2VkaXRcIik7XG5sZXQgbldvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF0aXZlV29yZF9pbnB1dF9lZGl0XCIpO1xuXG5jbGFzcyBXb3JkIHtcbiAgY29uc3RydWN0b3Iod1R5cGUsIHdBcnRpY2xlLCBuZWRXb3JkLCBuYXRXb3JkLCB2YWx1ZSwgbGluaykge1xuICAgIHRoaXMud1R5cGUgPSB3VHlwZTtcbiAgICB0aGlzLndBcnRpY2xlID0gd0FydGljbGU7XG4gICAgdGhpcy5uZWRXb3JkID0gbmVkV29yZDtcbiAgICB0aGlzLm5hdFdvcmQgPSBuYXRXb3JkO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmxpbmsgPSBsaW5rO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkKGFycikge1xuICBsZXQgdHlwZU9mV29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidHlwZU9mV29yZF9hZGRcIikudmFsdWU7XG4gIGxldCBkZU9mSGV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZU9mSGV0X2FkZFwiKS52YWx1ZTtcbiAgbGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dF9hZGRcIikudmFsdWU7XG4gIGxldCBuV29yZElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYXRpdmVXb3JkX2lucHV0X2FkZFwiKS52YWx1ZTtcbiAgLy9cbiAgbGV0IG5ld1dvcmQgPSBuZXcgV29yZChcbiAgICB0eXBlT2ZXb3JkLFxuICAgIGRlT2ZIZXQsXG4gICAgZFdvcmRJbnB1dCxcbiAgICBuV29yZElucHV0LFxuICAgIDAsXG4gICAgXCJNZWFuaW5nIGluIFdvb3JkZW4gLSA+IFwiXG4gICk7XG4gIC8vXG4gIGlmIChhcnIuc29tZSgoZSkgPT4gZS5uZWRXb3JkID09PSBgJHtkV29yZElucHV0fWApKSB7XG4gICAgYWxlcnQoXCJ3b3JkIGlzIGFscmVhZHkgaGVyZVwiKTtcbiAgfSBlbHNlIHtcbiAgICBhcnIucHVzaChuZXdXb3JkKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlV29yZChhcnJheSwgaW5kZXgpIHtcbiAgcmV0dXJuIGFycmF5LnNwbGljZShpbmRleCwgMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcmludFdvcmRJbmZvKGFycmF5LCBpbmRleCkge1xuICB0eXBlT2ZXb3JkLnZhbHVlID0gYXJyYXlbaW5kZXhdLndUeXBlO1xuICBkZU9mSGV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLndBcnRpY2xlO1xuICBkV29yZElucHV0LnZhbHVlID0gYXJyYXlbaW5kZXhdLm5lZFdvcmQ7XG4gIG5Xb3JkSW5wdXQudmFsdWUgPSBhcnJheVtpbmRleF0ubmF0V29yZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN1Ym1pdEVkaXQoYXJyYXksIGluZGV4LCBpbnB1dCkge1xuICBhcnJheVtpbmRleF0ud1R5cGUgPSB0eXBlT2ZXb3JkLnZhbHVlO1xuICBhcnJheVtpbmRleF0ud0FydGljbGUgPSBkZU9mSGV0LnZhbHVlO1xuICBhcnJheVtpbmRleF0ubmVkV29yZCA9IGRXb3JkSW5wdXQudmFsdWU7XG4gIGFycmF5W2luZGV4XS5uYXRXb3JkID0gbldvcmRJbnB1dC52YWx1ZTtcblxuICAvLyBpZiAoYXJyYXkuc29tZSgoZSkgPT4gZS5uZWRXb3JkID09PSBpbnB1dC52YWx1ZSkpIHtcbiAgLy8gICBhbGVydChcIndvcmQgaXMgYWxyZWFkeSBoZXJlXCIpO1xuICAvLyB9IGVsc2Uge1xuICAvLyAgIGFycmF5W2luZGV4XS53VHlwZSA9IHR5cGVPZldvcmQudmFsdWU7XG4gIC8vICAgYXJyYXlbaW5kZXhdLndBcnRpY2xlID0gZGVPZkhldC52YWx1ZTtcbiAgLy8gICBhcnJheVtpbmRleF0ubmVkV29yZCA9IGRXb3JkSW5wdXQudmFsdWU7XG4gIC8vICAgYXJyYXlbaW5kZXhdLm5hdFdvcmQgPSBuV29yZElucHV0LnZhbHVlO1xuICAvLyB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7XG4gIGNyZWF0ZVdvcmQsXG4gIHByaW50V29yZEluZm8sXG4gIGRlbGV0ZVdvcmQsXG4gIHN1Ym1pdEVkaXQsXG59IGZyb20gXCIuL3dvcmRfY3JlYXRvclwiO1xuaW1wb3J0IHtcbiAgb3BlbkZvcm0sXG4gIGNsb3NlRm9ybSxcbiAgc2hvd0Ryb3BEb3duLFxuICByZW5kZXJHYW1lSW5mbyxcbiAgcmVuZGVyV29yZHMsXG4gIHJlbmRlckdhbWVSdWxlcyxcbn0gZnJvbSBcIi4vZG9tX3N0dWZmXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5sZXQgYWxsV29yZHMgPSBnZXRTdG9yYWdlRGF0YShcIndvcmRzQXJyYXlcIik7XG5cbmxldCBnYW1lQXJyYXkgPSBbXTtcblxubGV0IGdhbWUgPSBuZXcgR2FtZShnYW1lQXJyYXksIDAsIGdldFN0b3JhZ2VEYXRhKFwiaGlTY29yZVwiKSk7XG5cbmxldCBjb250YWluZXJCb2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb250YWluZXJfYm9keVwiKTtcblxubGV0IGFkZEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZvcm1fY29udGFpbmVyX2FkZFwiKTtcbmxldCBlZGl0Rm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZm9ybV9jb250YWluZXJfZWRpdFwiKTtcblxubGV0IGRyb3BCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyb3BidG5cIik7XG5cbmxldCBhZGRXb3JkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGRfd29yZFwiKTtcbmxldCBkZWxldGVXb3JkQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZWxldGVfd29yZFwiKTtcblxubGV0IGFkZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQWRkX2FkZFwiKTtcblxubGV0IGNhbmNlbEJ0bkFkZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQ2FuY2VsX2FkZFwiKTtcbmxldCBjYW5jZWxCdG5FZGl0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidG5DYW5jZWxfZWRpdFwiKTtcblxubGV0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdG5cIik7XG5sZXQgcGxheUJ0bl8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdG5fXCIpO1xubGV0IGluc3RydWN0aW9uc0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5zdHJ1Y3Rpb25zXCIpO1xuXG5sZXQgaW5wdXRBbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0X2Fuc3dlclwiKTtcbmxldCB3b3JkT25TY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndvcmRPblNjcmVlblwiKTtcbmxldCBjdXJyZW50U2NvcmVWYWx1ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3VycmVudF9zY29yZV92YWx1ZVwiKTtcbmxldCBoaVNjb3JlVmFsdWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhpZ2hfc2NvcmVfdmFsdWVcIik7XG5sZXQgaGlTY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGlnaF9zY29yZVwiKTtcbmxldCBsaXN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWVXb3Jkc0J0blwiKTtcbmxldCByZXNldEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicmVzZXRXb3Jkc1Njb3JlXCIpO1xuXG5sZXQgbXlGb3JtQWRkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1fYWRkXCIpO1xubGV0IG15Rm9ybUVkaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15Rm9ybV9lZGl0XCIpO1xuXG5sZXQgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2hCYXJcIik7XG5sZXQgY29ycmVjdEFuc3dlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ycmVjdEFuc3dlclwiKTtcblxuaGlTY29yZVZhbHVlLnRleHRDb250ZW50ID0gZ2FtZS5oaVNjb3JlO1xuXG5sZXQgaW5kZXggPSB1bmRlZmluZWQ7XG5cbmNvbnRhaW5lckJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3dcIiB8fFxuICAgIGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NOYW1lID09PSBcInJvdyBwb3NpdGl2ZVNjb3JlXCIgfHxcbiAgICBlLnRhcmdldC5wYXJlbnROb2RlLmNsYXNzTmFtZSA9PT0gXCJyb3cgbmVnYXRpdmVTY29yZVwiXG4gICkge1xuICAgIGluZGV4ID0gYWxsV29yZHMuZmluZEluZGV4KCh3b3JkKSA9PiB7XG4gICAgICByZXR1cm4gd29yZC5uZWRXb3JkID09PSBgJHtlLnRhcmdldC5wYXJlbnROb2RlLmlkfWA7XG4gICAgfSk7XG4gICAgcHJpbnRXb3JkSW5mbyhhbGxXb3JkcywgaW5kZXgpO1xuICAgIG9wZW5Gb3JtKG15Rm9ybUVkaXQpO1xuICB9XG5cbiAgaWYgKGUudGFyZ2V0LmlkID09PSBcImJ0bkFkZF9lZGl0XCIpIHtcbiAgICBpZiAoXG4gICAgICBlZGl0Rm9ybS5jaGlsZE5vZGVzWzVdLnZhbHVlICE9PSBcIlwiICYmXG4gICAgICBlZGl0Rm9ybS5jaGlsZE5vZGVzWzldLnZhbHVlICE9PSBcIlwiXG4gICAgKSB7XG4gICAgICBzdWJtaXRFZGl0KGFsbFdvcmRzLCBpbmRleCwgZWRpdEZvcm0uY2hpbGROb2Rlc1s1XSk7XG4gICAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgICAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xuICAgICAgY2xvc2VGb3JtKG15Rm9ybUVkaXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcImNhbnQgZWRpdCBhIHdvcmQgdG8gZW1wdHkgZmllbGRzIVwiKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gIHJlbmRlckdhbWVJbmZvKCk7XG4gIGdhbWUuc3RhcnRHYW1lKGFsbFdvcmRzLCBjdXJyZW50U2NvcmVWYWx1ZSwgaGlTY29yZVZhbHVlKTtcbiAgY29ycmVjdEFuc3dlci50ZXh0Q29udGVudCA9IFwiXCI7XG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICB9IGVsc2UgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiQUREIFNPTUUgV09SRFMgQkVGT1JFIFBMQVlJTkchXCI7XG4gIH1cbn0pO1xuXG5wbGF5QnRuXy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICByZW5kZXJHYW1lSW5mbygpO1xuICBjb3JyZWN0QW5zd2VyLnRleHRDb250ZW50ID0gXCJcIjtcblxuICBsZXQgQWxsTmVnYXRpdmVXb3Jkc0FycmF5ID0gYWxsV29yZHMuZmlsdGVyKCh3b3JkKSA9PiB3b3JkLnZhbHVlIDwgMCk7XG4gIGdhbWUuc3RhcnRHYW1lKEFsbE5lZ2F0aXZlV29yZHNBcnJheSwgY3VycmVudFNjb3JlVmFsdWUsIGhpU2NvcmVWYWx1ZSk7XG4gIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICB9IGVsc2UgaWYgKGdhbWUuZ2FtZUFycmF5Lmxlbmd0aCA9PT0gMCkge1xuICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IFwiMCBORUdBVElWRSBTQ09SRSBXT1JEUyFcIjtcbiAgfVxufSk7XG5cbmxpc3RCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgcmVuZGVyV29yZHMoYWxsV29yZHMsIGNvbnRhaW5lckJvZHkpO1xufSk7XG5cbnJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGFsbFdvcmRzLmZvckVhY2goKHdvcmQpID0+IHtcbiAgICB3b3JkLnZhbHVlID0gMDtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3JkcywgY29udGFpbmVyQm9keSk7XG4gICAgYWRkVG9Mb2NhbFN0b3JhZ2UoXCJ3b3Jkc0FycmF5XCIsIGFsbFdvcmRzKTtcbiAgfSk7XG4gIGNvbnNvbGUubG9nKGFsbFdvcmRzKTtcbn0pO1xuXG5pbnN0cnVjdGlvbnNCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgY29uc29sZS5sb2coXCJ0ZXN0aW5nXCIpO1xuICByZW5kZXJHYW1lUnVsZXMoKTtcbn0pO1xuXG5hZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChhZGRGb3JtLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjcmVhdGVXb3JkKGFsbFdvcmRzKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGFkZEZvcm0ucmVzZXQoKTtcbiAgICByZW5kZXJXb3JkcyhhbGxXb3Jkcyk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXRjaFdvcmRfaW5wdXRfYWRkXCIpLmZvY3VzKCk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgZ2FtZS5nYW1lQXJyYXkubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIsIGNvcnJlY3RBbnN3ZXIpO1xuICAgIGdhbWUucmVtb3ZlRmlyc3RPYmplY3QoKTtcbiAgICBnYW1lLnVwZGF0ZVNjb3JlKGN1cnJlbnRTY29yZVZhbHVlLCBoaVNjb3JlVmFsdWUpO1xuICAgIGdhbWUudXBkYXRlTG9jYWxTdG9yYWdlKFwiaGlTY29yZVwiKTtcbiAgICBhZGRUb0xvY2FsU3RvcmFnZShcIndvcmRzQXJyYXlcIiwgYWxsV29yZHMpO1xuICAgIGlmIChnYW1lLmdhbWVBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCJET05FIVwiO1xuICAgIH1cbiAgICBpbnB1dEFuc3dlci52YWx1ZSA9IFwiXCI7XG4gIH1cbn0pO1xuXG5zZWFyY2hCYXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIChlKSA9PiB7XG4gIGNvbnN0IHNlYXJjaFN0cmluZyA9IGUudGFyZ2V0LnZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gIGNvbnN0IGZpbHRlcmVkV29yZHMgPSBhbGxXb3Jkcy5maWx0ZXIoKHdvcmQpID0+IHtcbiAgICByZXR1cm4gKFxuICAgICAgd29yZC5uZWRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKSB8fFxuICAgICAgd29yZC5uYXRXb3JkLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoU3RyaW5nKVxuICAgICk7XG4gIH0pO1xuICByZW5kZXJXb3JkcyhmaWx0ZXJlZFdvcmRzKTtcbn0pO1xuXG5kZWxldGVXb3JkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuaWQgPT09IFwiZGVsZXRlX3dvcmRcIikge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBkZWxldGVXb3JkKGFsbFdvcmRzLCBpbmRleCk7XG4gICAgcmVuZGVyV29yZHMoYWxsV29yZHMpO1xuICAgIGFkZFRvTG9jYWxTdG9yYWdlKFwid29yZHNBcnJheVwiLCBhbGxXb3Jkcyk7XG4gICAgY2xvc2VGb3JtKG15Rm9ybUVkaXQpO1xuICB9XG59KTtcblxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcbndpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGlmICghZXZlbnQudGFyZ2V0Lm1hdGNoZXMoXCIuZHJvcGJ0blwiKSkge1xuICAgIGxldCBkcm9wZG93bnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZHJvcGRvd25fY29udGVudFwiKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wZW5Ecm9wZG93biA9IGRyb3Bkb3duc1tpXTtcbiAgICAgIGlmIChvcGVuRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5oaVNjb3JlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGdhbWUuaGlTY29yZSA9IDA7XG4gIGhpU2NvcmVWYWx1ZS50ZXh0Q29udGVudCA9IGdhbWUuaGlTY29yZTtcbiAgZ2FtZS51cGRhdGVMb2NhbFN0b3JhZ2UoXCJoaVNjb3JlXCIpO1xufSk7XG5cbmRyb3BCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNob3dEcm9wRG93bik7XG5cbmFkZFdvcmRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgb3BlbkZvcm0obXlGb3JtQWRkKTtcbn0pO1xuXG5jYW5jZWxCdG5BZGQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgY2xvc2VGb3JtKG15Rm9ybUFkZCk7XG59KTtcblxuY2FuY2VsQnRuRWRpdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBjbG9zZUZvcm0obXlGb3JtRWRpdCk7XG59KTtcblxuZnVuY3Rpb24gYWRkVG9Mb2NhbFN0b3JhZ2UobmFtZSwgYXJyKSB7XG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKG5hbWUsIEpTT04uc3RyaW5naWZ5KGFycikpO1xufVxuXG5mdW5jdGlvbiBnZXRTdG9yYWdlRGF0YShuYW1lKSB7XG4gIHJldHVybiBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKG5hbWUpIHx8IFwiW11cIik7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=