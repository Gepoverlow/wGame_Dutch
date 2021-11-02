class Word {
  constructor(wType, wArticle, nedWord, natWord, value) {
    this.wType = wType;
    this.wArticle = wArticle;
    this.nedWord = nedWord;
    this.natWord = natWord;
    this.value = value;
  }
}

export function createWord(arr) {
  let typeOfWord = document.getElementById("typeOfWord-add").value;
  let deOfHet = document.getElementById("deOfHet-add").value;
  let dWordInput = document.getElementById("dutchWord_input-add").value;
  let nWordInput = document.getElementById("nativeWord_input-add").value;
  //

  let newWord = new Word(typeOfWord, deOfHet, dWordInput, nWordInput, 0);

  //
  if (arr.some((e) => e.nedWord === `${dWordInput}`)) {
    alert("word is already here");
  } else {
    arr.push(newWord);
  }
}
