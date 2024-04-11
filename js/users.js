// Function to fetch data from a JSON file and populate a table
function fetchDataAndPopulateTable() {
    fetch('../assets/json/cars.json')
      .then(response => response.json())
      .then(data => {
        // Assuming your JSON structure is an array of objects
        let tableBody = document.querySelector('.card .table-bordered tbody');
        tableBody.innerHTML = ''; // Clear existing table data
  
        // Populate table with new data
        data.forEach(item => {
          let row = `<tr>
            <td>${item.column1}</td>
            <td>${item.column2}</td>
            <td>${item.column3}</td>
          </tr>`;
          tableBody.innerHTML += row;
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  
  // Call the function to populate the table when the window loads
  window.onload = fetchDataAndPopulateTable;
  