const upperCaseLetters = /[A-Z]/g;
const lowerCaseLetters = /[a-z]/g;
const numbers = /[0-9]/g;
const minLength = 8;

interface User {
  username: string;
  password: string;
}

function isValidUser(user: User): boolean {
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
    console.log(`Password should contain at least ${minLength} characters.`);
    return false;
  }

  if (user.username === "user" && user.password === "pass") {
    console.log("User authenticated successfully.");
    return true;
  } else {
    console.log("Invalid username or password. Please try again.");
    return false;
  }
}
const form = document.getElementById("login-form") as HTMLFormElement;
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user: User = {
    username: (document.getElementById("username") as HTMLInputElement).value,
    password: (document.getElementById("password") as HTMLInputElement).value,
  };
  isValidUser(user);
});