let containerBody = document.querySelector(".container_body");
let addForm = document.getElementById("myForm_add");
let editForm = document.getElementById("myForm_edit");
let containerGame = document.getElementById("container_game");

let headersWords = [
  "Type",
  "DE/HET",
  "Word",
  "Your Meaning",
  "Score",
  "Woordensboek Meaning",
];

let headersScores = [
  "Game Type",
  "Name",
  "Score",
  "Out Of",
  "Percentage",
  "Date",
];

export function openForm(htmlElement) {
  htmlElement.style.display = "block";
}

export function closeForm(htmlElement) {
  htmlElement.style.display = "none";
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export function showDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}

export function renderWords(arr) {
  emptyNode(containerBody);

  let tableWrapper = document.createElement("div");
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");
  headerRow.id = "header-row";
  tableWrapper.id = "tableWrapper";
  table.id = "wordsTable";

  headersWords.forEach((headerText) => {
    let header = document.createElement("th");
    header.className = "table-header";
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export function renderScores(arr) {
  emptyNode(containerBody);

  let tableWrapper = document.createElement("div");
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");
  headerRow.id = "header-row-hiscores";
  tableWrapper.id = "tableWrapper-hiscores";
  table.id = "wordsTable-hiscores";

  headersScores.forEach((headerText) => {
    let header = document.createElement("th");
    header.className = "table-header-hiscores";
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  arr.forEach((word) => {
    let row = document.createElement("tr");
    // row.id = word.name;
    Object.values(word).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });

    row.classList.add("row");
    table.appendChild(row);
  });

  tableWrapper.appendChild(table);
  containerBody.appendChild(tableWrapper);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

export function renderGameInfo() {
  emptyNode(containerBody);
  containerBody.appendChild(containerGame);
}

export function renderGameRules() {
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

  ruleCreator(
    "To add items to the PREPOSITIONS ONLY GAME, just make sure that the word has the acording Preposition word type",
    infoUL
  );

  ruleCreator(
    "To add items to the IRREGULAR VERB ONLY GAME, just make sure that the word has the acording Irregular-Verb word type",
    infoUL
  );

  ruleCreator(
    "Clicking on Type, Word and Score table headers will organize it alphabetically or by value",
    infoUL
  );
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

export function renderHiscoreStats(category, score, total, percentage) {
  let hiscoreBackground = document.getElementById("hiscore-background");
  hiscoreBackground.style.display = "flex";

  let hCategory = document.getElementById("hiscore-category");
  let hScore = document.getElementById("hiscore-score");
  let hTotal = document.getElementById("hiscore-total");
  let hPercentage = document.getElementById("hiscore-percentage");

  hCategory.textContent = `CATEGORY: ${category}`;
  hScore.textContent = `SCORE: ${score}`;
  hTotal.textContent = `TOTAL WORDS: ${total}`;
  hPercentage.textContent = `PERCENTAGE: ${percentage}`;
}
