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

const listServices = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/service/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const service of lv) {
    strHtml += `
    <tr>
        <td>${service.name}</td>
        <td>${service.description}</td>
        <td>${service.price}</td>
        <td>${service.duration}</td>
        <td>${service.status}</td>
        <td>${service.type}</td>
        <td class="d-flex justify-content-center">
        <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#serviceDetailsModal" onclick="listServiceDetails(${service.id})">Details</button>
        <button class="btn btn-danger" onclick="deleteService(${service.id})"><i class="fa fa-solid fa-trash"></i></button>
        </td>
    </tr>
    `;
  }
  document.getElementById("serviceTable").innerHTML = strHtml;
};
listServices();

const listServiceDetails = async (id) => {
  const response = await fetch('http://localhost:4242/api/pgs/service/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const service = await response.json();
  sessionStorage.setItem('id', service.id);
  document.getElementById("inputName").value = service.name;
  document.getElementById("inputDescription").value = service.description;
  document.getElementById("inputPrice").value = service.price;
  document.getElementById("inputDuration").value = service.duration;
  document.getElementById("selectStatus").value = service.status;
  document.getElementById("selectType").value = service.type;
  await listSelectCar(service.id);
};

const addService = async () => {
  var service = {
    Name: document.getElementById("inputName").value,
    Description: document.getElementById("inputDescription").value,
    Price: parseFloat(document.getElementById("inputPrice").value),
    Duration: document.getElementById("inputDuration").value,
    Status: document.getElementById("selectStatus").value,
    Type: document.getElementById("selectType").value,
  };
  try {
    const response = await fetch('http://localhost:4242/api/pgs/service/create', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error('Failed to create service');
    }

    const data = await response.json();
    alert(`The service with name ${data.name} has been added successfully!`);
    listServices();

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while adding the service.');
  }
};

const updateService = async () => {
  var service = {
    id: parseInt(sessionStorage.getItem('id')),
    Name: document.getElementById("inputName").value,
    Description: document.getElementById("inputDescription").value,
    Price: parseFloat(document.getElementById("inputPrice").value),
    Duration: document.getElementById("inputDuration").value,
    Status: document.getElementById("selectStatus").value,
    CarID: parseInt(document.getElementById("optionCar").value),
  };

  try {
    const response = await fetch('http://localhost:4242/api/pgs/service/update', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error('Failed to update service');
    }

    const data = await response.json();
    alert(`The service named ${data.name} has been updated successfully!`);
    listServices();  // Assuming this function is defined elsewhere

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while updating the service.');
  }
};

const deleteService = async (id) => {
  fetch("http://localhost:4242/api/pgs/service/delete/" + id, {
    method: "DELETE",
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
  })
    .then((response) => {
      // Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error("Erro ao obter os dados");
      }
      return response;
    })
    .then((car) => {
      // Faz algo com os dados
      resposta = "The service was removed successfully!";
      alert(resposta);
    })
    .catch((error) => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error("An error occurred:", error);
    });
  listServices();
};

const listSelectCar = async (id) => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/service/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const related = await response.json();
  console.log(related);
  for (const data of related) {
    strHtml += `<option id="optionCar" value="${data.id}" selected>${data.brand} ${data.model} - ${data.plate}</option>`;
  }

  strHtml += `<hr class="dropdown-divider"/>`;

  const response2 = await fetch('http://localhost:4242/api/pgs/cars/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response2.json();
  for (const car of lv) {
    strHtml += `<option id="optionCar" value="${car.id}" selected>${car.brand} ${car.model} - ${car.plate}</option>`;
  }
  document.getElementById("serviceDetails_selectCars").innerHTML = strHtml;
};