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
  createWordLocalToDb,
  printWordInfo,
  deleteWord,
  submitEdit,
  Word,
} from "./word_creator";
import {
  openForm,
  closeForm,
  showDropDown,
  renderGameInfo,
  renderWords,
  renderGameRules,
  reArrange,
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
    loadWords();
    showProfileInfo(user);
    isSignedIn = true;
  } else {
    // User is signed out
    hideProfileInfo();
    isSignedIn = false;
    allWords = getStorageData("wordsArray");
    renderWords(allWords);
  }
});

function googleLogIn() {
  signInWithPopup(auth, provider);
}

function logOut() {
  signOut(auth)
    .then(() => {
      console.log("user logged out!");
    })
    .catch((e) => {
      console.log(e);
    });
}

function showProfileInfo(user) {
  document.getElementById("profile-info").style.display = "flex";
  document.getElementById("login").style.display = "none";
  document.getElementById("profile-name").textContent = `${user.displayName}`;
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
function loadWords() {
  const q = query(
    collection(db, "words"),
    where("ownerId", "==", auth.currentUser.uid),
    orderBy("createdAt")
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
    article: document.getElementById("typeOfWord_edit").value,
    type: document.getElementById("deOfHet_edit").value,
  });
}

export async function addScoreDb(nedWord) {
  const docRef = doc(db, "words", await getWordIdDB(nedWord));
  const q = query(collection(db, "words"), where("nedWord", "==", nedWord));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    updateDoc(docRef, {
      value: doc.data().value + 1,
    });
  });
}

export async function decreaseScoreDb(nedWord) {
  const docRef = doc(db, "words", await getWordIdDB(nedWord));
  const q = query(collection(db, "words"), where("nedWord", "==", nedWord));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    updateDoc(docRef, {
      value: doc.data().value - 1,
    });
  });
}

async function getWordIdDB(nedWord) {
  const q = query(collection(db, "words"), where("nedWord", "==", nedWord));

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

let game = new Game(gameArray, 0, getStorageData("hiScore"));

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
let wordsBtn = document.getElementById("playWords");
let prepositionsBtn = document.getElementById("playPrepositions");
let verbsBtn = document.getElementById("playVerbs");
let instructionsBtn = document.getElementById("instructions");
let rearrangeBtn = document.getElementById("re-arrange");

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

let indicator = document.getElementById("indicator");
let remainingWords = document.getElementById("remaining_words");

let logInBtn = document.getElementById("login");
let logOutBtn = document.getElementById("logout");

let localToCloud = document.getElementById("localToCloud");

//EVENT LISTENERS

//

logInBtn.addEventListener("click", googleLogIn);
logOutBtn.addEventListener("click", logOut);

localToCloud.addEventListener("click", copyLocalToCloud);

//

hiScoreValue.textContent = game.hiScore;

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
});

playBtn.addEventListener("click", function () {
  game.isPlaying = true;
  renderGameInfo();
  game.startGame(allWords, currentScoreValue, hiScoreValue);
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "ADD SOME WORDS BEFORE PLAYING!";
  }
});

playBtn_.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allNegativeWordsArray = allWords.filter((word) => word.value < 0);
  game.startGame(allNegativeWordsArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 NEGATIVE SCORE WORDS!";
  }
});

wordsBtn.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allWoordenschatArray = allWords.filter(
    (word) => !word.nedWord.includes("ARTICLE") && !word.nedWord.includes("IV")
  );

  game.startGame(allWoordenschatArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 WOORDENSCHAT LEFT!";
  }
});

prepositionsBtn.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allPrepositionsArray = allWords.filter((word) =>
    word.nedWord.includes("ARTICLE")
  );

  game.startGame(allPrepositionsArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 PREPOSITIONS LEFT!";
  }
});

verbsBtn.addEventListener("click", () => {
  game.isPlaying = true;
  renderGameInfo();
  correctAnswer.textContent = "";
  indicator.textContent = "Word ->";

  let allIVerbsArray = allWords.filter((word) => word.nedWord.includes("IV"));

  game.startGame(allIVerbsArray, currentScoreValue, hiScoreValue);

  if (game.gameArray.length !== 0) {
    game.randomizeArray();
    game.nextWord(wordOnScreen, remainingWords);
  } else if (game.gameArray.length === 0) {
    wordOnScreen.textContent = "0 VERBS LEFT!";
  }
});

listBtn.addEventListener("click", function () {
  game.isPlaying = false;
  renderWords(allWords, containerBody);
});

rearrangeBtn.addEventListener("click", () => {
  game.isPlaying = false;
  if (!isSignedIn) {
    reArrange(allWords);
    addToLocalStorage("wordsArray", allWords);
    renderWords(allWords, containerBody);
  }
});

resetBtn.addEventListener("click", () => {
  game.isPlaying = false;
  allWords.forEach((word) => {
    word.value = 0;
    renderWords(allWords, containerBody);
    addToLocalStorage("wordsArray", allWords);
  });
  console.log(allWords);
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
    game.compareWords(inputAnswer, correctAnswer);
    game.removeFirstObject();
    game.updateScore(currentScoreValue, hiScoreValue);
    game.updateLocalStorage("hiScore");
    isSignedIn ? null : addToLocalStorage("wordsArray", allWords);
    if (game.gameArray.length !== 0) {
      game.nextWord(wordOnScreen, remainingWords);
    } else {
      wordOnScreen.textContent = "DONE!";
      remainingWords.textContent = "/0 words";
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
