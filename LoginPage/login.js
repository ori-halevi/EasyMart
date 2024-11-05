function getAllUsers() {
  return fetch("http://localhost:3000/users").then((res) => res.json()); // Fix typo here
}

function getInputUser(id) {
  const input = document.getElementById(id).value;
  return input;
}

function getDetails(Emailaddress, passwordFromuser) {
  const emailaddress = getInputUser(Emailaddress);
  const password = getInputUser(passwordFromuser);
  return { emailaddress, password }; // מחזיר כאובייקט
}

function callToIsUserExistInDB() {
  const { Emailaddress, password } = getDetails(); // שימוש נכון ב-destructuring
  if (checkValidation()) {
    isUserExistInDB(Emailaddress, password);
  } else {
    console.error("Error: Name or password is empty");
    return;
  }
}

function isUserExistInDB(emailAddress, password) {
  return getAllUsers().then((users) => {
    const user = users.find(
      (u) => u.email == emailAddress && u.password == password
    );
    console.log(user);

    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error("User not found or incorrect password"));
    }
  });
}

// function insertElementError(areaClass, element) {
//   if (typeof areaClass !== "string" || areaClass.trim() === "") {
//     console.error("Error: areaClass must be a non-empty string");
//     return;
//   }

//   if (!(element instanceof HTMLElement)) {
//     console.error("Error: element must be a valid HTML element");
//     return;
//   }

//   element.innerText = "Name or password is empty";
//   const targetArea = document.querySelector(areaClass);
//   if (targetArea) {
//     targetArea.appendChild(element);
//   } else {
//     console.error("Error: Target area not found for class:", areaClass);
//   }
// }

function checkValidation() {
  const Emailaddress = getInputUser("loginUserName");
  const password = getInputUser("loginPassword");
  if (emailValidation(Emailaddress) && passwordValidation(password)) {
    return true;
  }
  if (!emailValidation(Emailaddress) || !passwordValidation(password)) {
    return false;
  }
}
// בדיקת אם הקלטים הם מחרוזות
// פונקציה לבדוק אם השם תקין
function usernameValidation(username) {
  // בדיקת תקינות השם - לפחות תו אחד
  if (
    typeof username !== "string" ||
    username.trim() === "" ||
    username.length < 2
  ) {
    console.error(
      "Error: Username must be a non-empty string or at least 2 characters."
    );
    return false;
  }
  // ניתן להוסיף בדיקות נוספות (אורך מינימלי, תווים מותרים וכו')
  return true; // השם תקין
}

// פונקציה לבדוק אם האימייל תקין
function emailValidation(email) {
  const trimmedEmail = email.trim(); // מסיר רווחים בתחילת ובסוף המחרוזת
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // דפוס אימייל בסיסי

  if (!emailPattern.test(trimmedEmail)) {
    return { isValid: false, error: "Invalid email format." }; // החזרת הודעת שגיאה
  }

  return { isValid: true }; // אימייל תקין
}

// פונקציה לבדוק אם הסיסמה תקינה
function passwordValidation(password) {
  // בדיקה האם המחרוזת מורכבת רק מספרים
  if (!/^\d+$/.test(password)) {
    if (!password.length == 8) {
      alert("Error: Password must be 8 characters long.");
      return false;
    }
    return true; // הסיסמה תקינה
  }
  alert("Error: Password must contain only numbers.");
}

//לבנות פונקציה שמקבלת את הנתונים ומכניסה לדאטה בייס ומכניסה ללוקל ומרעננת דף
function insertUserToLS(user) {
  try {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } catch (error) {
    console.error("Error inserting user:", error);
  }
}
// Execute the check function

async function CreateUserAndAddToDB(firstName, lastName, email, address, password) {
  const allUsers = await getAllUsers();

  const newId = String(Number(allUsers[allUsers.length - 1].id) + 1);

  const newUser = {
    id: newId,
    firstName,
    lastName,
    email,
    address,
    password,
  };
  return await addUserToDB(newUser);
  

}

