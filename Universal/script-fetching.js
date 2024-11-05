// getAllUsers() returns a list of users objects.
function getAllUsers() {
  return fetch("http://localhost:3000/users").then((res) => res.json()); // Fix typo here
}

// isUserExistInDB() checks if a user exists in the database.
function isUserExistInDB(emailAddress, password) {
  return getAllUsers()
    .then((users) => {
      try {
        const user = users.find(
          (element) =>
            element.email === emailAddress && element.password === password
        );

        if (user) {
          return Promise.resolve(user);
        } else {
          return Promise.resolve(null);
        }
      } catch (error) {
        console.error("Error processing users:", error);
        return Promise.reject(error);
      }
    })
    .catch((error) => {
      console.error("Error fetching users:", error);
      return Promise.reject(error);
    });
}


// getAllProducts() returns a list of products objects.
async function getAllProducts() {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error(`Error fetching all products: ${response.status}`);
    }
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Failed to fetch all products:", error);
  }
}

// getProductById() returns a product object.
async function getProductById(id) {
  try {
    const allProducts = await getAllProducts();
    console.log(allProducts.length);
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id === id) {
        return allProducts[i];
      }
    }
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
  }
}


// getAllCarts() returns a list of carts objects.
async function getAllCarts() {
    try {
        const response = await fetch('http://localhost:3000/carts');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch carts:", error);
        throw error;
    }
}


async function updateCartProduct(userId, productId, amount) {
    try {
        // קבלת כל ה-carts באמצעות הפונקציה הקיימת
        const carts = await getAllCarts();
        
        // איתור ה-cart של המשתמש לפי ה-userId
        const cart = carts.find(cart => cart.userId == userId);

        if (!cart) {
            throw new Error(`No cart found for user with ID ${userId}`);
        }

        // יצירת רשימת מוצרים מעודכנת
        const updatedProducts = [...cart.prodacts];
        const existingProductIndex = updatedProducts.findIndex(p => p.productId === productId);

        if (existingProductIndex !== -1) {
            if (amount === 0) {
                // אם הכמות היא 0, מוחקים את המוצר
                updatedProducts.splice(existingProductIndex, 1);
            } else {
                // אם המוצר כבר קיים, נעדכן את הכמות
                updatedProducts[existingProductIndex].amount = amount;
            }
        } else if (amount > 0) {
            // אם המוצר לא קיים והכמות גדולה מ-0, נוסיף אותו
            updatedProducts.push({ productId: productId, amount: amount });
        }

        // עדכון cart עם המוצרים המעודכנים
        const updatedCart = { ...cart, prodacts: updatedProducts };
        const putResponse = await fetch(`http://localhost:3000/carts/${cart.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCart)
        });

        if (!putResponse.ok) {
            throw new Error(`Failed to update cart: ${putResponse.statusText}`);
        }

        const result = await putResponse.json();
        console.log('Cart updated successfully:', result);
    } catch (error) {
        console.error('Error updating cart:', error);
    }
}

async function getCartProductsByUserId(userId) {
    try {
        // קבלת כל ה-carts באמצעות הפונקציה הקיימת
        const carts = await getAllCarts();

        // איתור ה-cart של המשתמש לפי ה-userId
        const cart = carts.find(cart => cart.userId === userId);

        if (!cart) {
            throw new Error(`No cart found for user with ID ${userId}`);
        }

        // החזרת רשימת המוצרים בעגלה
        return cart.prodacts;
    } catch (error) {
        console.error('Error fetching cart products:', error);
        throw error;
    }
}
  



async function addUserToDB(user) {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Failed to add user");
    }
  } catch (error) {
    console.error("Error adding user:", error);
  }
}










// דןגמא לשימוש בפונקציות

// const userId = 0;
// getCartProductsByUserId(userId)
//     .then(products => {
//         console.log('Products in cart:', products);
//     })
//     .catch(error => {
//         console.error('Failed to get cart products:', error);
//     });




// async function check() {
//   try {
//     const carts = await getProductById(748596);
//     console.log("Carts data:", carts);
//   } catch (error) {
//     console.error("Error fetching carts:", error);
//   }
// }

// check();
