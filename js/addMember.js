function saveNewMember(event){
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;
    const personalId = document.getElementById("personalId").value;
   
    //put data 
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:5000/api/Members");    
    xhr.setRequestHeader("Accept", "application/json");    
    xhr.setRequestHeader("Content-Type", "application/json");    
    xhr.onreadystatechange = function ()  {    
     if (xhr.readyState === 4) {    
      if (xhr.status === 201) {
        alert("The member " + firstName + " " + lastName + " was inserted to database");
    } else if (xhr.status === 500) {  
        const errorObject = JSON.parse(xhr.responseText);
        const errorMessage = errorObject[""].errors[0].errorMessage;
        alert(errorMessage);
    }
    }};    
    let data = `
    {         
        "firstName": "${firstName}" ,
        "lastName": "${lastName}",
        "dateOfBirth": "${dateOfBirth}",
        "personalId": "${personalId}"     
      }`;    
    xhr.send(data);    
}