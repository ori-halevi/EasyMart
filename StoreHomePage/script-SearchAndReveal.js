
const searchInput = document.getElementById("searchbarInput");
const searchResultDiv = document.getElementById("searchResultDiv");
const loginDiv = document.getElementById("loginDiv");
const myCartDiv = document.getElementById("myCartDiv");

window.onload = async () => {
    toggleDisplayCart(false);
    await revealProductsOnPage();
    if (isCurrentUserExistInLS()) {
        loginDiv.style.display = "none";        
    } else {
        myCartDiv.style.display = "none";
    }
};



searchInput.addEventListener("input", async () => {
    console.log(searchInput.value);
    
    const AllProductsOnPage = document.querySelectorAll(".productDiv");
    console.log("Total products on page:", AllProductsOnPage.length);

    // Display all products before applying filter
    AllProductsOnPage.forEach(product => {
        product.style.display = "block";
    });

    for (let i = 0; i < AllProductsOnPage.length; i++) {
        const productName = AllProductsOnPage[i].querySelector(".productName").textContent;
        console.log("Checking product:", productName);

        if (!productName.toLowerCase().includes(searchInput.value.toLowerCase())) {
            AllProductsOnPage[i].style.display = "none";
            console.log("Hiding product:", productName);
        }
    }
});







async function revealProductsOnPage() {
    const products = await getAllProducts();
    products.forEach((product) => {
            createProductCard(product);
        });
    };


function addToCart(product, quantity) {
    if (isCurrentUserExistInLS()) {
        const currentUserId = JSON.parse(localStorage.getItem("currentUser")).id;
        updateCartProduct(currentUserId, product.id, quantity);
    } else {
        alert("Please login first");
    }
}












loginDiv.addEventListener("click", () => {
    window.location.href = "../LoginPage/login.html";
})



myCartDiv.addEventListener("click", () => {
    openCart();
})















function createProductCard(product) {
    
    const productDiv = document.createElement("div");
    productDiv.classList.add("productDiv");
    const productInfoDiv = document.createElement("div");
    productInfoDiv.classList.add("productInfoDiv");
    const productImg = document.createElement("img");
    productImg.classList.add("productImg");
    productImg.src = product.imgLink;
    productImg.alt = product.name;
    const productNameH3 = document.createElement("h3");
    productNameH3.classList.add("productName");
    productNameH3.textContent = product.name;
    const productWeightP = document.createElement("p");
    productWeightP.classList.add("productWeight");
    productWeightP.textContent = product.weight;
    const productPriceP = document.createElement("p");
    productPriceP.classList.add("productPrice");
    productPriceP.textContent = product.price;

    // יצירת רכיב לבחירת כמות
    const quantityInput = document.createElement("input");
    quantityInput.classList.add("quantityInput");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.value = "1"; // כמות ברירת מחדל

    // יצירת כפתור הוספה לסל
    const addToCartBtnDiv = document.createElement("div");
    addToCartBtnDiv.classList.add("addToCartBtnDiv");
    addToCartBtnDiv.textContent = "Add to cart";
    addToCartBtnDiv.addEventListener("click", () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            addToCart(product, quantity); // שולח גם את הכמות
        } else {
            alert("Please select a valid quantity.");
        }
    });

    // הוספת כל הרכיבים למבנה ה-DOM
    productInfoDiv.appendChild(productImg);
    productInfoDiv.appendChild(productNameH3);
    productInfoDiv.appendChild(productWeightP);
    productInfoDiv.appendChild(productPriceP);
    productDiv.appendChild(productInfoDiv);
    productDiv.appendChild(quantityInput); // מוסיף את שדה הכמות
    productDiv.appendChild(addToCartBtnDiv);

    searchResultDiv.appendChild(productDiv);
}
