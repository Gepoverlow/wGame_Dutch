let typeOfWord = document.getElementById("typeOfWord_edit");
let deOfHet = document.getElementById("deOfHet_edit");
let dWordInput = document.getElementById("dutchWord_input_edit");
let nWordInput = document.getElementById("nativeWord_input_edit");

export class Word {
  constructor(wType, wArticle, nedWord, natWord, value, link) {
    this.wType = wType;
    this.wArticle = wArticle;
    this.nedWord = nedWord;
    this.natWord = natWord;
    this.value = value;
    this.link = link;
  }
}

export class Score {
  constructor(category, name, score, total, percentage, date) {
    this.category = category;
    this.name = name;
    this.score = score;
    this.total = total;
    this.percentage = percentage;
    this.date = date;
  }
}

// category, name, score, total, percentage, date

export function createScoreDb(category, name, score, total, percentage, date) {
  let newScore = new Score(category, name, score, total, percentage, date);
  console.log(newScore);
  return newScore;
}

export function createWordLocalToDb(word) {
  let newWord = new Word(
    word.wType,
    word.wArticle,
    word.nedWord,
    word.natWord,
    word.value,
    "Meaning in Woorden - > "
  );
  return newWord;
}

export function createWordDB() {
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

  return newWord;
}

export function createWord(arr) {
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

export function deleteWord(array, index) {
  return array.splice(index, 1);
}

export function printWordInfo(array, index) {
  typeOfWord.value = array[index].wType;
  deOfHet.value = array[index].wArticle;
  dWordInput.value = array[index].nedWord;
  nWordInput.value = array[index].natWord;
}

export function submitEdit(array, index) {
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

export function orderByWord(arr) {
  arr.sort(function (a, b) {
    let nameA = a.nedWord.toLowerCase();
    let nameB = b.nedWord.toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  });
}

export function orderByType(arr) {
  arr.sort(function (a, b) {
    let nameA = a.wType.toLowerCase();
    let nameB = b.wType.toLowerCase();
    if (nameA < nameB)
      //sort string ascending
      return -1;
    if (nameA > nameB) return 1;
    return 0; //default return value (no sorting)
  });
}

export function orderByScore(arr) {
  arr.sort((a, b) => (a.value > b.value ? 1 : -1));
}
