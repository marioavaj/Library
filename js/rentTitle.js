//nastav pre vsetky inputs listener na zmenu a pri zmene vypne disabled na buttone
document.addEventListener("DOMContentLoaded", () => {
    var form = document.getElementById("formAddItem");
    var inputFields = form.querySelectorAll("input");
    for (var i = 0; i < inputFields.length; i++) {
        inputFields[i].addEventListener("input", () => {
            var updateButon = document.querySelector(".submit");
            updateButon.removeAttribute("disabled")
        });
    }
});

function setDates() {

    var today = new Date();
    //var returnDate = new Date();

    var currentDateInput = document.getElementById('currentDate');
    //var returnDateInput = document.getElementById('returnDate');

    currentDateInput.value = today.toLocaleDateString('Sk');
    //returnDate.setDate(today.getDate() + 21);
    //returnDateInput.value = returnDate.toLocaleDateString('Sk');
}

//get books and DVDs
async function getTitles() {

    var books = document.getElementById('titlesOptions');
    await fetch('http://localhost:5000/api/Books')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement('option');
                option.value = data[i].id + ". " + " / " + data[i].name + " / " + data[i].author + " / ISBN: " + data[i].isbn;
                books.appendChild(option);
            }
        });

    var dvds = document.getElementById('titlesOptions');
    await fetch('http://localhost:5000/api/Dvds')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement('option');
                option.value = data[i].id + ". " + " / " + data[i].name + " / " + data[i].author;

                dvds.appendChild(option);
            }
        });

}

async function getMembers() {

    var members = document.getElementById('memberOptions');
    await fetch('http://localhost:5000/api/Members')
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.length; i++) {
                var option = document.createElement('option');
                option.value = data[i].id + ". " + data[i].firstName + " " + data[i].lastName;
                members.appendChild(option);
            }
        });
}


function rentTitle(event) {
    event.preventDefault();
    const member = document.getElementById("member").value;
    const title = document.getElementById("title").value;
    const memberId = parseInt(member);
    const titleId = parseInt(title);


    //post data 
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:5000/api/RentalEntries");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                alert(xhr.responseText);
            } else if (xhr.status === 500) {
                const errorObject = JSON.parse(xhr.responseText);
                const errorMessage = errorObject[""].errors[0].errorMessage;
                alert(errorMessage);
            }
        }
    };

    let data = `
      {         
          "memberId": "${memberId}",
          "titleId": "${titleId}"                
        }`;

   

    xhr.send(data);


}













