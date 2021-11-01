let containerBody = document.querySelector(".container_body");
let addForm = document.getElementById("myForm");

let headers = ["Type", "DE/HET", "Word", "Your Meaning", "score"];

export function openForm() {
  addForm.style.display = "block";
}

export function closeForm() {
  document.getElementById("myForm").style.display = "none";
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
  tableWrapper.id = "tableWrapper";
  table.id = "wordsTable";

  headers.forEach((headerText) => {
    let header = document.createElement("th");
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });
  table.appendChild(headerRow);

  arr.forEach((emp) => {
    let row = document.createElement("tr");
    Object.values(emp).forEach((text) => {
      let cell = document.createElement("td");
      let textNode = document.createTextNode(text);
      cell.appendChild(textNode);
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  tableWrapper.appendChild(table);
  containerBody.appendChild(tableWrapper);
}

export function renderGameInfo() {
  emptyNode(containerBody);
}

function emptyNode(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
  containerBody.appendChild(addForm);
}
