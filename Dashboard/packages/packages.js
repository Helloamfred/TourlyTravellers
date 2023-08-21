// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");
const baseUrl = "http://localhost:3000/api";
// -------------messages on login
let create_success = document.querySelector(".create-success");
let create_error = document.querySelector(".create-error");

let packages = [];

//---------------Add packages Button Syntax
const button = document.querySelector(".btn");

document.getElementById("btn").onclick = function () {
  myFunction();
};
function myFunction() {
  window.location.href =
    "/Dashboard/add operations/users/packages/add_package.html";
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
function getpackages() {
  fetch(`${baseUrl}/packages`)
    .then((response) => response.json())
    .then((data) => {
      //------calling the data-----//
      buildtable(data);
      packages = data;
    })
    .catch((error) => {
      console.log(error);
    });
}

getpackages();

function buildtable(packages) {
  var table = document.getElementById("packages_table");
  for (const package of packages) {
    var row = `<tr>
                  <td>${package.id}</td>
                  <td>${package.package}</td>
                  <td>${package.description}</td>
                  <td>${package.Price}</td>
                 <td> <button class="editbtn" onclick="handleEdit(${package.id})">Edit</button>
                  <td> <button class="deletebtn" onclick="handleDelete(${package.id})">Delete</button>
                  </tr>`;
    console.log(package.Price);
    table.innerHTML += row;
  }
}
// -------------UPDATE------//
function handleEdit(packageId) {
  let packageToEdit = packages.find((package) => package.id === packageId);
  let sessionStorage = localStorage;

  var arrayJSON = JSON.stringify(packageToEdit);
  localStorage.setItem("packageToEdit", arrayJSON);
  window.location.href =
    "/Dashboard/add operations/users/packages/edit_package.html";
}
// -------------DELETE------//
async function handleDelete(id) {
  try {
    const response = fetch(`${baseUrl}/packages`, {
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

      alert("package deleted successfully!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert("package was not deleted");
    }
  } catch (error) {
    alert(error.message);
  }
}
