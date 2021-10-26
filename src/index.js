console.log("hello worldddddd");

const allWords = [];

const word = function (nedWord, natWord, value) {
  this.nedWord = nedWord;
  this.natWord = natWord;
  this.value = value;
};

let test = new word("moelijk", "difficuly", 0);

allWords.push(test);

console.log(allWords);

document.querySelector(".dropbtn").addEventListener("click", myFunction);

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
