import { word } from "./word_creator";
import { openForm, closeForm, showDropDown } from "./dom_stuff";

const allWords = [];

document.querySelector(".dropbtn").addEventListener("click", showDropDown);
document.querySelector(".add_word").addEventListener("click", openForm);
document.getElementById("btnCancel").addEventListener("click", closeForm);

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
