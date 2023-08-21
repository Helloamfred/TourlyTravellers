"use strict";

/**
 * navbar toggle
 */
const currentLocation = window.location.pathname;
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const packageOptions = document.querySelector("#package-options");
const locationOptions = document.querySelector("#location-options");
const destinationOptions = document.querySelector("#destination-options");

const travellersinput = document.querySelector("#people");
const destinationinput = document.querySelector("#destination-options");
const locationinput = document.querySelector("#location-options");
const packageinput = document.querySelector("#package-options");
const priceinput = document.querySelector("#price-options");

const submit = document.getElementById("myform");
const requestbtn = document.getElementById("requestbtn");
const totalprice = document.getElementById("price-options");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");
const baseUrl = "http://localhost:3000/api";

let destination_id;
let location_id;
let package_id;
let travellers;
let optionPrice;

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
};

navToggleEvent(navElemArr);
navToggleEvent(navLinks);

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

// ----------------input listerners and preventing on reload
destinationinput.addEventListener("input", (e) => {
  destination_id = e.target.value;
  localStorage.setItem(`destination`, destination_id);
});
locationinput.addEventListener("input", (e) => {
  location_id = e.target.value;
  localStorage.setItem(`location`, location_id);
});
packageinput.addEventListener("input", (e) => {
  package_id = e.target.value;
  localStorage.setItem(`package`, package_id);
});

priceinput.addEventListener("input", (e) => {
  price = e.target.value;
  localStorage.setItem(`price`, price);
});
travellersinput.addEventListener("input", (e) => {
  travellers = e.target.value;
  localStorage.setItem(`travellers`, travellers);

  document.getElementById("price-options").value = optionPrice * travellers;
  console.log(document.getElementById("price-options").value);
  localStorage.setItem(
    `totalprice`,
    document.getElementById("price-options").value
  );
});

window.addEventListener("scroll", function () {
  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

const loginBtn = document.getElementById("mybtn");

loginBtn.addEventListener("click", goToLogin);
function goToLogin() {
  window.location.href = `http://127.0.0.1:5501/login-registration-form-html-css/login.html#${currentLocation}`;
}

const loadmoreBtn = document.getElementById("destination-btn");

loadmoreBtn.addEventListener("click", myFunction);

function myFunction() {
  window.location.href = `http://127.0.0.1:5501/Destination/destination.html`;
}

const viewallpackagesBtn = document.getElementById("packages-btn");

viewallpackagesBtn.addEventListener("click", goToAllDestinations);

function goToAllDestinations() {
  window.location.href = "http://127.0.0.1:5501/packages/packages.html";
}

// -------------getusersId------//
function getusersId(users, email) {
  let userId = users.find((user) => user.email === email).id;
  console.log(email);
  console.log(userId);

  sessionStorage.getItem("usersId", userId);
}
// ---------------------------GET----------------------//
//---------packages-----//
function postpackages() {
  fetch(`${baseUrl}/packages`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let optionElem = document.createElement("option");
      packageOptions.appendChild(optionElem);

      let packages = [];
      packages.push(`<option value="">Select Package</option>`);
      let d = data.map(
        (option) =>
          `<option value="${option.id}" onclick="populate(${option.Price})">${option.package}</option>`
      );

      packages.push(d);
      packageOptions.innerHTML = packages;
    })
    .catch((error) => {
      console.log(error);
    });
}
// -----------price  population-------//
function populate(price) {
  optionPrice = price;
  travellers = parseInt(travellersinput.value);
  if (travellersinput.value) {
    document.getElementById("price-options").value = price * travellers;
  } else {
    document.getElementById("price-options").value = price;
  }

  console.log(document.getElementById("price-options").value);
}

postpackages();

//-------location-----//
function postlocations() {
  fetch(`${baseUrl}/locations`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let optionElem = document.createElement("option");
      locationOptions.appendChild(optionElem);

      let locations = [];
      console.log(locations);
      locations.push(`<option value="">Select location</option>`);
      let d = data.map(
        (option) => `<option value="${option.id}">${option.location}</option>`
      );
      locations.push(d);
      locationOptions.innerHTML = locations;
    })
    .catch((error) => {
      console.log(error);
    });
}
postlocations();

//-------destination-----//
function postdestinations() {
  fetch(`${baseUrl}/destinations`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let optionElem = document.createElement("option");
      destinationOptions.appendChild(optionElem);

      let destinations = [];
      console.log(destinations);
      destinations.push(`<option value="">Select destination</option>`);
      let d = data.map(
        (option) =>
          `<option value="${option.id}">${option.destination}</option>`
      );
      console.log(d);
      destinations.push(d);
      destinationOptions.innerHTML = destinations;
    })
    .catch((error) => {
      console.log(error);
    });
}
postdestinations();

function getdestination() {
  fetch(`${baseUrl}/destinations`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //------calling the data-----//
      getdestination = data;
    })
    .catch((error) => {
      console.log(error);
    });
}
getdestination();

submit.addEventListener("submit", (e) => {
  e.preventDefault();
  idFunction();
  sendEmail();
});
function idFunction() {
  let userId = sessionStorage.getItem("usersId");
  if (userId) {
    goFunction();
  } else {
    alert("please login first");
  }
}

// --------request posting  before payment-----//

function goFunction() {
  if (destination_id && location_id && package_id && travellers) {
    let userId = sessionStorage.getItem("usersId");

    window.location.href = "http://127.0.0.1:5501/payment/payment.html";
  }
}

// prevents displaying the values on reload
destinationinput.value = "";
locationinput.value = "";
packageinput.value = "";
travellersinput.value = "";
priceinput.value = "";
