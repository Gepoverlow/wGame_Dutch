export function openForm() {
  document.getElementById("myForm").style.display = "block";
}

export function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
export function showDropDown() {
  document.getElementById("myDropdown").classList.toggle("show");
}
