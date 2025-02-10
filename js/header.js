/**
 * Function that toggles the 'show' class of the element with the id 'dropdownContent'.
 */
function showMenu() {
  document.getElementById('dropdownContent').classList.toggle('show');
}

/**
 * Listens for a click event on the window and closes all dropdowns except the one with the 'useremblem' class.
 * @param {Event} event - The click event object
 */
window.onclick = function (event) {
  if (!event.target.matches('.useremblem')) {
    let dropdowns = document.getElementsByClassName('dropdownContent');
    let i;
    for (i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

function activatedMyProfile(){
  let userId = window.localStorage.getItem('userId');
  if(userId == '1'){
   let myProfil_a= document.getElementById('myProfil_a');
   myProfil_a.classList.add('d-none');
  };
}

function saveLastPage() {
    sessionStorage.setItem("lastPage", window.location.href);
}

