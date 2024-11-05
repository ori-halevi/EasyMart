const blackDiv = document.getElementById("blackDiv");



function openCart() {
    if (!isCurrentUserExistInLS()) return;
    toggleDisplayCart(true);
    loadUserCart();
    

}

function toggleDisplayCart(bool) {
    if (bool) {
        blackDiv.style.display = "block";
    } else {
        blackDiv.style.display = "none";
    }
}
async function loadUserCart() {
    // const currentUserId = localStorage.getItem("userId");
    const currentUserId = 0;
    const products = await getCartProductsByUserId(currentUserId);
    const cartBodyDiv = document.getElementById("cartBodyDiv");
    cartBodyDiv.innerHTML = "";
    
    products.forEach(async p => {
        const product = await getProductById(p.productId);
        const productAmount = p.amount;

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

        // הוספת רכיב שמציג את הכמות של המוצר
        const productAmountP = document.createElement("p");
        productAmountP.classList.add("productAmount");
        productAmountP.textContent = `Quantity: ${productAmount}`;

        // כפתור להסרת מוצר מהעגלה
        const removeFromCartBtn = document.createElement("div");
        removeFromCartBtn.classList.add("removeFromCartBtn");
        removeFromCartBtn.textContent = "Remove from cart";
        removeFromCartBtn.addEventListener("click", async () => {
            await updateCartProduct(currentUserId, product.id, 0); // קריאה לפונקציה שמסירה את המוצר
            loadUserCart(); // ריענון של עגלת הקניות
        });

        // הוספת כל הרכיבים למבנה ה-DOM
        productInfoDiv.appendChild(productImg);
        productInfoDiv.appendChild(productNameH3);
        productInfoDiv.appendChild(productWeightP);
        productInfoDiv.appendChild(productPriceP);
        productInfoDiv.appendChild(productAmountP); // הוספת הכמות למבנה
        productDiv.appendChild(productInfoDiv);
        productDiv.appendChild(removeFromCartBtn); // הוספת כפתור ההסרה

        cartBodyDiv.appendChild(productDiv);
    });
}