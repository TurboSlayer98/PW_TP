
function openModal(tableUrl) {
    var modal = document.getElementById('CarModal');
    var modalContent = document.getElementById('modal_content');

    // Clear previous content
    modalContent.innerHTML = '';

    fetch(tableUrl)
      .then(response => response.text())
      .then(html => {
        // Create a temporary element to parse the HTML
        var tempElement = document.createElement('div');
        tempElement.innerHTML = html;

        // Find the table in the parsed HTML
        var table = tempElement.querySelector('table');

        // Create a new HTML structure with formatted data
        var formattedData = '<h2>Car Information</h2>';
        formattedData += '<div class="car-list">';
        var rows = table.querySelectorAll('tr');
        rows.forEach(function(row, index) {
          if (index === 0) return; // Skip header row
          var cells = row.querySelectorAll('td');
          var name = cells[0].innerText;
          var description = cells[1].innerText;
          var image = cells[2].querySelector('img').src;
          formattedData += `<div class="car-item">
                              <h3>${name}</h3>
                              <p>${description}</p>
                              <img src="${image}" alt="${name}" style="max-width: 100px;">
                            </div>`;
        });
        formattedData += '</div>';

        // Append the formatted data to modal content
        modalContent.innerHTML = formattedData;

        // Display the modal
        modal.style.display = "block";
      })
      .catch(error => console.error('Error fetching table:', error));
  }

  // Function to close modal
  function closeModal() {
    var modal = document.getElementById('CarModal');
    modal.style.display = "none";
  }