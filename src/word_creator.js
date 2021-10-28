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

export function createWord(arr) {
  let dWordInput = document.getElementById("dutchWord_input").value;
  let nWordInput = document.getElementById("nativeWord_input").value;
  let typeOfWord = document.getElementById("typeOfWord").value;
  let deOfHet = document.getElementById("deOfHet").value;
  //
  let newWord = new Word(dWordInput, nWordInput, 0, deOfHet, typeOfWord);
  arr.push(newWord);
}
