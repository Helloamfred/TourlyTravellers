const container = document.querySelector(".container");
const locationinput = document.querySelector(".location");
const descriptioninput = document.querySelector(".description");
const submit = document.getElementById("myform");
const button = document.querySelector(".btn");

let location_edit;
console.log(location_edit);
let description;
console.log(description);

// passing in the data from the server
let locationData = JSON.parse(localStorage.getItem("locationToEdit"));
console.log(locationData);
// displaying data in the edit form
let details = JSON.parse(localStorage.getItem("locationToEdit"));
document.getElementById("location").value = details.location;
document.getElementById("description").value = details.description;

// -------------messages on edit form-------------------------
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// --------- database link
const baseUrl = "http://localhost:3000/api";

// ----------------input listerners and preventing on reload
locationinput.addEventListener("input", (e) => {
  location_edit = e.target.value;
  locationData.location = location_edit;
  console.log(location_edit);
});
descriptioninput.addEventListener("input", (e) => {
  description = e.target.value;
  locationData.description = description;
  console.log(description);
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  editlocation();
});

// --------------------- update location--------------------------//
function editlocation() {
  console.log(locationData && description);
  if (location) {
    fetch(`${baseUrl}/locations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(locationData),
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
  locationinput.value = "";
  descriptioninput.value = "";
}

function myFunction() {
  window.location.href = "/Dashboard/locations/locations.html";
}
