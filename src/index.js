import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  QuerySnapshot,
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  createWord,
  createWordDB,
  createScoreDb,
  createWordLocalToDb,
  printWordInfo,
  deleteWord,
  submitEdit,
  Word,
  Score,
  orderByWord,
  orderByType,
  orderByScore,
} from "./word_creator";
import {
  openForm,
  closeForm,
  showDropDown,
  renderGameInfo,
  renderWords,
  renderGameRules,
  renderHiscoreStats,
} from "./dom_stuff";
import { Game } from "./game";

const firebaseConfig = {
  apiKey: "AIzaSyCu0m9Rc5JpFfcjVsdGH4n2CwaKiADZxlk",
  authDomain: "wdutchgame.firebaseapp.com",
  projectId: "wdutchgame",
  storageBucket: "wdutchgame.appspot.com",
  messagingSenderId: "251365302162",
  appId: "1:251365302162:web:f650cc63c8cc99f7c4eb4b",
};

initializeApp(firebaseConfig);

//AUTH

const provider = new GoogleAuthProvider();
const auth = getAuth();

export let isSignedIn;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    isSignedIn = true;
    game.isPlaying = true;
    loadWords();
    showProfileInfo(user);
  } else {
    // User is signed out
    isSignedIn = false;
    game.isPlaying = true;
    hideProfileInfo();
    allWords = getStorageData("wordsArray");
    game.isPlaying ? null : renderWords(allWords);
  }
});

function googleLogIn() {
  signInWithPopup(auth, provider);
}

function logOut() {
  signOut(auth);
}

function showProfileInfo(user) {
  let firstName = `${user.displayName}`.split(" ")[0];

  document.getElementById("profile-info").style.display = "flex";
  document.getElementById("login").style.display = "none";
  document.getElementById("profile-name").textContent = `${firstName}`;
  document.getElementById("profile-picture").src = `${user.photoURL}`;
}

function hideProfileInfo() {
  document.getElementById("profile-info").style.display = "none";
  document.getElementById("login").style.display = "block";
}

//FIRESTORE

const db = getFirestore();

async function saveWord(newWord) {
  try {
    await addDoc(collection(db, "words"), wordToDoc(newWord));
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

async function saveScore(score) {
  try {
    await addDoc(collection(db, "scores"), scoreToDoc(score));
  } catch (error) {
    console.error("Error writing new message to Firebase Database", error);
  }
}

function loadWords() {
  const q = query(
    collection(db, "words"),
    where("ownerId", "==", auth.currentUser.uid),
    orderBy("nedWord")
  );
  onSnapshot(q, (querySnapshot) => {
    allWords = [];
    querySnapshot.forEach((snapshot) => allWords.push(docsToWord(snapshot)));
    game.isPlaying ? null : renderWords(allWords);
  });
}

async function removeWord(nedWord) {
  const docRef = doc(db, "words", await getWordIdDB(nedWord));

  deleteDoc(docRef);
}

async function updateWord(nedWord) {
  const docRef = doc(db, "words", await getWordIdDB(nedWord));

  updateDoc(docRef, {
    nedWord: document.getElementById("dutchWord_input_edit").value,
    natWord: document.getElementById("nativeWord_input_edit").value,
    article: document.getElementById("deOfHet_edit").value,
    type: document.getElementById("typeOfWord_edit").value,
  });
}

async function resetValueDb() {
  const q = query(
    collection(db, "words"),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, {
      value: 0,
    });
  });
}

export async function addScoreDb(nedWord) {
  const q = query(
    collection(db, "words"),
    where("nedWord", "==", nedWord),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, {
      value: doc.data().value + 1,
    });
  });
}

//

export async function decreaseScoreDb(nedWord) {
  const q = query(
    collection(db, "words"),
    where("nedWord", "==", nedWord),
    where("ownerId", "==", auth.currentUser.uid)
  );
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    updateDoc(doc.ref, {
      value: doc.data().value - 1,
    });
  });
}

async function getWordIdDB(nedWord) {
  const q = query(
    collection(db, "words"),
    where("nedWord", "==", nedWord),
    where("ownerId", "==", auth.currentUser.uid)
  );

  const querySnapshot = await getDocs(q);
  const docRefId = querySnapshot.docs[0].id;

  return docRefId;
}

