const baseUrl = "http://localhost:3000/api";
let create_success = document.querySelector("#create-success");
let create_error = document.querySelector("#create-error");
const Amountinput = document.querySelector("#totalamount");
const PhoneNumberinput = document.querySelector("#phonenumber");

//-------------Localstorage Items-------------------//
const totalprice = localStorage.getItem("totalprice");
const destination_id = localStorage.getItem("destination");
const package_id = localStorage.getItem("package");
const location_id = localStorage.getItem("location");
const travellers = localStorage.getItem("travellers");
const userId = sessionStorage.getItem("usersId");
const loggedEmail = sessionStorage.getItem("loggedEmail");

// ------inputs--------------//
PhoneNumberinput.addEventListener("input", (e) => {
  PhoneNumber = e.target.value;
  console.log(PhoneNumber);
});
Amountinput.addEventListener("input", (e) => {
  Amount = e.target.value;
});
Amountinput.value = totalprice;

//------------mpesa-------------------//
// ------------buttons-------------//
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// -----------------onclick payBtn-----------//
function mpesaTransaction() {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer A029ApYGhAGVzfAhFuP6BR8GCg7z");
  fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
    method: "POST",
    headers,
    body: JSON.stringify({
      BusinessShortCode: 174379,
      Password:
        "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjMwODIxMTEwMzM4",
      Timestamp: "20230821110338",
      TransactionType: "CustomerPayBillOnline",
      Amount: totalprice,
      PartyA: 254719432685,
      PartyB: 174379,
      PhoneNumber: 254719432685,
      CallBackURL: "https://mydomain.com/path",
      AccountReference: "CompanyXLTD",
      TransactionDesc: "Payment of X",
    }),
  })
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log(error));
    console.log()
}

//----------------paypal-------------------//
paypal
  .Buttons({
    // Order is created on the server and the order id is returned
    createOrder(data, actions) {
      console.log(actions, data);
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: totalprice,
            },
          },
        ],
      });
    },
    // Finalize the transaction after payer approval
    onApprove: function (data, actions) {
      // This function captures the funds from the transaction.
      return actions.order.capture().then(function (details) {
        // This function shows a transaction success message to your buyer.
        alert("Transaction completed by " + details.payer.name.given_name);
        // setTimeout(() => {
        //   window.location.href = "http://127.0.0.1:5501/index.html";
        // }, 700);
        // postrequest();

        sendEmail();
      });
    },
  })
  .render("#paypal-button-container");

//--------------------sending a confirmation email-------------------//
function sendEmail() {
  console.log(`${baseUrl}/emails`);
  fetch(`${baseUrl}/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: loggedEmail,
      to: "youngkid638@gmail.com",
      subject: `<h3>Hi there,</h3><p>${loggedEmail}</p> Your trip has been confirmed!`,
      textbody: `${totalprice} USD`,
    }),
  }).then(async (response) => {
    let info = await response.json();
    if (response.status === 201) {
      alert(info.message);
    } else {
      if (response.status === 500) {
        alert(error.message);
      }
    }
  });
}

// -----------post request to database after payment-------------//
function postrequest() {
  let userId = sessionStorage.getItem("usersId");
  console.log(userId);

  let totalprice = localStorage.getItem("totalprice");

  if (destination_id && location_id && package_id && travellers) {
    fetch(`${baseUrl}/requests`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        price: totalprice,
        destination_id: destination_id,
        location_id: location_id,
        package_id: package_id,
        travellers: travellers,
        user_id: userId,
      }),
    })
      .then(async (response) => {
        let data = await response.json();
        console.log(data);
        if (response.status === 201) {
          create_success.textContent = data.message;

          setTimeout(() => {
            create_success.textContent = "";
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
        console.log(
          JSON.stringify({
            totalprice,
            destination_id: destination_id,
            location_id: location_id,
            package_id: package_id,
            travellers: travellers,
            userId,
          })
        );
        create_error.textContent = error.message;

        setTimeout(() => {
          create_error.textContent = "";
        }, 5000);
      });
  }
}
