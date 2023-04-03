const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

async function showBookDetailsById() {

  try {
    const response = await fetch('http://localhost:5000/api/Books/' + id);
    const bookDetail = await response.json();

    if (bookDetail) {
      document.getElementById("authorName").value = bookDetail.author;
      document.getElementById("titleName").value = bookDetail.name;
      document.getElementById("availableCopies").value = bookDetail.availableCopies;
      document.getElementById("totalAvailableCopies").value = bookDetail.availableCopies;
      document.getElementById("ISBN").value = bookDetail.isbn;
      document.getElementById("numberOfPages").value = bookDetail.numberOfPages;
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

async function updateBook(event) {
  var result = confirm("Do you want to update?");
  if (result) {
    event.preventDefault();
    const author = document.getElementById("authorName").value;
    const name = document.getElementById("titleName").value;
    const availableCopies = parseInt(document.getElementById("availableCopies").value);
    const totalAvailableCopies = parseInt(document.getElementById("totalAvailableCopies").value);
    const numberOfPages = parseInt(document.getElementById("numberOfPages").value);
    const isbn = document.getElementById("ISBN").value;
    //put data 
    let xhr = new XMLHttpRequest();
    xhr.open("PUT", "http://localhost:5000/api/Books/" + id);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 201) {
          alert("Book " + name + " by " + author + " was updated");
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
                "availableCopies": "${availableCopies}",
                "totalAvailableCopies": "${totalAvailableCopies}" ,
                "numberOfPages": "${numberOfPages}",
                "isbn": "${isbn}"         
              }`;
    xhr.send(data);
  }
}