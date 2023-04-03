async function populateTable() {
  try {
    const response = await fetch('http://localhost:5000/api/Books');
    const books = await response.json();
    books.forEach(function (book) {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td><a href="detailTitle.html?id=${book.id}" target="_self">${book.id}</a></td>      
          <td><a href="detailTitle.html?id=${book.id}" target="_self">${book.name}</a></td>
          <td><a href="detailTitle.html?id=${book.id}" target="_self">${book.author}</a></td>
          <td><a href="detailTitle.html?id=${book.id}" target="_self">${book.isbn}</a></td>
          <td><a href="detailTitle.html?id=${book.id}" target="_self">${book.availableCopies}</a></td>
          <td><a href="detailTitle.html?id=${book.id}" target="_self">${book.totalAvailableCopies}</a></td>
          <td><a href="detailTitle.html?id=${book.id}" target="_self">${book.numberOfPages}</a></td>        
          `;
      document.querySelector('tbody').appendChild(row);
    });
  } catch (error) {
    console.error(error);
  }
}