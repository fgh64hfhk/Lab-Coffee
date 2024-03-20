document.addEventListener('click', (event) => {
    // console.log("event:", event);
    while (event !== null) {
        console.log("event:", event);
        if (event == null) {
            break;
        }
        let event_target = event.target;
        console.log("event_target:", event_target);
        // if (event_target.id == "") {
        //     console.log("event_target.id == null:");
        //     break;
        // }
        let target_classList = event_target.classList;
        console.log("target_classList:", target_classList);
        // if (target_classList == "") {
        //     console.log("target_classList == null:");
        //     break;
        // }
        let classList_value = target_classList.value;
        console.log("classList_value:", classList_value);
        if (classList_value == "") {
            console.log("classList_value:", classList_value);
            break;
        }

        event = event.parentNode;
    }

    console.log("while loop ends.");
})