const container = document.querySelector(".container");
const destinationinput = document.querySelector(".destination");
const submit = document.getElementById("myform");
const button = document.querySelector(".btn");
let destination;

// -------------messages on login
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// --------- database link
const baseUrl = "http://localhost:3000/api";

// ----------------input listerners and preventing on reload
destinationinput.addEventListener("input", (e) => {
  destination = e.target.value;
  console.log(destination);
});

function myFunction() {
  window.location.href = "/Dashboard/destinations/destination.html";
}

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  adddestination();
});

// --------------------- Add Destination--------------------------//
//
function adddestination() {
  if (destination) {
    fetch(`${baseUrl}/destinations`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: destination,
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
  destinationinput.value = "";
}
