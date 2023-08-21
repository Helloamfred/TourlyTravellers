const container = document.querySelector(".container");
const packageinput = document.querySelector(".package");
const descriptioninput = document.querySelector(".description");
const submit = document.getElementById("myform");
const button = document.querySelector(".btn");

let package;
console.log(package);
let description;
console.log(description);

// passing in the data from the server
let packageData = JSON.parse(localStorage.getItem("packageToEdit"));
console.log(packageData);
// displaying data in the edit form
let details = JSON.parse(localStorage.getItem("packageToEdit"));
document.getElementById("package").value = details.package;
document.getElementById("description").value = details.description;

// -------------messages on edit form-------------------------
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// --------- database link
const baseUrl = "http://localhost:3000/api";

// ----------------input listerners and preventing on reload
packageinput.addEventListener("input", (e) => {
  package = e.target.value;
  packageData.package = package;
  console.log(package);
});
descriptioninput.addEventListener("input", (e) => {
  description = e.target.value;
  packageData.description = description;
  console.log(description);
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  editpackage();
});

// --------------------- update package--------------------------//
function editpackage() {
  console.log(packageData && description);
  if (package) {
    fetch(`${baseUrl}/packages`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(packageData),
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
  packageinput.value = "";
  descriptioninput.value = "";
}

function myFunction() {
  window.location.href = "/Dashboard/packages/packages.html";
}
