let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close');
let body = document.querySelector('body');

let listProductHTML = document.querySelector('.listProduct');

let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProducts = [];

let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

// add data to HTML
const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProducts.length > 0) {
        // console.log("listProducts.length > 0");
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            // console.log("newProduct.dataset:", newProduct.dataset);
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = 
            `<img src="${product.image}" alt="${product.image}">
            <h2>${product.name}</h2>
            <p class="price">$${product.price}</p>
            <button class="addCart">Add to Cart</button>`;
            listProductHTML.appendChild(newProduct);
        })
    };
};

// click add to Cart button on HTML event
listProductHTML.addEventListener('click', (event) => {
    // console.log("event:", event);
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let product_id =positionClick.parentElement.dataset.id;
        // alert('classList contains addCart:' + product_id);
        addToCart(product_id);
    }
})

// add prodcut to shopping cart
const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);

    if (carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity += 1; 
    }
    // console.log(carts);
    addCartToHTML();
}
// add new Cart to HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    // 24:15
    if (carts.length > 0) {
        console.log("carts.length > 0");
        carts.forEach(item => {
            let newItem = document.createElement('div');
            newItem.classList.add('item');

            let positionProduct = listProducts.findIndex((value) => value.id == item.product_id);
            let info = listProducts[positionProduct];

            newItem.innerHTML = `
            <div class="image">
                <img src="${info.image}" alt="">
            </div>
            <div class="name">${info.name}</div>
            <div class="totalPrice">$${info.price * item.quantity}</div>
            <div class="quantity">
                <span class="minus"><</span>
                <span>${item.quantity}</span>
                <span class="plus">></span>
            </div>
            `;
        listCartHTML.appendChild(newItem);
        })
    }
}
// initialize JSON products data
const initApp = () => {
    // get data from JSON
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        // console.log(listProducts);
        addDataToHTML();
    });
};
initApp();