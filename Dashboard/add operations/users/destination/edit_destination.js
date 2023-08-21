const container = document.querySelector(".container");
const destinationinput = document.querySelector(".destination");
const submit = document.getElementById("myform");
const button = document.querySelector(".btn");

let destination;
console.log(destination);

// passing in the data from the server
let destinationData = JSON.parse(localStorage.getItem("destinationToEdit"));
console.log(destinationData);
// displaying data in the edit form
let details = JSON.parse(localStorage.getItem("destinationToEdit"));
document.getElementById("destination").value = details.destination;

// -------------messages on edit form-------------------------
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// --------- database link
const baseUrl = "http://localhost:3000/api";

// ----------------input listerners and preventing on reload
destinationinput.addEventListener("input", (e) => {
  destination = e.target.value;
  destinationData.destination = destination;
  console.log(destination);
});

function myFunction() {
  window.location.href = "/Dashboard/destinations/destination.html";
}

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  editdestination();
});

// --------------------- update destination--------------------------//
function editdestination() {
  console.log(destinationData);
  if (destination) {
    fetch(`${baseUrl}/destinations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(destinationData),
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
  destinationinput.value = "";
}
