import products from "./products.js";
import cart from "./cart.js";

let app = document.getElementById('app');
let temporaryContent = document.getElementById('temporaryContent');

// load layout file
const loadTemplate = () => {
    fetch('./template.html')
        .then(response => response.text())
        .then(html => {
            // console.log("html:", html);

            app.innerHTML = html;
            // console.log("app:", app.innerHTML);

            let contentTab = document.getElementById('contentTab');
            // console.log("contentTab:", contentTab);

            if (temporaryContent) {
                contentTab.innerHTML = temporaryContent.innerHTML;
                temporaryContent.innerHTML = ''; // Clear temporary content
            } else {
                console.error("temporaryContent 元素不存在！");
            }

            cart();
            initApp();
        })
        .catch(error => {
            console.error('Error fetching template:', error);
        });
}
loadTemplate();

// initialized application
const initApp = () => {
    // load list product
    let listProductHTML = document.querySelector('.listProduct');
    listProductHTML.innerHTML = ''; // Clear list before populating
    // forEach products json
    products.forEach(product => {
        let newProduct = document.createElement('div');
        newProduct.classList.add('item');
        newProduct.innerHTML = `
            <a href="./detail.html?id=${product.id}">
                <img src="${product.image}">
            </a>
            <h2>${product.name}</h2>
            <div class="price">$${product.price}</div>
            <span>-10%</span>
            <button class="addCart" data-id='${product.id}'>
                Add To Cart
            </button>
        `;
        listProductHTML.appendChild(newProduct);
    });
}