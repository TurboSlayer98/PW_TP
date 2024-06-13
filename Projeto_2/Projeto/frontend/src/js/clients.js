window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //     document.body.classList.toggle('sb-sidenav-toggled');
      // }
      sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
      });
    }
    const token = localStorage.getItem("token");
  });

const listC = async () => {
    let strHtml = ``;
    const response = await fetch('http://localhost:4242/api/pgs/clients/', {
        method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    const lv = await response.json();
    for (const user of lv) {
        if (user.role == "CLIENT") {
            strHtml += `
        <tr>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.gender}</td>
            <td>${user.role}</td>
            <td class="d-flex justify-content-center">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#userDetailsModal" onclick="listDataC(${user.id})">Details</button>
            <button class="btn btn-danger" onclick="deleteC(${user.id})"><i class="fa fa-solid fa-trash"></i></button>
            </td>
        </tr>
        `;
        }
    }
    document.getElementById("usertable").innerHTML = strHtml;
}
listC();

const listDataC = async (id) => {
    const response = await fetch('http://localhost:4242/api/pgs/clients/' + id, {
        method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
    const user = await response.json();
    sessionStorage.setItem('id', user.id);
    document.getElementById("userDetails_userName").value = user.username;
    document.getElementById("userDetails_Email").value = user.email;
    document.getElementById("userDetails_Password").value = user.password;
    document.getElementById("userDetails_firstName").value = user.firstname;
    document.getElementById("userDetails_lastName").value = user.lastname;

    const genderElements = document.getElementsByName("userDetails_radiobuttonG");
    for (const element of genderElements) {
        if (element.value == user.gender) {
            element.checked = true;
            break;
        }
    };
    const roleElements = document.getElementsByName("userDetails_radiobuttonR");
    for (const element of roleElements) {
        if (element.value == user.role) {
            element.checked = true;
            break;
        }
    };
};

const addC = async () => {

    // Correctly get the selected gender
    const genderElements = document.getElementsByName("radiobuttonG");
    for (const element of genderElements) {
        if (element.checked) {
            gender = element.value;
            break;
        }
    };

    // Correctly get the selected role
    const roleElements = document.getElementsByName("radiobuttonR");
    for (const element of roleElements) {
        if (element.checked) {
            role = element.value;
            break;
        }
    };

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
        const response = await fetch('http://localhost:4242/api/pgs/clients/create', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        alert(`The user named ${data.username} has been added successfully!`);
        listC();  // Assuming this function is defined elsewhere

    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while adding the user.');
    }
}

const updateC = async () => {

    // Correctly get the selected gender
    const genderElements = document.getElementsByName("userDetails_radiobuttonG");
    for (const element of genderElements) {
        if (element.checked) {
            gender = element.value;
        }
    };

    // Correctly get the selected role
    const roleElements = document.getElementsByName("userDetails_radiobuttonR");
    for (const element of roleElements) {
        if (element.checked) {
            role = element.value;
        }
    };

    var user = {
        id: parseInt(sessionStorage.getItem('id')),
        Username: document.getElementById("userDetails_userName").value,
        Email: document.getElementById("userDetails_Email").value,
        Password: document.getElementById("userDetails_Password").value,
        Firstname: document.getElementById("userDetails_firstName").value,
        Lastname: document.getElementById("userDetails_lastName").value,
        Gender: gender,
        Role: role,
    };
    try {
        const response = await fetch('http://localhost:4242/api/pgs/clients/update', {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        const data = await response.json();
        alert(`The user named ${data.firstname} has been updated successfully!`);
        listC();  // Assuming this function is defined elsewhere

    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while updating the user.');
    }
}

const deleteC = async (id) => {
    try {
        const response = await fetch('http://localhost:4242/api/pgs/clients/delete/' + id, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error('Failed to remove user');
        }
        const data = await response.json();
        alert(`The user has been removed successfully!`);
        listC();  // Assuming this function is defined elsewhere

    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while removing the user.');
    }
}
