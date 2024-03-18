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
        let product_id = positionClick.parentElement.dataset.id;
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
    // add to Cart in-Memory
    addCartToMemory();
}
const addCartToMemory = () => {
    var local_storage = JSON.stringify(carts);
    // console.log(local_storage);
    localStorage.setItem('cart', JSON.stringify(carts));
}
// add new Cart to HTML
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    // add totalQuantity func display on cart and show total price
    let totalQuantity = 0;
    if (carts.length > 0) {
        // console.log("carts.length > 0");
        carts.forEach(item => {
            totalQuantity += item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');

            // set item id to newItem data
            newItem.dataset.id = item.product_id;

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
            <div class="cancel">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                    </svg>
                </span>
            </div>
            `;
            listCartHTML.appendChild(newItem);
        })
    }
    iconCartSpan.innerHTML = totalQuantity;
}
// add minus and plus btn function
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    // console.log("positionClick:", positionClick);
    let type = positionClick.classList;
    // console.log(type);
    if (type.value === "minus" || type.value === 'plus') {
        // console.log("click:", positionClick);
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        // console.log(product_id);
        changeQuantity(product_id, type.value);
    }
    if (type.value === "bi bi-x-circle") {
        // console.log("value:", type.value);
        let product_id = positionClick.parentElement.parentElement.parentElement.dataset.id;
        // console.log(product_id);
        deleteCartItem(product_id, type.value);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) {
        // console.log(typeof(type));
        let valueChange;
        switch (type) {
            case "plus":
                // console.log("plus");
                // console.log(positionItemInCart);
                valueChange = carts[positionItemInCart].quantity + 1;
                carts[positionItemInCart].quantity = valueChange;
                // console.log(carts);
                break;
            default:
                valueChange = carts[positionItemInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionItemInCart].quantity = valueChange;
                } else {
                    carts.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
const deleteCartItem = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id);
    // console.log("position:", positionItemInCart);
    if (positionItemInCart >= 0) {
        switch (type) {
            case 'bi bi-x-circle':
                carts.splice(positionItemInCart, 1);
                break;

            default:
                console.log("not correct type.");
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
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

            // get cart from memory
            if (localStorage.getItem('cart')) {
                var local_storage_init = localStorage.getItem('cart');
                carts = JSON.parse(local_storage_init);
                // console.log(carts);
                addCartToHTML();
            }
        })
}
initApp();