//UTILS

async function copyLocalToCloud() {
  if (isSignedIn) {
    const q = query(
      collection(db, "words"),
      where("ownerId", "==", auth.currentUser.uid)
    );
    const local = getStorageData("wordsArray");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      local.forEach((word) => {
        word.nedWord === doc.data().nedWord
          ? local.splice(findIndex(local, word.nedWord), 1)
          : null;
      });
    });
    local.forEach((word) => {
      saveWord(createWordLocalToDb(word));
    });
  }
}

async function copyCloudToLocal() {
  if (isSignedIn) {
    const q = query(
      collection(db, "words"),
      where("ownerId", "==", auth.currentUser.uid)
    );

    const local = getStorageData("wordsArray");
    const temp = [];

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      temp.push(
        new Word(
          doc.data().type,
          doc.data().article,
          doc.data().nedWord,
          doc.data().natWord,
          doc.data().value,
          doc.data().link
        )
      );
    });

    const results = temp.filter(
      ({ nedWord: id1 }) => !local.some(({ nedWord: id2 }) => id2 === id1)
    );

    results.forEach((word) => {
      local.push(word);
    });

    addToLocalStorage("wordsArray", local);
  }
}

function docsToWord(doc) {
  return new Word(
    doc.data().type,
    doc.data().article,
    doc.data().nedWord,
    doc.data().natWord,
    doc.data().value,
    doc.data().link
  );
}

function wordToDoc(word) {
  return {
    ownerId: auth.currentUser.uid,
    type: word.wType,
    article: word.wArticle,
    nedWord: word.nedWord,
    natWord: word.natWord,
    value: word.value,
    link: word.link,
    createdAt: serverTimestamp(),
  };
}

function docToScore(doc) {
  return new Score(doc.data().score);
}

function scoreToDoc(score) {
  return {
    score: score.score,
    category: score.category,
    length: score.total,
    percentage: score.percentage,
    createdAt: serverTimestamp(),
    name: score.name,
  };
}

function findIndex(array, nedWord) {
  let index = array
    .map(function (x) {
      return x.nedWord;
    })
    .indexOf(nedWord);

  return index;
}

let allWords;

let gameArray = [];

let index = undefined;

let game = new Game(gameArray, 0);

let containerBody = document.querySelector(".container_body");

let addForm = document.getElementById("form_container_add");
let editForm = document.getElementById("form_container_edit");

let dropBtn = document.getElementById("dropbtn");

let addWordBtn = document.getElementById("add_word");
let deleteWordBtn = document.getElementById("delete_word");

let addBtn = document.getElementById("btnAdd_add");

let cancelBtnAdd = document.getElementById("btnCancel_add");
let cancelBtnEdit = document.getElementById("btnCancel_edit");

let playBtn = document.getElementById("playBtn");
let playBtn_ = document.getElementById("playBtn_");
let wordsBtn = document.getElementById("playWords");
let prepositionsBtn = document.getElementById("playPrepositions");
let verbsBtn = document.getElementById("playVerbs");
let instructionsBtn = document.getElementById("instructions");

let inputAnswer = document.getElementById("input_answer");
let wordOnScreen = document.getElementById("wordOnScreen");
let currentScoreValue = document.getElementById("current_score_value");

let listBtn = document.getElementById("seeWordsBtn");
let resetBtn = document.getElementById("resetWordsScore");

let myFormAdd = document.getElementById("myForm_add");
let myFormEdit = document.getElementById("myForm_edit");

let searchBar = document.getElementById("searchBar");

//
let answerResult = document.getElementById("answer-result");
let answerCorrect = document.getElementById("answer-correct");
let answerInput = document.getElementById("answer-input");
let lastWord = document.getElementById("last-word");
let startGameBtn = document.getElementById("start-game-btn");
//

let indicator = document.getElementById("indicator");
let remainingWords = document.getElementById("remaining_words");

let logInBtn = document.getElementById("login");
let logOutBtn = document.getElementById("logout");

let localToCloud = document.getElementById("local-to-cloud");
let cloudToLocal = document.getElementById("cloud-to-local");

