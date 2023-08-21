const container = document.querySelector(".container");
const packageinput = document.querySelector(".package");
const descriptioninput = document.querySelector(".description");
const submit = document.getElementById("myform");
const button = document.querySelector(".btn");

let package;
let description;
console.log(package);
console.log(description);

// -------------messages on login
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");

// --------- database link
const baseUrl = "http://localhost:3000/api";

// ----------------input listerners and preventing on reload
packageinput.addEventListener("input", (e) => {
  package = e.target.value;
  console.log(package);
});
descriptioninput.addEventListener("input", (e) => {
  description = e.target.value;
  console.log(description);
});

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  addpackage();
});

function myFunction() {
  window.location.href = "/Dashboard/packages/packages.html";
}
// --------------------- Add package--------------------------//

function addpackage() {
  if (package && description) {
    fetch(`${baseUrl}/packages`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        package: package,
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
  packageinput.value = "";
  descriptioninput.value = "";
}
