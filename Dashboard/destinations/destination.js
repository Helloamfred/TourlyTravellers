const Button = document.querySelector(".btn");
// add hovered class to selected list item

let list = document.querySelectorAll(".navigation li");
const baseUrl = "http://localhost:3000/api";
let destinations = [];

//---------------Add destinations Button Syntax

document.getElementById("mybtn").onclick = function () {
  myFunction();
};
function myFunction() {
  window.location.href =
    "/Dashboard/add operations/users/destination/add_destination.html";
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

//-----------------------------------destinationS DATA DISPLAY ON THE DASHBOARD

// --------GET/DISPLAY-------//
function getdestinations() {
  fetch(`${baseUrl}/destinations`)
    .then((response) => response.json())
    .then((data) => {
      //------calling the data-----//
      buildtable(data);
      destinations = data;
    })
    .catch((error) => {
      console.log(error);
    });
}

getdestinations();

function buildtable(destinations) {
  var table = document.getElementById("destinations_table");
  for (const destination of destinations) {
    var row = `<tr>
                  <td>${destination.destination}</td>
                  <td>${destination.id}</td>
                

              
                  <td> <button id="editbtn"   class="editbtn" onclick="handleEdit(${destination.id})">EDIT</button>

                  <button class="deletebtn" onclick="handleDelete(${destination.id})" >DELETE </button></td>
                  </tr>`;
    table.innerHTML += row;
  }
}

// -------------messages on login
let create_success = document.querySelector(".create-success");
let create_error = document.querySelector(".create-error");

// --------------Update destination-------//

function handleEdit(destinationId) {
  let destinationToEdit = destinations.find(
    (destination) => destination.id === destinationId
  );

  let sessionStorage = localStorage;

  var arrayJSON = JSON.stringify(destinationToEdit);
  localStorage.setItem("destinationToEdit", arrayJSON);
  window.location.href =
    "/Dashboard/add operations/users/destination/edit_destination.html";
}

// -------------DELETE------//
async function handleDelete(id) {
  try {
    const response = fetch(`${baseUrl}/destinations`, {
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

      alert("destination deleted successful!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert("destination was not deleted ");
    }
  } catch (error) {
    alert(error.message);
  }
}