let submitHiscoreBtn = document.getElementById("submit-hiscore-btn");
let hiscoreBackground = document.getElementById("hiscore-background");

//EVENT LISTENERS

//

logInBtn.addEventListener("click", googleLogIn);
logOutBtn.addEventListener("click", logOut);

localToCloud.addEventListener("click", copyLocalToCloud);
cloudToLocal.addEventListener("click", copyCloudToLocal);

//

// hiScoreValue.textContent = game.hiScore;

containerBody.addEventListener("click", function (e) {
  if (
    e.target.parentNode.className === "row" ||
    e.target.parentNode.className === "row positiveScore" ||
    e.target.parentNode.className === "row negativeScore"
  ) {
    index = allWords.findIndex((word) => {
      return word.nedWord === `${e.target.parentNode.id}`;
    });
    printWordInfo(allWords, index);
    openForm(myFormEdit);
  }

  if (e.target.id === "btnAdd_edit") {
    if (
      editForm.childNodes[5].value !== "" &&
      editForm.childNodes[9].value !== ""
    ) {
      if (isSignedIn) {
        // submitEdit(allWords, index, editForm.childNodes[5]);
        // renderWords(allWords, containerBody);
        updateWord(allWords[index].nedWord);
        closeForm(myFormEdit);
      } else {
        submitEdit(allWords, index, editForm.childNodes[5]);
        addToLocalStorage("wordsArray", allWords);
        renderWords(allWords, containerBody);
        closeForm(myFormEdit);
      }
    }
  }
  if (
    e.target.className === "table-header" &&
    e.target.textContent === "Type"
  ) {
    if (!isSignedIn) {
      orderByType(allWords);
      addToLocalStorage("wordsArray", allWords);
      renderWords(allWords, containerBody);
    }
  }
  if (
    e.target.className === "table-header" &&
    e.target.textContent === "Word"
  ) {
    if (!isSignedIn) {
      orderByWord(allWords);
      addToLocalStorage("wordsArray", allWords);
      renderWords(allWords, containerBody);
    }
  }
  if (
    e.target.className === "table-header" &&
    e.target.textContent === "Score"
  ) {
    if (!isSignedIn) {
      orderByScore(allWords);
      addToLocalStorage("wordsArray", allWords);
      renderWords(allWords, containerBody);
    }
  }
});

playBtn.addEventListener("click", function () {
  game.isPlaying = true;
  renderGameInfo();
  game.startGame(allWords, currentScoreValue, "Standard", startGameBtn);
  // correctAnswer.textContent = "";

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(indicator, wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent =
      "Add words clicking on the top right corner first!";
  }
});

startGameBtn.addEventListener("click", function () {
  game.isPlaying = true;
  renderGameInfo();
  game.startGame(allWords, currentScoreValue, "Standard", startGameBtn);
  // correctAnswer.textContent = "";

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(indicator, wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent =
      "Add words clicking on the top right corner first!";
  }
});

playBtn_.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  // correctAnswer.textContent = "";

  let allNegativeWordsArray = allWords.filter((word) => word.value < 0);
  game.startGame(
    allNegativeWordsArray,
    currentScoreValue,
    "Wrong Words",
    startGameBtn
  );

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(indicator, wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 NEGATIVE SCORE WORDS!";
  }
});

wordsBtn.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  // correctAnswer.textContent = "";

  let allWoordenschatArray = allWords.filter(
    (word) => word.wType !== "Preposition" && word.wType !== "Irregular-Verb"
  );

  game.startGame(
    allWoordenschatArray,
    currentScoreValue,
    "Woordenschat",
    startGameBtn
  );

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(indicator, wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 WOORDENSCHAT LEFT!";
  }
});

prepositionsBtn.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  // correctAnswer.textContent = "";

  let allPrepositionsArray = allWords.filter(
    (word) => word.wType === "Preposition"
  );

  game.startGame(
    allPrepositionsArray,
    currentScoreValue,
    "Prepositions",
    startGameBtn
  );

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(indicator, wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 PREPOSITIONS LEFT!";
  }
});

