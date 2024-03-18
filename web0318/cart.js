
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
document.addEventListener('click', (event) => {
    console.log("event:", event);
    let event_target = event.target;
    console.log("event_target:", event_target);
    let target_value = event_target.classList.value;
    console.log("target_value:", target_value);

    let body_status = bodyHTML.classList.value;
    console.log("body_status:", body_status);

    if (body_status === 'activeTabCart') {
        if (target_value !== 'bi bi-cart4') {
            // console.log("success");
            if (target_value !== 'listCart') {
                bodyHTML.classList.toggle('activeTabCart');
            }
        }
    }
})