

async function populateTable() {
  try {
    const response = await fetch('http://localhost:5000/api/Members'); 
    const members = await response.json(); 
    members.forEach(function (member) {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><a href="detailMember.html?id=${member.id}" target="_self">${member.id}</a></td>
          <td><a href="detailMember.html?id=${member.id}" target="_self">${member.firstName}</a></td>
          <td><a href="detailMember.html?id=${member.id}" target="_self">${member.lastName}</a></td>
          <td><a href="detailMember.html?id=${member.id}" target="_self">${member.dateOfBirth}</a></td>
          <td><a href="detailMember.html?id=${member.id}" target="_self">${member.personalId}</a></td>
        `;
        document.querySelector('tbody').appendChild(row);
    });
  } catch (error) {
    console.error(error); 
  }
}



