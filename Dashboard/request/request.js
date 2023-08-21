// add hovered class to selected list item
let list = document.querySelectorAll(".navigation li");

const baseUrl = "http://localhost:3000/api";
let requests = [];
console.log(requests);

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
//-----------------------------------request DATA DISPLAY ON THE DASHBOARD

// --------GET/DISPLAY-------//
function getrequest() {
  fetch(`${baseUrl}/requests`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      //------calling the data-----//
      buildtable(data);
      requests = data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });
}

getrequest();

function buildtable(requests) {
  var table = document.getElementById("requests_table");
  for (const request of requests) {
    var row = `<tr>
                  <td>${request.request_id}</td>
                  <td>${request.full_name}</td>
                  <td>${request.destination}</td>
                  <td>${request.location}</td>
                 <td>${request.package}</td> 
                     
                 <td>${request.travellers}</td>   
                 <td>${request.price}</td>  
                 <td> <button id="editbtn"   class="editbtn" onclick="handleEdit(${request.request_id})">EDIT</button>

                 <button class="deletebtn" onclick="handleDelete(${request.request_id}) " >DELETE </button></td>



                 </tr>`;
    table.innerHTML += row;
  }
}

// -------------messages on request
let create_success = document.querySelector(".create-success");
let create_error = document.querySelector(".create-error");

// --------------Update request-------//

function handleEdit(request_id) {
  let requestToEdit = requests.find(
    (request) => request.request_id === request_id
  );

  let sessionStorage = localStorage;

  var arrayJSON = JSON.stringify(requestToEdit);
  localStorage.setItem("requestToEdit", arrayJSON);
  window.location.href =
    "/Dashboard/add operations/requests/requests/edit_requests.html";
}

// -------------DELETE------//
async function handleDelete(request_id) {
  console.log(request_id);
  try {
    const response = fetch(`${baseUrl}/requests`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: request_id,
      }),
    });

    if ((await response).status === 200) {
      let message = (await response).message;

      alert("request deleted successful!");

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      alert("request was not deleted ");
    }
  } catch (error) {
    alert(error.message);
  }
}
