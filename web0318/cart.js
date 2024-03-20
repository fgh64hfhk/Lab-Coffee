import products from "./products.js";
const cart = () => {

    let listCartHTML = document.querySelector('.listCart');

    let iconCart = document.querySelector('.icon-cart');

    let iconCartSpan = iconCart.querySelector('span');

    let body = document.querySelector('body');

    let closeCart = document.querySelector('.close');

    let cart = [];

    // open and close tab
    iconCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })
    closeCart.addEventListener('click', () => {
        body.classList.toggle('activeTabCart');
    })

    const setProductInCart = (idProduct, value) => {
        let positionThisProductInCart = cart.findIndex((value) => value.product_id == idProduct);
        if (value <= 0) {
            cart.splice(positionThisProductInCart, 1);
        } else if (positionThisProductInCart < 0) {
            cart.push({
                product_id: idProduct,
                quantity: 1
            });
        } else {
            cart[positionThisProductInCart].quantity = value;
        }
        localStorage.setItem('cart_new', JSON.stringify(cart));
        addCartToHTML();
    }

    const addCartToHTML = () => {
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        if (cart.length > 0) {
            cart.forEach(item => {
                totalQuantity += item.quantity;
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                let positionProduct = products.findIndex((value) => value.id == item.product_id);

                let info = products[positionProduct];

                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="${info.name}">
                </div>
                <div class="name">${info.name}</div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus" data-id="${info.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            class="bi bi-dash-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                        </svg>
                    </span>
                    <span class="qty">${item.quantity}</span>
                    <span class="plus" data-id="${info.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </span>
                    <span class="cancel" data-id="${info.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-x-circle"
                            viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path
                                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </span>
                </div>
                `;
            })
        }
        iconCartSpan.innerText = totalQuantity;
    }

    document.addEventListener('click', (event) => {
        let buttonClick = event.target;
        let idProduct = buttonClick.dataset.id;
        // console.log("idProduct:", idProduct);
        let quantity = null;
        let positionProductInCart = cart.findIndex((value) => value.product_id == idProduct);
        // console.log("posi:", positionProductInCart);

        switch (true) {
            case (buttonClick.classList.contains('addCart')):
                quantity = (positionProductInCart < 0) ? 1 : cart[positionProductInCart].quantity + 1;
                setProductInCart(idProduct, quantity);
                break;
            default:
                if (buttonClick.classList) {
                    let target = buttonClick; // 创建一个新的变量来保存目标元素
                    while (target && target !== null) {
                        console.log(target); //<!DOCTYPE html>
                        target = target.parentNode;
                        if (target.classList.contains('minus')) {
                            let product_id = target.dataset.id;
                            // console.log(product_id);
                            let product_index = cart.findIndex((value) => value.product_id == product_id);
                            // console.log(product_index);
                            if (product_index >= 0 && cart[product_index]) {
                                quantity = cart[product_index].quantity - 1;
                                setProductInCart(product_id, quantity);
                            } else {
                                console.error('Product not found in cart or cart is not properly initialized.');
                            }
                            break;
                        } else if (target.classList.contains('plus')) {
                            let product_id = target.dataset.id;
                            // console.log(product_id);
                            let product_index = cart.findIndex((value) => value.product_id == product_id);
                            // console.log(product_index);
                            if (product_index >= 0 && cart[product_index]) {
                                quantity = cart[product_index].quantity + 1;
                                setProductInCart(product_id, quantity);
                            } else {
                                console.error('Product not found in cart or cart is not properly initialized.');
                            }
                            break;
                        } else if (target.classList.contains('cancel')) {
                            alert('please make sure to delete item.');
                            let product_id = target.dataset.id;
                            // console.log(product_id);
                            let product_index = cart.findIndex((value) => value.product_id == product_id);
                            // console.log(product_index);
                            if (product_index >= 0 && cart[product_index]) {
                                quantity = 0;
                                setProductInCart(product_id, quantity);
                            } else {
                                console.error('Product not found in cart or cart is not properly initialized.');
                            }
                            break;

                        }
                    }
                }
                break;
        }
    })

    const initApp = () => {
        // localStorage.removeItem('cart_new');
        if (localStorage.getItem('cart_new')) {
            cart = JSON.parse(localStorage.getItem('cart_new'));
            addCartToHTML();
        }
    }
    initApp();
}
export default cart;