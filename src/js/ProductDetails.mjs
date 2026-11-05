/*Model similar to ProductData.mjs by placing public methods in class
Recommended Methods
    constructor()
    init()
    addProductToCart() (from product.js)
    renderProductDetails()*/

import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    //constructor recommended for classes
    //product keeps track of important information about itself
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    //class initializer method to fetch product details using provided data source & render details
    //Handles user clicking "Add to Cart" button
    async init() {
        //use dataSource to get details for current product
        //findProductById will return promise! use await or then() to process
        this.product = await this.dataSource.findProductById(this.productId);
        //product details needed before HTML renders
        this.renderProductDetails();
        // after HTML renders, add listner to Add to Cart button
        //.bind(this) essential for callback to work
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }
    //from product.js
    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        if (Array.isArray(cartItems)) {
            cartItems.push(this.product);
        } else {
            const newCart = [this.product];
            localStorage.setItem("so-cart", JSON.stringify(newCart));
            return;
        }
        setLocalStorage("so-cart", cartItems);

    }
    //method to generate or populate HTML to display product details
    //use HTML in /product_pages/index.html as guide to HTML
    renderProductDetails() {
        productDetailsTemplate(this.product)
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.Name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;

    const productImage = document.getElementById("productImage");
    productImage.src = product.Image;
    productImage.alt = product.NameWithoutBrand;

    document.getElementById("productPrice").textContent = product.FinalPrice;
    document.getElementById("productColor").textContent = product.Colors[0].ColorName;
    document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;

    document.getElementById("addToCart").dataset.id = product.Id;
}

