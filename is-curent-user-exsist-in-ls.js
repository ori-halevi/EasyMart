// פונקציה בשם isCurrentUserExistInLS שמחפשת אם קיים באחסון המקומי מפתח בשם יוזר שמכיל אובייקט, אם קיים אז היא לוקחת ממנו את האימייל וגם הסיסמא שלו, ומנסה למצוא התאמה בבסיס הנתונים על ידי שימוש בפונקציה שכבר קיימת, והיא מחזירה אמת, אך אם אין יוזר או שהיוזר אינו אמיתי כי הפונקציה הקיימת החזירה שקר או נול, אז הפונקציה הזאת מחזירה נול.

function isCurrentUserExistInLS() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (currentUser && currentUser.email && currentUser.password) {
    const userExists = isUserExistInDB(currentUser.email, currentUser.password);
    return userExists;
  }
}
