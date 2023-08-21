// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");
const baseUrl = "http://localhost:3000/api";
// -------------messages on login
let create_success = document.querySelector(".create-success");
let create_error = document.querySelector(".create-error");

let locations = [];

//---------------Add locations Button Syntax
const button = document.querySelector(".btn");

document.getElementById("btn").onclick = function () {
  myFunction();
};
function myFunction() {
  window.location.href =
    "/Dashboard/add operations/users/location/add_location.html";
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

// -------------GET------//
function getlocations() {
  fetch(`${baseUrl}/locations`)
    .then((response) => response.json())
    .then((data) => {
      //------calling the data-----//
      buildtable(data);
      locations = data;
    })
    .catch((error) => {
      console.log(error);
    });
}

getlocations();

function buildtable(locations) {
  var table = document.getElementById("locations_table");
  for (const location of locations) {
    var row = `<tr>
                  <td>${location.id}</td>
                  <td>${location.location}</td>
                  <td>${location.description}</td>
                  <td> <button class="editbtn" onclick="handleEdit(${location.id})">Edit</button>
                  <td> <button class="deletebtn" onclick="handleDelete(${location.id})">Delete</button>
                  </tr>`;
    table.innerHTML += row;
  }
}
// -------------UPDATE------//
function handleEdit(locationId) {
  let locationToEdit = locations.find((location) => location.id === locationId);
  let sessionStorage = localStorage;

  var arrayJSON = JSON.stringify(locationToEdit);
  localStorage.setItem("locationToEdit", arrayJSON);
  window.location.href =
    "/Dashboard/add operations/users/location/edit_location.html";
}
// -------------DELETE------//
async function handleDelete(id) {
  try {
    const response = fetch(`${baseUrl}/locations`, {
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

      alert("location deleted successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert("location was not deleted");
    }
  } catch (error) {
    alert(error.message);
  }
}
