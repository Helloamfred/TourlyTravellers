const container = document.querySelector(".container");
const full_nameinput = document.querySelector(".full_name");
const emailInput = document.querySelector(".email");
const passwordInput = document.querySelector(".password");
const submit = document.getElementById("myform");
const button = document.querySelector(".btn");
let full_name;
let email;
let password;

// passing in the data from the server
let userData = JSON.parse(localStorage.getItem("userToEdit"));

// displaying data in the edit form
let details = JSON.parse(localStorage.getItem("userToEdit"));
document.getElementById("full_name").value = details.full_name;
document.getElementById("password").value = details.password;
document.getElementById("email").value = details.email;

// --------- database link
const baseUrl = "http://localhost:3000/api";
// -------------messages on login
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// ----------------input listerners and preventing on reload
full_nameinput.addEventListener("input", (e) => {
  full_name = e.target.value;
  userData.full_name = full_name;
});

emailInput.addEventListener("input", (e) => {
  email = e.target.value;
  userData.email = email;
});

passwordInput.addEventListener("input", (e) => {
  password = e.target.value;
  userData.password = password;
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();

  edituser();
});

function myFunction() {
  window.location.href = "/Dashboard/users/users.html";
}

// --------------Update User-------
function edituser() {
  console.log(userData);
  if (full_name && email && password) {
    fetch(`${baseUrl}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(async (response) => {
        let data = await response.json();
        if (response.status === 200) {
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
  emailInput.value = "";
  passwordInput.value = "";
}
