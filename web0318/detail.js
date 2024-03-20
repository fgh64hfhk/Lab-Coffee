import products from "./products.js";
import cart from "./cart.js";

let listProduct = document.getElementsByClassName('listProduct');
// console.log(listProduct);
let app = document.getElementById('app');
// console.log(app);
let temporaryContent = document.getElementById('temporaryContent');
// console.log(temporaryContent);

const loadTemplate = () => {
    fetch('./template.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            let contentTab = document.getElementById('contentTab');
            contentTab.innerHTML = temporaryContent.innerHTML;
            temporaryContent.innerHTML = null;
            cart();
            initApp();
        })
}
loadTemplate();

const initApp = () => {
    let product_id = new URLSearchParams(window.location.search).get('id');
    // console.log(product_id);
    let thisProduct = products.filter(value => value.id == product_id)[0];
    // console.log(thisProduct);
    if (!thisProduct) {
        window.location.href = "./404.html";
    }

    let detail = document.querySelector('.detail');
    detail.querySelector('.image img').src = thisProduct.image;
    detail.querySelector('.image img').alt = thisProduct.id;
    detail.querySelector('.name').innerText = thisProduct.name;
    detail.querySelector('.price').innerText = '$' + thisProduct.price;
    detail.querySelector('.description').innerText = thisProduct.description;

    detail.querySelector('.addCart').dataset.id = thisProduct.id;

    let listProductHTML = document.querySelector('.listProduct');
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
                ADD TO CART
        </button>
        `;
        listProductHTML.appendChild(newProduct);
    });
}