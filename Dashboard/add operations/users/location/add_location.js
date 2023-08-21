const container = document.querySelector(".container");
const locationinput = document.querySelector(".location");
const descriptioninput = document.querySelector(".description");
const submit = document.getElementById("myform");
const button = document.querySelector(".btn");

let description;
let location_name;
console.log(description);

// -------------messages on login
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// --------- database link
const baseUrl = "http://localhost:3000/api";
console.log(locationinput);
console.log(descriptioninput);
// ----------------input listerners and preventing on reload
locationinput.addEventListener("input", (e) => {
  location_name = e.target.value;
  console.log(location_name);
});
descriptioninput.addEventListener("input", (e) => {
  description = e.target.value;
  console.log(description);
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  addlocation();
});

function myFunction() {
  window.location.href = "/Dashboard/locations/locations.html";
}
// --------------------- Add location--------------------------//

function addlocation() {
  if (location_name && description) {
    fetch(`${baseUrl}/locations`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: location_name,
        description: description,
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
  locationinput.value = "";
  descriptioninput.value = "";
}
