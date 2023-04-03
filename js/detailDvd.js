const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function showDvdDetailsById() {    
    try {
      const response = await fetch('http://localhost:5000/api/Dvds/'+ id);
      const dvdDetail = await response.json();            
    if (dvdDetail) {        
      document.getElementById("authorName").value = dvdDetail.author;
      document.getElementById("titleName").value = dvdDetail.name;
      document.getElementById("numberOfChapters").value = dvdDetail.numberOfChapters;
      document.getElementById("numberOfMinutes").value = dvdDetail.numberOfMinutes;
      document.getElementById("availableCopies").value = dvdDetail.availableCopies;
      document.getElementById("totalAvailableCopies").value = dvdDetail.totalAvailableCopies;
    } else {
      console.log(`Book with ID ${id} not found`);
    }
  }
  catch (error) {
    console.error(error); 
  }
}  
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

async function updateDvd(event) {
  var result = confirm("Do you want to update?");
  if (result) {
    event.preventDefault();
    const author = document.getElementById("authorName").value;
    const name = document.getElementById("titleName").value;
    const numberOfChapters = parseInt(document.getElementById("numberOfChapters").value);
    const numberOfMinutes = parseInt(document.getElementById("numberOfMinutes").value);
    const availableCopies = parseInt(document.getElementById("availableCopies").value);
    const totalAvailableCopies = document.getElementById("totalAvailableCopies").value;
    //put data 
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:5000/api/Dvds/" + id);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          alert("DVD " + name + " by " + author + " was updated");
        } else if (xhr.status === 500) {
          const errorObject = JSON.parse(xhr.responseText);
          const errorMessage = errorObject[""].errors[0].errorMessage;
          alert(errorMessage);
        }        
      }
    };
    let data = `
            {         
                "author": "${author}" ,
                "name": "${name}",
                "numberOfChapters": "${numberOfChapters}",
                "numberOfMinutes": "${numberOfMinutes}" ,
                "availableCopies": "${availableCopies}",
                "totalAvailableCopies": "${totalAvailableCopies}"         
              }`;
    xhr.send(data);
  }
}