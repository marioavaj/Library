
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


//nastav pre vsetky inputs listener na zmenu a pri zmene spristupni button update
document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("formAddItem");
  var inputFields = form.querySelectorAll("input");
  for (var i = 0; i < inputFields.length; i++) {
    inputFields[i].addEventListener("input", function () {
      var updateButon = document.querySelector(".submit");
      updateButon.removeAttribute("disabled")
    });
  }
});

async function showMemberDetailsById() {

  try {
    const response = await fetch('http://localhost:5000/api/Members/' + id);
    const memberDetail = await response.json();
    console.log(memberDetail);

    if (memberDetail) {
      console.log(memberDetail);
      document.getElementById("firstName").value = memberDetail.firstName;
      document.getElementById("lastName").value = memberDetail.lastName;
      document.getElementById("dateOfBirth").value = memberDetail.dateOfBirth;
      document.getElementById("personalId").value = memberDetail.personalId;
    } else {
      console.log(`Member with ID ${id} not found`);
    }
  }
  catch (error) {
    console.error(error);
  }
}

async function updateMember(event) {
  var result = confirm("Do you want to update?");
  if (result) {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dateOfBirth = parseInt(document.getElementById("dateOfBirth").value);
    const personalId = parseInt(document.getElementById("personalId").value);
    //put data 
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:5000/api/Members/" + id);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 201) {
          alert("Member " + firstName + " " + lastName + " was updated");
        } else if (xhr.status === 500) {
          const errorObject = JSON.parse(xhr.responseText);
          const errorMessage = errorObject[""].errors[0].errorMessage;
          alert(errorMessage);
        }
      }
    };
    let data = `
            {         
                "firstName": "${firstName}" ,
                "lastName": "${lastName}",
                "dateOfBirth": "${dateOfBirth}",
                "personalId": "${personalId}"                      
              }`;
    xhr.send(data);

  }
}