verbsBtn.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  // correctAnswer.textContent = "";

  let allIVerbsArray = allWords.filter(
    (word) => word.wType === "Irregular-Verb"
  );

  console.log(allIVerbsArray);

  game.startGame(
    allIVerbsArray,
    currentScoreValue,
    "Irregular Verbs",
    startGameBtn
  );

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(indicator, wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 VERBS LEFT!";
  }
});

listBtn.addEventListener("click", function () {
  game.isPlaying = false;
  renderWords(allWords, containerBody);
});

resetBtn.addEventListener("click", () => {
  game.isPlaying = false;
  if (isSignedIn) {
    resetValueDb();
  } else {
    allWords.forEach((word) => {
      word.value = 0;
      renderWords(allWords, containerBody);
      addToLocalStorage("wordsArray", allWords);
    });
  }
});

instructionsBtn.addEventListener("click", () => {
  game.isPlaying = false;
  console.log("testing");
  renderGameRules();
});

addBtn.addEventListener("click", function (e) {
  game.isPlaying = false;
  if (addForm.checkValidity()) {
    e.preventDefault();
    if (isSignedIn) {
      // createWord(allWords);
      saveWord(createWordDB());
      addForm.reset();
      renderWords(allWords);
      document.getElementById("dutchWord_input_add").focus();
    } else {
      createWord(allWords);
      addToLocalStorage("wordsArray", allWords);
      addForm.reset();
      renderWords(allWords);
      document.getElementById("dutchWord_input_add").focus();
    }
  }
});

inputAnswer.addEventListener("keyup", function (e) {
  if (e.keyCode === 13 && game.gameArray.length !== 0) {
    game.compareWords(
      inputAnswer,
      answerResult,
      answerCorrect,
      answerInput,
      lastWord
    );
    game.removeFirstObject();
    game.updateScore(currentScoreValue);
    game.updateLocalStorage("hiScore");
    isSignedIn ? null : addToLocalStorage("wordsArray", allWords);
    if (game.gameArray.length !== 0) {
      game.nextWord(indicator, wordOnScreen, remainingWords);
    } else {
      game.currentScore > 0
        ? renderHiscoreStats(
            game.gameType,
            game.currentScore,
            game.gameLength,
            game.calculateSuccess(game.gameLength, game.currentScore)
          )
        : null;
      wordOnScreen.textContent = "DONE!";
      remainingWords.textContent = "/0 words";
    }
    inputAnswer.value = "";
  }
});

//

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  const filteredWords = allWords.filter((word) => {
    return (
      word.nedWord.toLowerCase().includes(searchString) ||
      word.natWord.toLowerCase().includes(searchString)
    );
  });
  renderWords(filteredWords);
});

deleteWordBtn.addEventListener("click", (e) => {
  game.isPlaying = false;
  if (e.target.id === "delete_word") {
    e.preventDefault();
    if (isSignedIn) {
      removeWord(allWords[index].nedWord);
      closeForm(myFormEdit);
    } else {
      deleteWord(allWords, index);
      renderWords(allWords);
      addToLocalStorage("wordsArray", allWords);
      closeForm(myFormEdit);
    }
  }
});

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (event.target.id !== "dropbtn") {
    let dropdowns = document.getElementsByClassName("dropdown_content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

hiscoreBackground.addEventListener("click", (e) => {
  if (e.target.id === "hiscore-background") {
    hiscoreBackground.style.display = "none";
  }
});

submitHiscoreBtn.addEventListener("click", () => {
  let hiscoreName = document.getElementById("hiscore-input").value;

  saveScore(
    createScoreDb(
      game.currentScore,
      game.gameLength,
      game.gameType,
      game.calculateSuccess(game.gameLength, game.currentScore),
      hiscoreName
    )
  );
  hiscoreBackground.style.display = "none";
});

dropBtn.addEventListener("click", showDropDown);

addWordBtn.addEventListener("click", function () {
  game.isPlaying = false;
  openForm(myFormAdd);
});

cancelBtnAdd.addEventListener("click", function () {
  closeForm(myFormAdd);
});

cancelBtnEdit.addEventListener("click", function () {
  closeForm(myFormEdit);
});

function addToLocalStorage(name, arr) {
  localStorage.setItem(name, JSON.stringify(arr));
}

function getStorageData(name) {
  return JSON.parse(localStorage.getItem(name) || "[]");
}
