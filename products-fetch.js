// getAllProducts() returns a list of products objects.



// מחזירה את כל המוצרים
async function getAllProducts() {
    try {
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok) {
            throw new Error(`Error fetching all products: ${response.status}`);
        }
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Failed to fetch all products:', error);
    }
}




// getProductById() returns a product object.



// מחזירה מוצר לפי מזהה
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









// דןגמא לשימוש בפונקציה
async function check() {
    try {
        const carts = await getProductById(748596);
        console.log("Carts data:", carts);
    } catch (error) {
        console.error("Error fetching carts:", error);
    }
}

check()
