let menu = document.getElementById('menu')

function closeMenu() {
    menu.classList.remove('menu_open');
    document.getElementById("overlay").style.display = "none";
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = '0px';
    document.documentElement.style.overflowY = 'unset';
}

function openMenu() {
    menu.classList.toggle('menu_open');
    document.getElementById("overlay").style.display = "block";
    document.body.style.overflowY = 'hidden';
    document.body.style.paddingRight = '10px';
    document.documentElement.style.overflowY = 'hidden';
}


// Open side menu
document.getElementById('burger').addEventListener('click', function () {
    openMenu();
})


// Close side menu
document.getElementById('close-menu').addEventListener('click', function () {
    closeMenu();
})



// Go to specific section
let arr = document.querySelectorAll('#promo-trigger, #benefits-trigger, #contacts-trigger');

arr.forEach((trigger) => {
    trigger.addEventListener('click', closeMenu)
})



// Send form

let form = document.getElementById("form");

let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");
let fields = form.querySelectorAll('.field');
let notification = document.getElementById('notification');

let contactsButton = document.querySelector('.button__contacts');

function cleanUp() {
    name.value = '';
    email.value = '';
    message.value = '';
    contactsButton.classList.remove('button_disabled');
}

function sendMessage(data) {
    fetch('https://jsonplaceholder.typicode.com/posts/', {
        method: 'POST',
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((json) => {
            successfulNotify(data)
        });
}



form.addEventListener("submit", onFormSubmit);

function validateFunc() {
    let errors = form.querySelectorAll('.error-message')

    for (let i = 0; i < errors.length; i++) {
        errors[i].remove();
        fields[i].classList.remove('input_error')
    }

    for (let i = 0; i < fields.length; i++) {
        if (!fields[i].value) {
            let error = document.createElement('span')
            error.classList.add('error-message')
            fields[i].classList.add('input_error')
            error.innerHTML = 'Заполните, пожалуйста, поле'
            form[i].parentElement.insertBefore(error, fields[i])
        }
    }
}

function successfulNotify(data) {
    let formArray = []
    for (let [key, value] of data.entries()) {
        value && formArray.push(value)
    }

    if (formArray.length === 3) {
        contactsButton.classList.add('button_disabled');
        document.getElementById("greeting").textContent = `Привет, ${data.get("name")}!`;
        notification.style.top = '0'

        setTimeout(() => {
            notification.style.top = '-50%'
            contactsButton.classList.remove('button_disabled');
            cleanUp();
        }, 3000)
    }
}


function onFormSubmit(event) {
    event.preventDefault();
    validateFunc();

    const data = new FormData(event.target);
    sendMessage(data);
}