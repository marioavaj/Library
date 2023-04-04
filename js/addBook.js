function saveNewBook(event) {
  event.preventDefault();
  const author = document.getElementById("author").value;
  const name = document.getElementById("name").value;
  const availableCopies = parseInt(document.getElementById("availableCopies").value);
  const totalAvailableCopies = parseInt(document.getElementById("totalAvailableCopies").value);
  const numberOfPages = parseInt(document.getElementById("numberOfPages").value);
  const isbn = document.getElementById("isbn").value;

  //post data 
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5000/api/Books");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 201) {
        alert("The book " + name + " was inserted to database");
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
  //
}