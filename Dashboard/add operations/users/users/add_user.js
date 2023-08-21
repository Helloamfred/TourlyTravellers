const container = document.querySelector(".container");
const full_nameinput = document.querySelector(".full_name");
const emailinput = document.querySelector(".email");
const passwordinput = document.querySelector(".password");

const submit = document.getElementById("myform");
const button = document.querySelector(".btn");

let full_name;
let email;
let password;
console.log(full_name);
console.log(email);
console.log(password);

// -------------messages on login
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// --------- database link
const baseUrl = "http://localhost:3000/api";

// ----------------input listerners and preventing on reload
full_nameinput.addEventListener("input", (e) => {
  full_name = e.target.value;
  console.log(full_name);
});
emailinput.addEventListener("input", (e) => {
  email = e.target.value;
  console.log(email);
});
passwordinput.addEventListener("input", (e) => {
  password = e.target.value;
  console.log(password);
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  adduser();
});

function myFunction() {
  window.location.href = "/Dashboard/users/users.html";
}
// --------------------- Add user--------------------------//

function adduser() {
  if (full_name && email && password) {
    fetch(`${baseUrl}/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: full_name,
        email: email,
        password: password,
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        if (response.status === 201) {
          create_success.textContent = data.message;

          setTimeout(() => {
            create_success.textContent = "";
            myFunction();
          }, 5000);
        } else {
          if (response.status === 500) {
            create_error.textContent = data.message;

            setTimeout(() => {
              create_error.textContent = "";
            }, 5000);
          }
        }
      })
      .catch((error) => {
        console.error(`Error: ${error.message}`);
        create_error.textContent = error.message;

        setTimeout(() => {
          create_error.textContent = "";
        }, 5000);
      });
  }
  // prevents displaying the values on reload
  full_nameinput.value = "";
  emailinput.value = "";
  passwordinput.value = "";
}
//---------------Adduser Button Syntax
// const button = document.querySelector("btn");
