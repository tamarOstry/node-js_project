function login() {
    debugger
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    fetch('../user/' + email + "/" + password)
        .then(response => {
            if (response.ok && response.status == 200)
                return response.json();
        })
        .then(data => {
            if (data) {
                window.location.href = "../HTML/helloUser.html";
                sessionStorage.setItem('user', JSON.stringify(data));
            }
            else {
                alert("you need to application")
            }
        })
}

function newUser() {
    window.location.href = "newUser.html";
}

function create() {
    fetch('../user', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            firstName: document.getElementById("fn").value,
            lastName: document.getElementById("ln").value,
            email: document.getElementById("ma").value,
            password: document.getElementById("pw").value,
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data)
                window.location.href = "homepage.html";
        });
}

function name() {
    document.getElementById("hello").innerHTML = "welcome to: " + JSON.parse(sessionStorage.getItem('user')).firstName;
}

function update() {
    window.location.href = "updateDetails.html"

}

function onLoudeUpdateUser() {
    document.getElementById("fnu").value = JSON.parse(sessionStorage.getItem('user')).firstName;
    document.getElementById("lnu").value = JSON.parse(sessionStorage.getItem('user')).lastName;
    document.getElementById("mau").value = JSON.parse(sessionStorage.getItem('user')).email;
    document.getElementById("pwu").value = JSON.parse(sessionStorage.getItem('user')).password;
}

function saveChange() {
    let Userid = JSON.parse(sessionStorage.getItem('user')).id;
    fetch('../user/' + Userid, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            firstName: document.getElementById("fnu").value,
            lastName: document.getElementById("lnu").value,
            email: document.getElementById("mau").value,
            password: document.getElementById("pwu").value,
            address:{
                city:"GG",
                street:"LLL",
                bilding:5
            } 
        }),
    })
        .then(response => response.json())
        .then(data => {
            if (data)
                sessionStorage.setItem('user', JSON.stringify(data));
                window.location.href = "helloUser.html";
        });
}

