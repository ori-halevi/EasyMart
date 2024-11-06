// getAllUsers() returns a list of users objects.
function getAllUsers() {
  return fetch("http://localhost:3000/users")
  .then((res) => {
    res.json()}); // Fix typo here
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


// addUserToDB() adds a user to the database.
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

















// getAllProducts() returns a list of products objects in the store.
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
    for (let i = 0; i < allProducts.length; i++) {
      if (allProducts[i].id === id) {
        return allProducts[i];
      }
    }
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
  }
}























// getAllCarts() returns a list of all carts objects.
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


// getCartProductsByUserId() returns a list of products in the cart of a user.
async function getCartProductsByUserId(userId) {
  try {
      // Get all carts using the existing function
      const carts = await getAllCarts();

      // Find the user's cart by userId
      const cart = carts.find(cart => cart.userId == userId);

      if (!cart) {
          throw new Error(`No cart found for user with ID ${userId}`);
      }

      // Return the list of products in the cart
      return cart.products;
  } catch (error) {
      console.error('Error fetching cart products:', error);
      throw error;
  }
}


// updateUserCartInDB() updates a user's cart in the database.
async function updateUserCartInDB(userId, updatedProducts) {
  try {
      // First, find the appropriate cart by userId
      const cartsResponse = await fetch("http://localhost:3000/carts");
      const carts = await cartsResponse.json();
      const userCart = carts.find(cart => cart.userId == userId);

      if (!userCart) {
          throw new Error(`No cart found for user with ID ${userId}`);
      }

      // Update the cart by cart ID
      const cartId = userCart.id;
      const response = await fetch(`http://localhost:3000/carts/${cartId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ products: updatedProducts })
      });

      if (!response.ok) {
          throw new Error(`Failed to update cart for user with ID ${userId}`);
      }

      console.log("Cart updated successfully");
  } catch (error) {
      console.error("Error updating cart:", error);
  }
}


// createCartForUser() creates a new cart for a user.
async function createCartForUser(userId) {
  // Check if there is already a cart for the user
  const response = await fetch(`http://localhost:3000/carts?userId=${userId}`);
  const existingCarts = await response.json();

  // If there is no cart, create a new one
  const newCart = {
      userId: userId,
      products: [] // A new cart starts with empty products
  };

  const createResponse = await fetch('http://localhost:3000/carts', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCart)
  });

  const createdCart = await createResponse.json();
  return createdCart;
}


// deleteCartForUser() deletes a cart for a user.
async function deleteCartForUser(userId) {
  // Get the user's cart
  const response = await fetch(`http://localhost:3000/carts?userId=${userId}`);
  const carts = await response.json();

  // If the cart exists, delete it
  if (carts.length > 0) {
      const cartId = carts[0].id; // Get the ID of the first cart
      const deleteResponse = await fetch(`http://localhost:3000/carts/${cartId}`, {
          method: 'DELETE'
      });

      if (deleteResponse.ok) {
          console.log(`Cart with ID ${cartId} deleted successfully.`);
      } else {
          console.log('Error deleting the cart:', deleteResponse.statusText);
      }
  } else {
      console.log(`No cart found for user with ID ${userId}.`);
  }
}



// userHasCart() checks if a user has a cart.
async function userHasCart(userId) {
  // Send a request to check if a cart exists for the user
  const response = await fetch(`http://localhost:3000/carts?userId=${userId}`);
  const carts = await response.json();
  
  // Return true if there is a cart, otherwise return false
  return carts.length > 0;
}
