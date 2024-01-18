var upperCaseLetters = /[A-Z]/g;
var lowerCaseLetters = /[a-z]/g;
var numbers = /[0-9]/g;
var minLength = 8;
function isValidUser(user) {
    if (!user.username || !user.password) {
        console.log("Username and Password can't be empty.");
        return false;
    }
    if (!user.password.match(upperCaseLetters)) {
        console.log("Password should contain at least one uppercase letter.");
        return false;
    }
    if (!user.password.match(lowerCaseLetters)) {
        console.log("Password should contain at least one lowercase letter.");
        return false;
    }
    if (!user.password.match(numbers)) {
        console.log("Password should contain at least one number.");
        return false;
    }
    if (user.password.length < minLength) {
        console.log("Password should contain at least ".concat(minLength, " characters."));
        return false;
    }
    if (user.username === "user" && user.password === "pass") {
        console.log("User authenticated successfully.");
        return true;
    }
    else {
        console.log("Invalid username or password. Please try again.");
        return false;
    }
}
var form = document.getElementById("login-form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
    };
    isValidUser(user);
});
