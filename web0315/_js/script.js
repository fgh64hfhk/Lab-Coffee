let navbar = document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick = () => {
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');

    let isOn = navbar.classList[1] === 'active';
    if (isOn) {
        navbar.classList.remove('active');
    } else {
        navbar.classList.toggle('active');
    }

}
let cartItem = document.querySelector('.cart-items-container');
document.querySelector('#cart-btn').onclick = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');

    let isOn = cartItem.classList[1] === 'active';
    if (isOn) {
        cartItem.classList.remove('active');
    } else {
        cartItem.classList.toggle('active');
    }
}
let searchForm = document.querySelector('.search-form');
document.querySelector('#search-btn').onclick = () => {
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    
    let isOn = searchForm.classList[1] === 'active';
    if (isOn) {
        searchForm.classList.remove('active');
    } else {
        searchForm.classList.toggle('active');
    }
}
window.onscroll = () => {
    navbar.classList.remove('active');
    cartItem.classList.remove('active');
    searchForm.classList.remove('active');
}