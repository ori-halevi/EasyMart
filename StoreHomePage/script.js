// פונקציה בשם isCurrentUserExistInLS שמחפשת אם קיים באחסון המקומי מפתח בשם יוזר שמכיל אובייקט, אם קיים אז היא לוקחת ממנו את האימייל וגם הסיסמא שלו, ומנסה למצוא התאמה בבסיס הנתונים על ידי שימוש בפונקציה שכבר קיימת, והיא מחזירה אמת, אך אם אין יוזר או שהיוזר אינו אמיתי כי הפונקציה הקיימת החזירה שקר או נול, אז הפונקציה הזאת מחזירה נול.

function isCurrentUserExistInLS() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (currentUser && currentUser.email && currentUser.password) {
      const userExists = isUserExistInDB(currentUser.email, currentUser.password);
      return userExists;
    }
  }




// פונקציה שתעדכן את עגלת הקניות של המשתמש
async function updateCartProducts(userId, productId, amount) {
    await createCartForUser(userId);
    const allCartProducts = await getCartProductsByUserId(userId);

    if (!allCartProducts) {
        throw new Error(`No cart found for user with ID ${userId}`);
    }
    
    const existingProductIndex = allCartProducts.findIndex(p => p.productId === productId);

    // בדיקת מצב המוצר והעדכון בהתאם
    if (existingProductIndex !== -1) {
        if (amount === 0) {
            // אם הכמות היא 0, מוחקים את המוצר
            allCartProducts.splice(existingProductIndex, 1);
        } else {
            // אם המוצר כבר קיים, נעדכן את הכמות
            allCartProducts[existingProductIndex].amount = amount;
        }
    } else if (amount > 0) {
        // אם המוצר לא קיים והכמות גדולה מ-0, נוסיף אותו
        allCartProducts.push({ productId: productId, amount: amount });
    }

    // עדכון העגלה עם רשימת המוצרים המעודכנת
    await updateUserCartInDB(userId, allCartProducts);
}
