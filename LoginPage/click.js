// isCurrentUserExistInLS()

const loginDiv = document.querySelector(".login");
const signUPDiv = document.querySelector(".signUP");

const createAccountBtn = document.querySelector("#createAccountBtn");
const backToLoginBtn = document.querySelector("#backToLoginBtn");

const signUpSubmit = document.querySelector("#signUpSubmit");
const loginBtn = document.querySelector("#loginBtn");

function displayLogin() {
  loginDiv.style.display = "none";
  signUPDiv.style.display = "block";
}

function displaySignUp() {
  signUPDiv.style.display = "none";
  loginDiv.style.display = "block";
}
loginBtn.addEventListener("click", async () => {
  const email = getInputUser("loginEmail");
  const password = getInputUser("loginPassword");

  if (!emailValidation(email)) return;
  if (!passwordValidation(password)) return;

  const userReturn = await isUserExistInDB(email, password);
  if (userReturn) {
    insertUserToLS(userReturn);
    window.location.href = "../StoreHomePage/StoreHomePage.html";

  }
});
// createAccountBtn.onclick = displayLogin;
// loginFromSignUp.onclick = displaySignUp;
// submitLogin.onclick = callToIsUserExistInDB;
// signUpSubmit.onclick = (event) => {
//   event.preventDefault();
//   const f = getInputUser("inputSignUpFirstName");
//   const l = getInputUser("inputsignUpLastName");
//   const e = getInputUser("inputsignUpemail");
//   const p = getInputUser("inputsignUppassword");
//   addUserInDB(f, l, e, p);
// };
