indexOffilterItem = -1;
searchInput = null;




function fileredItem() {
    const inputs = document.querySelectorAll(".inputText");
    inputs.forEach((input, index) => {
        input.addEventListener("input", () => {
            if (input.value !== "") {
                idValue = input.id;
                console.log(idValue);
                searchInput = document.getElementById(idValue);
                indexOffilterItem = index;
                console.log('indexOffilterItem     ' + indexOffilterItem)
                filter();
            }
        });
    });
}

function filter() {
    const tableRows = document.querySelectorAll("#allTables tbody tr");
    if (searchInput) {
        searchInput.addEventListener("keyup", () => {
            const filterText = searchInput.value.toLowerCase();
            tableRows.forEach((row) => {
                const idColumn = row.cells[indexOffilterItem];
                console.log('indexOffilterItem  ' + indexOffilterItem)
                const id = idColumn.textContent.trim().toLowerCase();
                if (id.includes(filterText)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        });
    }
}