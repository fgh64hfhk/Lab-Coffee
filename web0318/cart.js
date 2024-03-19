import products from "./products.js";
const cart = () => {

    // open and close cart tab
    let bodyHTML = document.querySelector('body');
    let iconCart = document.querySelector('.icon-cart');
    let closeBtn = document.querySelector('.close');
    iconCart.addEventListener('click', () => {
        bodyHTML.classList.toggle('activeTabCart');
    });
    closeBtn.addEventListener('click', () => {
        bodyHTML.classList.toggle('activeTabCart');
    });

    // set click event configuration

    document.addEventListener('click', (event) => {

        let event_target = event.target;

        let body_status = bodyHTML.classList.value;

        let product_id = event_target.dataset.id;

        let product_index = cart.findIndex((value) => {
            value.product_id == product_id;
        });

        let quantity = null;

        switch (true) {
            case (event_target.classList.contains('addCart')):
                quantity = (product_index < 0) ? 1 : cart[product_index].quantity + 1;
                addProductsToCart(product_id, quantity);
                break;
            case (event_target.classList.contains('minus')):
                quantity = cart[product_index].quantity - 1;
                addProductsToCart(product_id, quantity);
                break;
            case (event_target.classList.contains('plus')):
                quantity = cart[product_index].quantity + 1;
                addProductsToCart(product_id, quantity);
                break;
            case (event_target.id == 'app'):
                if (body_status === 'activeTabCart') {
                    bodyHTML.classList.toggle('activeTabCart');
                }
                break;
            default:
                break;
        }
        console.log("cart:", cart);
        // addCartToHTML();
    })

    // add products to cart func
    let cart = [];
    const addProductsToCart = (product_id, qty) => {
        let product_index = cart.findIndex((value) => {
            value.product_id == product_id;
        });
        if (qty <= 0) {
            cart.splice(product_index, 1);
        } else if (product_index < 0) {
            // not yet in cart
            cart.push({
                id: product_id,
                quantity: 1
            });
        } else {
            cart[product_index].quantity = qty;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log("Local Storage:", localStorage.getItem('cart'));
    }
    // add cart in memory to HTML
    const addCartToHTML = () => {
        let iconCartSpan = iconCart.querySelector('span');
        // console.log("span:", iconCartSpan);
        let listCartHTML = document.querySelector('.listCart');
        // console.log("list cart HTML:", listCartHTML);
        listCartHTML.innerHTML = '';
        let totalQuantity = 0;
        if (cart.length > 0) {
            cart.forEach(item => {
                totalQuantity += item.quantity;
                let newItem = document.createElement('div');
                newItem.classList.add('item');
                newItem.dataset.id = item.product_id;

                let product_index = products.findIndex((value) => value.id == item.product_id);

                let item_info = products[product_index];

                listCartHTML.appendChild(newItem);
                newItem.innerHTML = `
                <div class="image">
                    <img src="${item_info.image}" alt="${item_info.name}">
                </div>
                <div class="name">${item_info.name}</div>
                <div class="totalPrice">${item_info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus" data-id="${item_info.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            class="bi bi-dash-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                        </svg>
                    </span>
                    <span class="qty">${item.quantity}</span>
                    <span class="plus" data-id="${item_info.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                            class="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                        </svg>
                    </span>
                </div>
                <div class="cancel">
                    <span>
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
}
export default cart;