async function populateTable() {
    try {
      const response = await fetch('http://localhost:5000/api/DVDs'); 
      const dvds = await response.json(); 
      dvds.forEach(function (dvd) {
        const row = document.createElement('tr');
        row.innerHTML = `
  <td><a href="detailTitle.html?id=${dvd.id}" target="_self">${dvd.id}</a></td>
        
            <td><a href="detailDvd.html?id=${dvd.id}" target="_self">${dvd.name}</a></td>
            <td><a href="detailDvd.html?id=${dvd.id}" target="_self">${dvd.author}</a></td>
            <td><a href="detailDvd.html?id=${dvd.id}" target="_self">${dvd.numberOfChapters }</a></td>
            <td><a href="detailDvd.html?id=${dvd.id}" target="_self">${dvd.numberOfMinutes}</a></td>
            <td><a href="detailDvd.html?id=${dvd.id}" target="_self">${dvd.availableCopies}</a></td>
            <td><a href="detailDvd.html?id=${dvd.id}" target="_self">${dvd.totalAvailableCopies}</a></td>        
            `;
        document.querySelector('tbody').appendChild(row);
      });
    } catch (error) {
      console.error(error); 
    }
  }