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
/* harmony export */   "showDropDown": () => (/* binding */ showDropDown)
/* harmony export */ });
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function showDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
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
// export let randomWord = undefined;

// let wordOnScreen = document.getElementById("wordOnScreen");

// export class Game {
//   constructor(wordsArray) {
//     this.wordsArray = wordsArray;
//   }
//   compare(input) {
//     if (randomWord.natWord === input.value) {
//       return console.log("yh");
//     } else {
//       return console.log("nh");
//     }
//   }

//   selectRandom(wordsArray) {
//     randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
//     wordOnScreen.textContent = randomWord.nedWord;
//     return randomWord;
//   }

//   remove() {}
// }

class Game {
  constructor(initialArray, correctArray, wrongArray) {
    this.initialArray = initialArray;
    this.correctArray = correctArray;
    this.wrongArray = wrongArray;
  }

  compareWords(input) {
    if (this.initialArray[0].natWord === input.value) {
      this.addValue();
      this.addToCorrectArray();
    } else {
      this.removeValue();
      this.addToWrongArray();
    }
  }

  nextWord(htmlElement) {
    htmlElement.textContent = this.initialArray[0].nedWord;
  }

  addValue() {
    this.initialArray[0].value++;
  }

  removeValue() {
    this.initialArray[0].value--;
  }

  removeFirstObject() {
    return this.initialArray.shift();
  }

  addToCorrectArray() {
    return this.correctArray.push(this.removeFirstObject());
  }

  addToWrongArray() {
    return this.wrongArray.push(this.removeFirstObject());
  }
  randomizeArray() {
    return this.initialArray.sort((a, b) => 0.5 - Math.random());
  }
}


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
  constructor(nedWord, natWord, value, wArticle, wType) {
    this.nedWord = nedWord;
    this.natWord = natWord;
    this.value = value;
    this.wArticle = wArticle;
    this.wType = wType;
  }

  compare(input) {
    if (this.natWord === input.value) {
      return true;
    } else {
      return false;
    }
  }
}

function createWord(arr) {
  let dWordInput = document.getElementById("dutchWord_input").value;
  let nWordInput = document.getElementById("nativeWord_input").value;
  let typeOfWord = document.getElementById("typeOfWord").value;
  let deOfHet = document.getElementById("deOfHet").value;
  //
  let newWord = new Word(dWordInput, nWordInput, 0, deOfHet, typeOfWord);
  arr.push(newWord);
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




let allWords = [];

let initialArray = [];
let correctArray = [];
let wrongArray = [];

let game = new _game__WEBPACK_IMPORTED_MODULE_2__.Game(initialArray, correctArray, wrongArray);

let addForm = document.querySelector(".form-container");
let dropBtn = document.querySelector(".dropbtn");
let addWord = document.querySelector(".add_word");
let cancelBtn = document.getElementById("btnCancel");
let addBtn = document.getElementById("btnAdd");
let playBtn = document.getElementById("playBtn");
let inputAnswer = document.getElementById("input_answer");
let wordOnScreen = document.getElementById("wordOnScreen");

playBtn.addEventListener("click", function () {
  if (initialArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen);
  }
});

dropBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.showDropDown);

addWord.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm);

cancelBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm);

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.createWord)(initialArray);
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.createWord)(allWords);
    addForm.reset();
  }
});

