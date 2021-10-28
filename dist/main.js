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
      this.addToCorrectArray();
    } else {
      this.addToWrongArray();
    }
  }

  nextWord(htmlElement) {
    htmlElement.textContent = this.initialArray[0].nedWord;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ087QUFDUDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNaQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDMUJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ040QztBQUNvQjtBQUNsQzs7QUFFOUI7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGVBQWUsdUNBQUk7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsa0NBQWtDLG9EQUFZOztBQUU5QyxrQ0FBa0MsZ0RBQVE7O0FBRTFDLG9DQUFvQyxpREFBUzs7QUFFN0M7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBVTtBQUNkLElBQUkseURBQVU7QUFDZDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzQkFBc0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yZXN0dWFyYW50LXBhZ2UvLi9zcmMvZG9tX3N0dWZmLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS8uL3NyYy93b3JkX2NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Jlc3R1YXJhbnQtcGFnZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vcmVzdHVhcmFudC1wYWdlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBvcGVuRm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlRm9ybSgpIHtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJteUZvcm1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vKiBXaGVuIHRoZSB1c2VyIGNsaWNrcyBvbiB0aGUgYnV0dG9uLFxudG9nZ2xlIGJldHdlZW4gaGlkaW5nIGFuZCBzaG93aW5nIHRoZSBkcm9wZG93biBjb250ZW50ICovXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Ryb3BEb3duKCkge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm15RHJvcGRvd25cIikuY2xhc3NMaXN0LnRvZ2dsZShcInNob3dcIik7XG59XG4iLCIvLyBleHBvcnQgbGV0IHJhbmRvbVdvcmQgPSB1bmRlZmluZWQ7XG5cbi8vIGxldCB3b3JkT25TY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndvcmRPblNjcmVlblwiKTtcblxuLy8gZXhwb3J0IGNsYXNzIEdhbWUge1xuLy8gICBjb25zdHJ1Y3Rvcih3b3Jkc0FycmF5KSB7XG4vLyAgICAgdGhpcy53b3Jkc0FycmF5ID0gd29yZHNBcnJheTtcbi8vICAgfVxuLy8gICBjb21wYXJlKGlucHV0KSB7XG4vLyAgICAgaWYgKHJhbmRvbVdvcmQubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbi8vICAgICAgIHJldHVybiBjb25zb2xlLmxvZyhcInloXCIpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICByZXR1cm4gY29uc29sZS5sb2coXCJuaFwiKTtcbi8vICAgICB9XG4vLyAgIH1cblxuLy8gICBzZWxlY3RSYW5kb20od29yZHNBcnJheSkge1xuLy8gICAgIHJhbmRvbVdvcmQgPSB3b3Jkc0FycmF5W01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHdvcmRzQXJyYXkubGVuZ3RoKV07XG4vLyAgICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gcmFuZG9tV29yZC5uZWRXb3JkO1xuLy8gICAgIHJldHVybiByYW5kb21Xb3JkO1xuLy8gICB9XG5cbi8vICAgcmVtb3ZlKCkge31cbi8vIH1cblxuZXhwb3J0IGNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3Rvcihpbml0aWFsQXJyYXksIGNvcnJlY3RBcnJheSwgd3JvbmdBcnJheSkge1xuICAgIHRoaXMuaW5pdGlhbEFycmF5ID0gaW5pdGlhbEFycmF5O1xuICAgIHRoaXMuY29ycmVjdEFycmF5ID0gY29ycmVjdEFycmF5O1xuICAgIHRoaXMud3JvbmdBcnJheSA9IHdyb25nQXJyYXk7XG4gIH1cblxuICBjb21wYXJlV29yZHMoaW5wdXQpIHtcbiAgICBpZiAodGhpcy5pbml0aWFsQXJyYXlbMF0ubmF0V29yZCA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgIHRoaXMuYWRkVG9Db3JyZWN0QXJyYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGRUb1dyb25nQXJyYXkoKTtcbiAgICB9XG4gIH1cblxuICBuZXh0V29yZChodG1sRWxlbWVudCkge1xuICAgIGh0bWxFbGVtZW50LnRleHRDb250ZW50ID0gdGhpcy5pbml0aWFsQXJyYXlbMF0ubmVkV29yZDtcbiAgfVxuXG4gIHJlbW92ZUZpcnN0T2JqZWN0KCkge1xuICAgIHJldHVybiB0aGlzLmluaXRpYWxBcnJheS5zaGlmdCgpO1xuICB9XG5cbiAgYWRkVG9Db3JyZWN0QXJyYXkoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29ycmVjdEFycmF5LnB1c2godGhpcy5yZW1vdmVGaXJzdE9iamVjdCgpKTtcbiAgfVxuXG4gIGFkZFRvV3JvbmdBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy53cm9uZ0FycmF5LnB1c2godGhpcy5yZW1vdmVGaXJzdE9iamVjdCgpKTtcbiAgfVxuICByYW5kb21pemVBcnJheSgpIHtcbiAgICByZXR1cm4gdGhpcy5pbml0aWFsQXJyYXkuc29ydCgoYSwgYikgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG4gIH1cbn1cbiIsImNsYXNzIFdvcmQge1xuICBjb25zdHJ1Y3RvcihuZWRXb3JkLCBuYXRXb3JkLCB2YWx1ZSwgd0FydGljbGUsIHdUeXBlKSB7XG4gICAgdGhpcy5uZWRXb3JkID0gbmVkV29yZDtcbiAgICB0aGlzLm5hdFdvcmQgPSBuYXRXb3JkO1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLndBcnRpY2xlID0gd0FydGljbGU7XG4gICAgdGhpcy53VHlwZSA9IHdUeXBlO1xuICB9XG5cbiAgY29tcGFyZShpbnB1dCkge1xuICAgIGlmICh0aGlzLm5hdFdvcmQgPT09IGlucHV0LnZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29yZChhcnIpIHtcbiAgbGV0IGRXb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1dGNoV29yZF9pbnB1dFwiKS52YWx1ZTtcbiAgbGV0IG5Xb3JkSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5hdGl2ZVdvcmRfaW5wdXRcIikudmFsdWU7XG4gIGxldCB0eXBlT2ZXb3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ0eXBlT2ZXb3JkXCIpLnZhbHVlO1xuICBsZXQgZGVPZkhldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZGVPZkhldFwiKS52YWx1ZTtcbiAgLy9cbiAgbGV0IG5ld1dvcmQgPSBuZXcgV29yZChkV29yZElucHV0LCBuV29yZElucHV0LCAwLCBkZU9mSGV0LCB0eXBlT2ZXb3JkKTtcbiAgYXJyLnB1c2gobmV3V29yZCk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGNyZWF0ZVdvcmQgfSBmcm9tIFwiLi93b3JkX2NyZWF0b3JcIjtcbmltcG9ydCB7IG9wZW5Gb3JtLCBjbG9zZUZvcm0sIHNob3dEcm9wRG93biB9IGZyb20gXCIuL2RvbV9zdHVmZlwiO1xuaW1wb3J0IHsgR2FtZSB9IGZyb20gXCIuL2dhbWVcIjtcblxubGV0IGFsbFdvcmRzID0gW107XG5cbmxldCBpbml0aWFsQXJyYXkgPSBbXTtcbmxldCBjb3JyZWN0QXJyYXkgPSBbXTtcbmxldCB3cm9uZ0FycmF5ID0gW107XG5cbmxldCBnYW1lID0gbmV3IEdhbWUoaW5pdGlhbEFycmF5LCBjb3JyZWN0QXJyYXksIHdyb25nQXJyYXkpO1xuXG5sZXQgYWRkRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9ybS1jb250YWluZXJcIik7XG5sZXQgZHJvcEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGJ0blwiKTtcbmxldCBhZGRXb3JkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGRfd29yZFwiKTtcbmxldCBjYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkNhbmNlbFwiKTtcbmxldCBhZGRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ0bkFkZFwiKTtcbmxldCBwbGF5QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5QnRuXCIpO1xubGV0IGlucHV0QW5zd2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dF9hbnN3ZXJcIik7XG5sZXQgd29yZE9uU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3b3JkT25TY3JlZW5cIik7XG5cbnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgaWYgKGluaXRpYWxBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICBnYW1lLnJhbmRvbWl6ZUFycmF5KCk7XG4gICAgZ2FtZS5uZXh0V29yZCh3b3JkT25TY3JlZW4pO1xuICB9XG59KTtcblxuZHJvcEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc2hvd0Ryb3BEb3duKTtcblxuYWRkV29yZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgb3BlbkZvcm0pO1xuXG5jYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsb3NlRm9ybSk7XG5cbmFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGFkZEZvcm0uY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNyZWF0ZVdvcmQoaW5pdGlhbEFycmF5KTtcbiAgICBjcmVhdGVXb3JkKGFsbFdvcmRzKTtcbiAgICBhZGRGb3JtLnJlc2V0KCk7XG4gIH1cbn0pO1xuXG5pbnB1dEFuc3dlci5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgaWYgKGUua2V5Q29kZSA9PT0gMTMgJiYgYWxsV29yZHMubGVuZ3RoICE9PSAwKSB7XG4gICAgZ2FtZS5jb21wYXJlV29yZHMoaW5wdXRBbnN3ZXIpO1xuICAgIGlmIChnYW1lLmluaXRpYWxBcnJheS5sZW5ndGggIT09IDApIHtcbiAgICAgIGdhbWUubmV4dFdvcmQod29yZE9uU2NyZWVuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd29yZE9uU2NyZWVuLnRleHRDb250ZW50ID0gXCJET05FIVwiO1xuICAgIH1cbiAgICBpbnB1dEFuc3dlci52YWx1ZSA9IFwiXCI7XG4gIH1cbiAgY29uc29sZS5sb2coZ2FtZSk7XG4gIGNvbnNvbGUubG9nKGFsbFdvcmRzKTtcbn0pO1xuXG4vLyBDbG9zZSB0aGUgZHJvcGRvd24gbWVudSBpZiB0aGUgdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBpdFxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcyhcIi5kcm9wYnRuXCIpKSB7XG4gICAgbGV0IGRyb3Bkb3ducyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJkcm9wZG93bi1jb250ZW50XCIpO1xuICAgIGxldCBpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBkcm9wZG93bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGxldCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV07XG4gICAgICBpZiAob3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucyhcInNob3dcIikpIHtcbiAgICAgICAgb3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoXCJzaG93XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==