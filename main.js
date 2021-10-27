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
/* harmony export */   "randomWord": () => (/* binding */ randomWord),
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
let randomWord = undefined;

let wordOnScreen = document.getElementById("wordOnScreen");

class Game {
  constructor(wordsArray) {
    this.wordsArray = wordsArray;
  }
  compare(input) {
    if (randomWord.natWord === input.value) {
      return console.log("yh");
    } else {
      return console.log("nh");
    }
  }

  selectRandom(wordsArray) {
    randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    wordOnScreen.textContent = randomWord.nedWord;
    return randomWord;
  }

  remove() {}
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "allWords": () => (/* binding */ allWords)
/* harmony export */ });
/* harmony import */ var _word_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./word_creator */ "./src/word_creator.js");
/* harmony import */ var _dom_stuff__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom_stuff */ "./src/dom_stuff.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game */ "./src/game.js");




let allWords = [
  // {
  //   dutch: "moelijk",
  //   english: "difficult",
  // },
  // {
  //   dutch: "mooi",
  //   english: "nice",
  // },
  // {
  //   dutch: "vrouw",
  //   english: "woman",
  // },
  // {
  //   dutch: "aantrekkelijk",
  //   english: "atractive",
  // },
  // {
  //   dutch: "vrede",
  //   english: "peace",
  // },
  // {
  //   dutch: "regenachtig",
  //   english: "rainy",
  // },
  // {
  //   dutch: "wisselvalig",
  //   english: "changeable",
  // },
];

let game = new _game__WEBPACK_IMPORTED_MODULE_2__.Game(allWords);

let addForm = document.querySelector(".form-container");
let dropBtn = document.querySelector(".dropbtn");
let addWord = document.querySelector(".add_word");
let cancelBtn = document.getElementById("btnCancel");
let addBtn = document.getElementById("btnAdd");
let playBtn = document.getElementById("playBtn");
let inputAnswer = document.getElementById("input_answer");

playBtn.addEventListener("click", function () {
  if (allWords.length !== 0) {
    game.selectRandom(allWords);
  }
  console.log(allWords);
});

dropBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.showDropDown);

addWord.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.openForm);

cancelBtn.addEventListener("click", _dom_stuff__WEBPACK_IMPORTED_MODULE_1__.closeForm);

addBtn.addEventListener("click", function (e) {
  if (addForm.checkValidity()) {
    e.preventDefault();
    (0,_word_creator__WEBPACK_IMPORTED_MODULE_0__.createWord)(allWords);
    addForm.reset();
  }
});

