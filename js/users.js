document.addEventListener("DOMContentLoaded", function() {
  fetch('../assets/json/users.json')
      .then(response => response.json())
      .then(data => {
          const tableBody = document.querySelector('tbody');
          data.forEach(user => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${user.Name}</td>
                  <td>${user.Role}</td>
                  <td>${user.Age}</td>
              `;
              tableBody.appendChild(row);
          });
      })
      .catch(error => console.error('Error fetching users data:', error));
});
