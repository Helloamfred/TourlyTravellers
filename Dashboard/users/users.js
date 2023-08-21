const Button = document.querySelector(".btn");
// add hovered class to selected list item

let list = document.querySelectorAll(".navigation li");
const baseUrl = "http://localhost:3000/api";
let users = [];
console.log(users);

//---------------Add Users Button Syntax

document.getElementById("btn").onclick = function () {
  myFunction();
};
function myFunction() {
  window.location.href = "/Dashboard/add operations/users/users/add_user.html";
}

function activeLink() {
  list.forEach((item) => {
    item.classList.remove("hovered");
  });
  this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// Menu Toggle
let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//-----------------------------------USERS DATA DISPLAY ON THE DASHBOARD

// --------GET/DISPLAY-------//
function getusers() {
  fetch(`${baseUrl}/users`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //------calling the data-----//
      buildtable(data);
      users = data;
    })
    .catch((error) => {
      console.log(error);
    });
}

getusers();

function buildtable(users) {
  var table = document.getElementById("users_table");
  for (const user of users) {
    var row = `<tr>
                  <td>${user.full_name}</td>
                  <td>${user.id}</td>
                  <td>${user.password}</td>
                  <td>${user.email}</td>

              
                  <td> <button id="editbtn"   class="editbtn" onclick="handleEdit(${user.id})">EDIT</button>

                  <button class="deletebtn" onclick="handleDelete(${user.id})" >DELETE </button></td>
                  </tr>`;
    table.innerHTML += row;
  }
}

// -------------messages on login
let create_success = document.querySelector(".create-success");
let create_error = document.querySelector(".create-error");

// --------------Update User-------//

function handleEdit(userId) {
  let userToEdit = users.find((user) => user.id === userId);

  let sessionStorage = localStorage;

  var arrayJSON = JSON.stringify(userToEdit);
  localStorage.setItem("userToEdit", arrayJSON);
  window.location.href =
    "/Dashboard/add operations/users/users/edit_users.html";
}

// -------------DELETE------//
async function handleDelete(id) {
  try {
    const response = fetch(`${baseUrl}/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    });

    if ((await response).status === 200) {
      let message = (await response).message;

      alert("user deleted successful!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert("user was not deleted ");
    }
  } catch (error) {
    alert(error.message);
  }
}
