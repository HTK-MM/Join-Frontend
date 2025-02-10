async function initProfile() {
  await includeHTML();
  showProfile();
}


async function showProfile() {
  let userId = window.localStorage.getItem('userId');
  let currentuser;
  await usersArray();
  for (let user of users) {
    if (user.user.id == userId) {
      currentuser = user;
      break;
    };
  }
  let dialog = document.getElementById('dialogProfil');
  if (dialog) {
    dialog.innerHTML = "";
    dialog.classList.remove('d-none');
    dialog.innerHTML = renderProfile(currentuser);
  }
}

function closeProfileDialog() {
  let lastPage = sessionStorage.getItem('lastPage');
  let dialog = document.getElementById('dialogProfil');
  if (dialog) {
    dialog.classList.add('d-none');
  }
  if (lastPage) {
    setTimeout(() => {
      window.location.href = lastPage;
    }, 100);
  } else {
    window.location.href = "index.html";
  }
}


function EditProfile() {
  let btnEdit = document.getElementById('btnProfileEdit');
  let btnSave = document.getElementById('btnProfileSave');
  let PWInputs = document.getElementById('groupInputs');
  btnEdit.classList.add('d-none');
  btnSave.classList.remove('d-none');
  document.getElementById('name').disabled = false;
  document.getElementById('email').disabled = false;
  PWInputs.innerHTML += renderInputsPassword();
}

async function SaveEditProfile(event) {
  event.preventDefault();
  let userId = window.localStorage.getItem('userId');
  let name = document.getElementById('name').value;
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;
  let confirmpassword = document.getElementById('passwordConfirm').value;
  if (password != confirmpassword) {
    showPasswordError();
    return false;
  }
  let profileEdit = await JSONProfile(name, email, password);
  await patchData('auth/profile/' + userId + '/', profileEdit);
  closeProfileDialog();
}


async function JSONProfile(name, email, password) {
  return {
    username: name.replace(' ', ''),
    first_name: await getFirstNameUser(name),
    last_name: await getLastNameUser(name),
    email: email,
    password: password,
    repeated_password: password,
    emblem: getEmblemUser(name)
  }
}

function renderProfile(user) {
  return /*html*/ `
   <div class="dialog-profile">     
    <div class="my-profile">
      <div class="emblem-profile" style="background-color:${user.color}">${user.emblem}</div>
      <div class="headline-profile">
        <h1 class="title-profile underline-profile">My Profile</h1>       
      </div>
    </div>    
    <form class="form-profile" id="formProfile" onsubmit= "SaveEditProfile(event)" >
      <div class="headline-profile">       
        <button class="btn-profile-close" type="button" onclick="closeProfileDialog()"><img class="btn-profile-images"
          src="../assets/icons/cancel.svg"></button>
      </div>
      <div class="groupProfile-input" id="groupInputs">
        <input class="inputs-profile style_InputTypography1" type="text" id="name"
          style="background-image: url(../assets/icons/personInput_icon.svg)" placeholder="Name"
          value="${user.user.first_name} ${user.user.last_name}" required disabled>
        <input class="inputs-profile style_InputTypography1" type="email" id="email"
          style="background-image: url(../assets/icons/mail_icon.svg)" placeholder="Email" value="${user.user.email}"
          required disabled>
      
      </div>
      <div class="divBtn-profile">
        <button class="btn-close-profile style_BtnTypography1" type="button" onclick="closeProfileDialog()">Close</button>
        <button class="btn-save-profile style_BtnTypography1" type="button" id="btnProfileEdit" onclick="EditProfile()">Edit</button>
        <button class="btn-save-profile style_BtnTypography1 d-none" type="submit" id="btnProfileSave" >Save</button>
      </div>
    </form>

  </div>`;
}



function renderInputsPassword() {
  return /*html*/`
   <input class="inputs-profile style_InputTypography1" id="password"
          style="background-image: url(../assets/icons/lock_icon.svg)" placeholder="Password" onclick="showPassword()"
          onkeyup="resetError()" required>
        <input class="inputs-profile style_InputTypography1" name="confirmPass"
          style="background-image: url(../assets/icons/lock_icon.svg)" id="passwordConfirm" placeholder="Confirm Password"
          onkeyup="resetError()" onclick="showPasswordConf()" required>
        <div class="error-profile">
          <span id="pwErrorCheck" class="pw-profile-error-check"></span>
        </div>`
}

