import { word } from "./word_creator";

const allWords = [];

let test = new word("moelijk", "difficuly", 0);

allWords.push(test);

console.log(allWords);

document.querySelector(".dropbtn").addEventListener("click", myFunction);
document.querySelector(".add_word").addEventListener("click", openForm);
document.getElementById("btnCancel").addEventListener("click", closeForm);

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

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

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
