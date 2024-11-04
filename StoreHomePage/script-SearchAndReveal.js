
const searchInput = document.getElementById("searchInput");
const searchResultDiv = document.getElementById("searchResultDiv");

window.onload = () => {
    revealProductsOnPage();
};






function revealProductsOnPage() { 
    const products = getAllProducts();
    products.then((products) => {
        products.forEach((product) => {
            createProductCard(product);
        });
    });
}










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
    // const productDescriptionP = document.createElement("p");
    // productDescriptionP.classList.add("productDescription");
    // productDescriptionP.textContent = product.description;
    const productWeightP = document.createElement("p");
    productWeightP.classList.add("productWeight");
    productWeightP.textContent = product.weight;
    const productPriceP = document.createElement("p");
    productPriceP.classList.add("productPrice");
    productPriceP.textContent = product.price;
    const addToCartBtnDiv = document.createElement("div");
    addToCartBtnDiv.classList.add("addToCartBtnDiv");
    addToCartBtnDiv.textContent = "Add to cart";
    addToCartBtnDiv.classList.add("addToCartBtn");
    addToCartBtnDiv.addEventListener("click", () => {
        addToCart(product);
    })
    productInfoDiv.appendChild(productImg);
    productInfoDiv.appendChild(productNameH3);
    productInfoDiv.appendChild(productWeightP);
    productInfoDiv.appendChild(productPriceP);
    productDiv.appendChild(productInfoDiv);
    productDiv.appendChild(addToCartBtnDiv);
    // productDiv.appendChild(productDescriptionP);
    searchResultDiv.appendChild(productDiv);

}