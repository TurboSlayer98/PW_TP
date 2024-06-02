const token = localStorage.getItem("token");

const listServices = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/service/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
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
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const service = await response.json();

  document.getElementById("inputName").value = service.name;
  document.getElementById("inputDescription").value = service.description;
  document.getElementById("inputPrice").value = service.price;
  document.getElementById("inputDuration").value = service.duration;
  document.getElementById("selectStatus").value = service.status;
  document.getElementById("optionCar").value = service.car_id;
};

const addService = async () => {
  var service = {
    Name: document.getElementById("inputName").value,
    Description: document.getElementById("inputDescription").value,
    Price: document.getElementById("inputPrice").value,
    Duration: document.getElementById("inputDuration").value,
    Status: document.getElementById("selectStatus").value,
    CarID: document.getElementById("optionCar").value,
  };

  try {
    const response = await fetch('http://localhost:4242/api/pgs/service/create', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error('Failed to create service');
    }

    const data = await response.json();
    alert(`The service with name ${data.Name} has been added successfully!`);
    listServices();  // Assuming this function is defined elsewhere

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while adding the service.');
  }
};

const updateService = async () => {
  var service = {
    Name: document.getElementById("inputName").value,
    Description: document.getElementById("inputDescription").value,
    Price: document.getElementById("inputPrice").value,
    Duration: document.getElementById("inputDuration").value,
    Status: document.getElementById("selectStatus").value,
    CarID: document.getElementById("optionCar").value,
  };

  try {
    const response = await fetch('http://localhost:4242/api/pgs/service/update', {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });

    if (!response.ok) {
      throw new Error('Failed to update service');
    }

    const data = await response.json();
    alert(`The service named ${data.Name} has been updated successfully!`);
    listServices();  // Assuming this function is defined elsewhere

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while updating the service.');
  }
};

const deleteService = async (id) => {
  fetch("http://localhost:4242/api/pgs/service/delete/" + id, {
    method: "DELETE",
    headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' },
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