inputAnswer.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && allWords.length !== 0) {
    game.compareWords(inputAnswer);
    if (game.initialArray.length !== 0) {
      game.nextWord(wordOnScreen);
    } else {
      wordOnScreen.textContent = "DONE!";
    }
    inputAnswer.value = "";
  }
  console.log(game);
  console.log(allWords);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNaQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040QztBQUNvQjtBQUNsQzs7QUFFOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGVBQWUsdUNBQUk7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsa0NBQWtDLG9EQUFZOztBQUU5QyxrQ0FBa0MsZ0RBQVE7O0FBRTFDLG9DQUFvQyxpREFBUzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBVTtBQUNkLElBQUkseURBQVU7QUFDZDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzQkFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZG9tX3N0dWZmLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy93b3JkX2NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBvcGVuRm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vKiBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLFxudG9nZ2xlIGJldHdlZW4gaGlkaW5nIGFuZCBzaG93aW5nIHRoZSBkcm9wZG93biBjb250ZW50ICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Ryb3BEb3duKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RHJvcGRvd25cIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG59XG4iLCIvLyBleHBvcnQgbGV0IHJhbmRvbVdvcmQgPSB1bmRlZmluZWQ7XG5cbi8vIGxldCB3b3JkT25TY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndvcmRPblNjcmVlblwiKTtcblxuLy8gZXhwb3J0IGNsYXNzIEdhbWUge1xuLy8gICBjb25zdHJ1Y3Rvcih3b3Jkc0FycmF5KSB7XG4vLyAgICAgdGhpcy53b3Jkc0FycmF5ID0gd29yZHNBcnJheTtcbi8vICAgfVxuLy8gICBjb21wYXJlKGlucHV0KSB7XG4vLyAgICAgaWYgKHJhbmRvbVdvcmQubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbi8vICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcInloXCIpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJuaFwiKTtcbi8vICAgICB9XG4vLyAgIH1cblxuLy8gICBzZWxlY3RSYW5kb20od29yZHNBcnJheSkge1xuLy8gICAgIHJhbmRvbVdvcmQgPSB3b3Jkc0FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmRzQXJyYXkubGVuZ3RoKV07XG4vLyAgICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gcmFuZG9tV29yZC5uZWRXb3JkO1xuLy8gICAgIHJldHVybiByYW5kb21Xb3JkO1xuLy8gICB9XG5cbi8vICAgcmVtb3ZlKCkge31cbi8vIH1cblxuZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsQXJyYXksIGNvcnJlY3RBcnJheSwgd3JvbmdBcnJheSkge1xuICAgIHRoaXMuaW5pdGlhbEFycmF5ID0gaW5pdGlhbEFycmF5O1xuICAgIHRoaXMuY29ycmVjdEFycmF5ID0gY29ycmVjdEFycmF5O1xuICAgIHRoaXMud3JvbmdBcnJheSA9IHdyb25nQXJyYXk7XG4gIH1cblxuICBjb21wYXJlV29yZHMoaW5wdXQpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsQXJyYXlbMF0ubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgIHRoaXMuYWRkVmFsdWUoKTtcbiAgICAgIHRoaXMuYWRkVG9Db3JyZWN0QXJyYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVWYWx1ZSgpO1xuICAgICAgdGhpcy5hZGRUb1dyb25nQXJyYXkoKTtcbiAgICB9XG4gIH1cblxuICBuZXh0V29yZChodG1sRWxlbWVudCkge1xuICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5pbml0aWFsQXJyYXlbMF0ubmVkV29yZDtcbiAgfVxuXG4gIGFkZFZhbHVlKCkge1xuICAgIHRoaXMuaW5pdGlhbEFycmF5WzBdLnZhbHVlKys7XG4gIH1cblxuICByZW1vdmVWYWx1ZSgpIHtcbiAgICB0aGlzLmluaXRpYWxBcnJheVswXS52YWx1ZS0tO1xuICB9XG5cbiAgcmVtb3ZlRmlyc3RPYmplY3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuaW5pdGlhbEFycmF5LnNoaWZ0KCk7XG4gIH1cblxuICBhZGRUb0NvcnJlY3RBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb3JyZWN0QXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG5cbiAgYWRkVG9Xcm9uZ0FycmF5KCkge1xuICAgIHJldHVybiB0aGlzLndyb25nQXJyYXkucHVzaCh0aGlzLnJlbW92ZUZpcnN0T2JqZWN0KCkpO1xuICB9XG4gIHJhbmRvbWl6ZUFycmF5KCkge1xuICAgIHJldHVybiB0aGlzLmluaXRpYWxBcnJheS5zb3J0KChhLCBiKSA9PiAwLjUgLSBNYXRoLnJhbmRvbSgpKTtcbiAgfVxufVxuIiwiY2xhc3MgV29yZCB7XG4gIGNvbnN0cnVjdG9yKG5lZFdvcmQsIG5hdFdvcmQsIHZhbHVlLCB3QXJ0aWNsZSwgd1R5cGUpIHtcbiAgICB0aGlzLm5lZFdvcmQgPSBuZWRXb3JkO1xuICAgIHRoaXMubmF0V29yZCA9IG5hdFdvcmQ7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMud0FydGljbGUgPSB3QXJ0aWNsZTtcbiAgICB0aGlzLndUeXBlID0gd1R5cGU7XG4gIH1cblxuICBjb21wYXJlKGlucHV0KSB7XG4gICAgaWYgKHRoaXMubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXb3JkKGFycikge1xuICBsZXQgZFdvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHV0Y2hXb3JkX2lucHV0XCIpLnZhbHVlO1xuICBsZXQgbldvcmRJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmF0aXZlV29yZF9pbnB1dFwiKS52YWx1ZTtcbiAgbGV0IHR5cGVPZldvcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR5cGVPZldvcmRcIikudmFsdWU7XG4gIGxldCBkZU9mSGV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkZU9mSGV0XCIpLnZhbHVlO1xuICAvL1xuICBsZXQgbmV3V29yZCA9IG5ldyBXb3JkKGRXb3JkSW5wdXQsIG5Xb3JkSW5wdXQsIDAsIGRlT2ZIZXQsIHR5cGVPZldvcmQpO1xuICBhcnIucHVzaChuZXdXb3JkKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgY3JlYXRlV29yZCB9IGZyb20gXCIuL3dvcmRfY3JlYXRvclwiO1xuaW1wb3J0IHsgb3BlbkZvcm0sIGNsb3NlRm9ybSwgc2hvd0Ryb3BEb3duIH0gZnJvbSBcIi4vZG9tX3N0dWZmXCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vZ2FtZVwiO1xuXG5sZXQgYWxsV29yZHMgPSBbXTtcblxubGV0IGluaXRpYWxBcnJheSA9IFtdO1xubGV0IGNvcnJlY3RBcnJheSA9IFtdO1xubGV0IHdyb25nQXJyYXkgPSBbXTtcblxubGV0IGdhbWUgPSBuZXcgR2FtZShpbml0aWFsQXJyYXksIGNvcnJlY3RBcnJheSwgd3JvbmdBcnJheSk7XG5cbmxldCBhZGRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lclwiKTtcbmxldCBkcm9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wYnRuXCIpO1xubGV0IGFkZFdvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZF93b3JkXCIpO1xubGV0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQ2FuY2VsXCIpO1xubGV0IGFkZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQWRkXCIpO1xubGV0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdG5cIik7XG5sZXQgaW5wdXRBbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0X2Fuc3dlclwiKTtcbmxldCB3b3JkT25TY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndvcmRPblNjcmVlblwiKTtcblxucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBpZiAoaW5pdGlhbEFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgIGdhbWUucmFuZG9taXplQXJyYXkoKTtcbiAgICBnYW1lLm5leHRXb3JkKHdvcmRPblNjcmVlbik7XG4gIH1cbn0pO1xuXG5kcm9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93RHJvcERvd24pO1xuXG5hZGRXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuRm9ybSk7XG5cbmNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VGb3JtKTtcblxuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoYWRkRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3JlYXRlV29yZChpbml0aWFsQXJyYXkpO1xuICAgIGNyZWF0ZVdvcmQoYWxsV29yZHMpO1xuICAgIGFkZEZvcm0ucmVzZXQoKTtcbiAgfVxufSk7XG5cbmlucHV0QW5zd2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoZS5rZXlDb2RlID09PSAxMyAmJiBhbGxXb3Jkcy5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLmNvbXBhcmVXb3JkcyhpbnB1dEFuc3dlcik7XG4gICAgaWYgKGdhbWUuaW5pdGlhbEFycmF5Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB3b3JkT25TY3JlZW4udGV4dENvbnRlbnQgPSBcIkRPTkUhXCI7XG4gICAgfVxuICAgIGlucHV0QW5zd2VyLnZhbHVlID0gXCJcIjtcbiAgfVxuICBjb25zb2xlLmxvZyhnYW1lKTtcbiAgY29uc29sZS5sb2coYWxsV29yZHMpO1xufSk7XG5cbi8vIENsb3NlIHRoZSBkcm9wZG93biBtZW51IGlmIHRoZSB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0XG53aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xuICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKFwiLmRyb3BidG5cIikpIHtcbiAgICBsZXQgZHJvcGRvd25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImRyb3Bkb3duLWNvbnRlbnRcIik7XG4gICAgbGV0IGk7XG4gICAgZm9yIChpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IG9wZW5Ecm9wZG93biA9IGRyb3Bkb3duc1tpXTtcbiAgICAgIGlmIChvcGVuRHJvcGRvd24uY2xhc3NMaXN0LmNvbnRhaW5zKFwic2hvd1wiKSkge1xuICAgICAgICBvcGVuRHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcInNob3dcIik7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9