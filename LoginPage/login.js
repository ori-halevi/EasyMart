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
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // דוגמת אימייל בסיסית
  const isValid = emailPattern.test(email);
  if (!isValid) {
    console.error("Error: Invalid email format.");
  }
  return isValid; // מחזירה אמת אם האימייל תקין, אחרת שקר
}

// פונקציה לבדוק אם הסיסמה תקינה
function passwordValidation(password) {
  // בדיקת אורך מינימלי
  if (typeof password !== "string" || password.length < 8) {
    console.error("Error: Password must be at least 8 characters long.");
    return false;
  }
  // ניתן להוסיף בדיקות נוספות (אות גדולה, תו מיוחד וכו')
  return true; // הסיסמה תקינה
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

function addUserInDB(firstName, lastName, email, password) {
  const newUser = {
    firstName,
    lastName,
    email,
    address: "",
    password,
  };

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("User added successfully:", data);
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}
