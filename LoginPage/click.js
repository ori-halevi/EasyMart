// isCurrentUserExistInLS()

const loginDiv =  document.querySelector(".login");
const signUPDiv =  document.querySelector(".signUP");

const createAccountBtn = document.querySelector("#createAccountBtn");
const loginBtn = document.querySelector("#login");

const signUpSubmit = document.querySelector("#signUpSubmit");
const loginFromSignUp = document.querySelector("#loginFromSignUp");

const submitLogin = document.getElementById("login")



function displayLogin() {
  loginDiv.style.display = "none";
  signUPDiv.style.display = "block";
}

function displaySignUp() {
  signUPDiv.style.display = "none";
  loginDiv.style.display = "block";
}

createAccountBtn.onclick = displayLogin ; 
loginFromSignUp.onclick = displaySignUp;
submitLogin.onclick = callToIsUserExistInDB;
signUpSubmit.onclick = (event)=>{
  event.preventDefault();
  const f = getInputUser("inputSignUpFirstName")
  const l = getInputUser("inputsignUpLastName")
  const e = getInputUser("inputsignUpemail")
  const p = getInputUser("inputsignUppassword")
  addUserInDB(f,l,e,p)
};