inputAnswer.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && allWords.length !== 0 && _game__WEBPACK_IMPORTED_MODULE_2__.randomWord !== undefined) {
    game.compare(inputAnswer);
    game.selectRandom(allWords);
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDWk87O0FBRVA7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjRDO0FBQ29CO0FBQ3RCOztBQUVuQztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjs7QUFFQSxlQUFlLHVDQUFJOztBQUVuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxrQ0FBa0Msb0RBQVk7O0FBRTlDLGtDQUFrQyxnREFBUTs7QUFFMUMsb0NBQW9DLGlEQUFTOztBQUU3QztBQUNBO0FBQ0E7QUFDQSxJQUFJLHlEQUFVO0FBQ2Q7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxtREFBbUQsNkNBQVU7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0Isc0JBQXNCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2RvbV9zdHVmZi5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvd29yZF9jcmVhdG9yLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gb3BlbkZvcm0oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZUZvcm0oKSB7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXlGb3JtXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuLyogV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJ1dHRvbixcbnRvZ2dsZSBiZXR3ZWVuIGhpZGluZyBhbmQgc2hvd2luZyB0aGUgZHJvcGRvd24gY29udGVudCAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNob3dEcm9wRG93bigpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteURyb3Bkb3duXCIpLmNsYXNzTGlzdC50b2dnbGUoXCJzaG93XCIpO1xufVxuIiwiZXhwb3J0IGxldCByYW5kb21Xb3JkID0gdW5kZWZpbmVkO1xuXG5sZXQgd29yZE9uU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JkT25TY3JlZW5cIik7XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgY29uc3RydWN0b3Iod29yZHNBcnJheSkge1xuICAgIHRoaXMud29yZHNBcnJheSA9IHdvcmRzQXJyYXk7XG4gIH1cbiAgY29tcGFyZShpbnB1dCkge1xuICAgIGlmIChyYW5kb21Xb3JkLm5hdFdvcmQgPT09IGlucHV0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coXCJ5aFwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbnNvbGUubG9nKFwibmhcIik7XG4gICAgfVxuICB9XG5cbiAgc2VsZWN0UmFuZG9tKHdvcmRzQXJyYXkpIHtcbiAgICByYW5kb21Xb3JkID0gd29yZHNBcnJheVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB3b3Jkc0FycmF5Lmxlbmd0aCldO1xuICAgIHdvcmRPblNjcmVlbi50ZXh0Q29udGVudCA9IHJhbmRvbVdvcmQubmVkV29yZDtcbiAgICByZXR1cm4gcmFuZG9tV29yZDtcbiAgfVxuXG4gIHJlbW92ZSgpIHt9XG59XG4iLCJjbGFzcyBXb3JkIHtcbiAgY29uc3RydWN0b3IobmVkV29yZCwgbmF0V29yZCwgdmFsdWUsIHdBcnRpY2xlLCB3VHlwZSkge1xuICAgIHRoaXMubmVkV29yZCA9IG5lZFdvcmQ7XG4gICAgdGhpcy5uYXRXb3JkID0gbmF0V29yZDtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy53QXJ0aWNsZSA9IHdBcnRpY2xlO1xuICAgIHRoaXMud1R5cGUgPSB3VHlwZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yZChhcnIpIHtcbiAgbGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dFwiKS52YWx1ZTtcbiAgbGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRcIikudmFsdWU7XG4gIGxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkXCIpLnZhbHVlO1xuICBsZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldFwiKS52YWx1ZTtcbiAgLy9cbiAgbGV0IG5ld1dvcmQgPSBuZXcgV29yZChkV29yZElucHV0LCBuV29yZElucHV0LCAwLCBkZU9mSGV0LCB0eXBlT2ZXb3JkKTtcbiAgYXJyLnB1c2gobmV3V29yZCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVdvcmQgfSBmcm9tIFwiLi93b3JkX2NyZWF0b3JcIjtcbmltcG9ydCB7IG9wZW5Gb3JtLCBjbG9zZUZvcm0sIHNob3dEcm9wRG93biB9IGZyb20gXCIuL2RvbV9zdHVmZlwiO1xuaW1wb3J0IHsgR2FtZSwgcmFuZG9tV29yZCB9IGZyb20gXCIuL2dhbWVcIjtcblxuZXhwb3J0IGxldCBhbGxXb3JkcyA9IFtcbiAgLy8ge1xuICAvLyAgIGR1dGNoOiBcIm1vZWxpamtcIixcbiAgLy8gICBlbmdsaXNoOiBcImRpZmZpY3VsdFwiLFxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgZHV0Y2g6IFwibW9vaVwiLFxuICAvLyAgIGVuZ2xpc2g6IFwibmljZVwiLFxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgZHV0Y2g6IFwidnJvdXdcIixcbiAgLy8gICBlbmdsaXNoOiBcIndvbWFuXCIsXG4gIC8vIH0sXG4gIC8vIHtcbiAgLy8gICBkdXRjaDogXCJhYW50cmVra2VsaWprXCIsXG4gIC8vICAgZW5nbGlzaDogXCJhdHJhY3RpdmVcIixcbiAgLy8gfSxcbiAgLy8ge1xuICAvLyAgIGR1dGNoOiBcInZyZWRlXCIsXG4gIC8vICAgZW5nbGlzaDogXCJwZWFjZVwiLFxuICAvLyB9LFxuICAvLyB7XG4gIC8vICAgZHV0Y2g6IFwicmVnZW5hY2h0aWdcIixcbiAgLy8gICBlbmdsaXNoOiBcInJhaW55XCIsXG4gIC8vIH0sXG4gIC8vIHtcbiAgLy8gICBkdXRjaDogXCJ3aXNzZWx2YWxpZ1wiLFxuICAvLyAgIGVuZ2xpc2g6IFwiY2hhbmdlYWJsZVwiLFxuICAvLyB9LFxuXTtcblxubGV0IGdhbWUgPSBuZXcgR2FtZShhbGxXb3Jkcyk7XG5cbmxldCBhZGRGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb3JtLWNvbnRhaW5lclwiKTtcbmxldCBkcm9wQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wYnRuXCIpO1xubGV0IGFkZFdvcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZF93b3JkXCIpO1xubGV0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQ2FuY2VsXCIpO1xubGV0IGFkZEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnRuQWRkXCIpO1xubGV0IHBsYXlCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXlCdG5cIik7XG5sZXQgaW5wdXRBbnN3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0X2Fuc3dlclwiKTtcblxucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICBpZiAoYWxsV29yZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5zZWxlY3RSYW5kb20oYWxsV29yZHMpO1xuICB9XG4gIGNvbnNvbGUubG9nKGFsbFdvcmRzKTtcbn0pO1xuXG5kcm9wQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzaG93RHJvcERvd24pO1xuXG5hZGRXb3JkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBvcGVuRm9ybSk7XG5cbmNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xvc2VGb3JtKTtcblxuYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICBpZiAoYWRkRm9ybS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY3JlYXRlV29yZChhbGxXb3Jkcyk7XG4gICAgYWRkRm9ybS5yZXNldCgpO1xuICB9XG59KTtcblxuaW5wdXRBbnN3ZXIuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChlKSB7XG4gIGlmIChlLmtleUNvZGUgPT09IDEzICYmIGFsbFdvcmRzLmxlbmd0aCAhPT0gMCAmJiByYW5kb21Xb3JkICE9PSB1bmRlZmluZWQpIHtcbiAgICBnYW1lLmNvbXBhcmUoaW5wdXRBbnN3ZXIpO1xuICAgIGdhbWUuc2VsZWN0UmFuZG9tKGFsbFdvcmRzKTtcbiAgICBpbnB1dEFuc3dlci52YWx1ZSA9IFwiXCI7XG4gIH1cbn0pO1xuXG4vLyBDbG9zZSB0aGUgZHJvcGRvd24gbWVudSBpZiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBpdFxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5kcm9wYnRuXCIpKSB7XG4gICAgbGV0IGRyb3Bkb3ducyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkcm9wZG93bi1jb250ZW50XCIpO1xuICAgIGxldCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBkcm9wZG93bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICBpZiAob3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIikpIHtcbiAgICAgICAgb3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==