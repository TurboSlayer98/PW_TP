/*document.addEventListener("DOMContentLoaded", function() {
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
*/

const token = localStorage.getItem("token");

const listUsers = async () => {
    let strHtml = ``;
    const response = await fetch('http://localhost:4242/api/pgs/users/', {
        method: 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    const lv = await response.json();
    for (const user of lv) {

        strHtml += `
        <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.gender}</td>
            <td>${user.role}</td>
            <td class="d-flex justify-content-center">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="listUserData(${user.id})">Details</button>
            <button class="btn btn-danger" onclick="deleteUser(${user.id})"><i class="fa fa-solid fa-trash"></i></button>
            </td>
        </tr>
        `;
    }
    document.getElementById("usertable").innerHTML = strHtml;
};
listUsers();

const listUserData = async (id) => {
    const response = await fetch('http://localhost:4242/api/pgs/users/' + id, {
        method: 'GET', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    const user = await response.json();

    document.getElementById("userDetails_userName").value = user.username;
    document.getElementById("userDetails_Email").value = user.email;
    document.getElementById("userDetails_firstName").value = user.firstname;
    document.getElementById("userDetails_lastName").value = user.lastname;
    
    const genderElements = document.getElementsByName("userDetails_radiobuttonG");
    for (const element of genderElements) {
        if (element.value == user.gender) {
            element.checked;
        }
    }
    const roleElements = document.getElementsByName("userDetails_radiobuttonR");
    for (const element of roleElements) {
        if (element.value = user.role) {
            element.checked;
        }
    }
};

const addUser = async () => {

    // Correctly get the selected gender
    const genderElements = document.getElementsByName("radiobuttonG");
    for (const element of genderElements) {
        if (element.checked) {
            gender = element.value;
            break;
        }
    }

    // Correctly get the selected role
    const roleElements = document.getElementsByName("radiobuttonR");
    for (const element of roleElements) {
        if (element.checked) {
            role = element.value;
            break;
        }
    }

    var user = {
        Username: document.getElementById("inputuserName").value,
        Email: document.getElementById("inputEmail").value,
        Password: document.getElementById("inputPassword").value,
        Firstname: document.getElementById("inputfirstName").value,
        Lastname: document.getElementById("inputlastName").value,
        Gender: gender,
        Role: role,
    };

    try {
        const response = await fetch('http://localhost:4242/api/pgs/users/create', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        alert(`The user named ${user.Firstname} has been added successfully!`);
        listUsers();  // Assuming this function is defined elsewhere

    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while adding the user.');
    }
};

const updateUser = async () => {

    // Correctly get the selected gender
    const genderElements = document.getElementsByName("userDetails_radiobuttonG");
    for (const element of genderElements) {
        if (element.checked) {
            gender = element.value;
            break;
        }
    }

    // Correctly get the selected role
    const roleElements = document.getElementsByName("userDetails_radiobuttonR");
    for (const element of roleElements) {
        if (element.checked) {
            role = element.value;
            break;
        }
    }

    if (document.getElementById("userDetails_Password").value === "") {
        var user = {
            Username: document.getElementById("userDetails_userName").value,
            Email: document.getElementById("userDetails_Email").value,
            Firstname: document.getElementById("userDetails_firstName").value,
            Lastname: document.getElementById("userDetails_lastName").value,
            Gender: gender,
            Role: role,
        };
    } else {
        var user = {
            Username: document.getElementById("userDetails_userName").value,
            Email: document.getElementById("userDetails_Email").value,
            Password: document.getElementById("userDetails_Password").value,
            Firstname: document.getElementById("userDetails_firstName").value,
            Lastname: document.getElementById("userDetails_lastName").value,
            Gender: gender,
            Role: role,
        };
    }

    try {
        const response = await fetch('http://localhost:4242/api/pgs/users/update', {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        alert(`The user named ${user.Firstname} has been edited successfully!`);
        listUsers();  // Assuming this function is defined elsewhere

    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while adding the user.');
    }
};

const deleteUser = async (id) => {
    try {
        const response = await fetch('http://localhost:4242/api/pgs/users/delete' + id, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to remove user');
        }

        const data = await response.json();
        alert(`The user has been removed successfully!`);
        listUsers();  // Assuming this function is defined elsewhere

    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while removing the user.');
    }
    listUsers();
};
