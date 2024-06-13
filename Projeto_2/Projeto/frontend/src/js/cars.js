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
  listSelectClients();
});

const listCars = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/cars/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const car of lv) {
    strHtml += `
      <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src="${car.picture}" alt="${car.brand} ${car.model}">
          <div class="card-img-overlay">
            <h4 class="card-title">${car.brand} ${car.model}</h4>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#carDetailsModal" onclick="listCarDetails(${car.id})">Details</button>
            <button class="btn btn-danger" onclick="deleteCar(${car.id})"><i class="fa fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
      `;
  }
  document.getElementById("gridCarros").innerHTML = strHtml;
};
listCars();

const listCarDetails = async (id) => {
  const response = await fetch('http://localhost:4242/api/pgs/cars/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const car = await response.json();
  sessionStorage.setItem('id', car.id);
  document.getElementById("carDetails_Brand").value = car.brand;
  document.getElementById("carDetails_Model").value = car.model;
  document.getElementById("carDetails_Year").value = car.year;
  document.getElementById("carDetails_Plate").value = car.plate;
  document.getElementById("carDetails_Color").value = car.color;
  document.getElementById("carDetails_DoorNumber").value = car.door_number;
  document.getElementById("carDetails_Kilometers").value = car.kilometers;
  document.getElementById("carDetails_Picture").value = car.picture;
  await listSelectClient(car.user_id);
  await listSelectService(car.service_id);
};

const addCar = async () => {
  var car = {
    Brand: document.getElementById("newCar_inputBrand").value,
    Model: document.getElementById("newCar_inputModel").value,
    Year: parseInt(document.getElementById("newCar_inputYear").value),
    Plate: document.getElementById("newCar_inputPlate").value,
    Color: document.getElementById("newCar_inputColor").value,
    Door_Number: parseInt(document.getElementById("newCar_inputDoorNumber").value),
    Kilometers: parseInt(document.getElementById("newCar_inputKilometers").value),
    Picture: document.getElementById("newCar_inputPicture").value,
    UserID: parseInt(document.getElementById("selectUser").value),
  };
  console.log(car);
  try {
    const response = await fetch('http://localhost:4242/api/pgs/cars/create', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      throw new Error('Failed to create car');
    }

    const data = await response.json();
    alert(`The car with plate ${data.plate} has been added successfully!`);

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while adding the car.');
  }
  listCars();
};

const updateCar = async () => {

  var car = {
    id: parseInt(sessionStorage.getItem('id')),
    Brand: document.getElementById("carDetails_Brand").value,
    Model: document.getElementById("carDetails_Model").value,
    Year: parseInt(document.getElementById("carDetails_Year").value),
    Plate: document.getElementById("carDetails_Plate").value,
    Color: document.getElementById("carDetails_Color").value,
    Door_Number: parseInt(document.getElementById("carDetails_DoorNumber").value),
    Kilometers: parseInt(document.getElementById("carDetails_Kilometers").value),
    Picture: document.getElementById("carDetails_Picture").value,
    UserID: parseInt(document.getElementById("carDetails_selectUser").value),
    ServiceID: parseInt(document.getElementById("carDetails_selectService").value),
  };
  console.log(car);
  try {
    const response = await fetch('http://localhost:4242/api/pgs/cars/update', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(car),
    });

    if (!response.ok) {
      throw new Error('Failed to update car');
    }

    const data = await response.json();
    alert(`The car with plate ${data.plate} has been updated successfully!`);
    listCars();

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while updating the car.');
  }
};

const deleteCar = async (id) => {
  fetch("http://localhost:4242/api/pgs/cars/delete/" + id, {
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
      resposta = "O carro foi apagado com sucesso!";
      alert(resposta);
    })
    .catch((error) => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error("Houve um erro:", error);
    });
  listCars();
};

const listSelectClient = async (id) => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/clients/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  strHtml +=
    `<option id="optionUser" value="${data.id}" selected>${data.firstname} ${data.lastname} - ${data.email}</option>
    <hr class="dropdown-divider"/>`;

  const response2 = await fetch('http://localhost:4242/api/pgs/clients/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response2.json();
  for (const user of lv) {
    if (user.role == "CLIENT") {
      strHtml += `<option id="optionUser" value="${user.id}">${user.firstname} ${user.lastname} - ${user.email}</option>`;
    }
  }
  document.getElementById("carDetails_selectUser").innerHTML += strHtml;
};

const listSelectService = async (id) => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/service/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  strHtml += `<option id="optionService" value="${data.id}" selected>${data.name}</option><hr class="dropdown-divider"/>`;

  const response2 = await fetch('http://localhost:4242/api/pgs/service/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response2.json();
  for (const service of lv) {
    strHtml += `<option id="optionService" value="${service.id}">${service.name}</option>`;
  }
  document.getElementById("carDetails_selectService").innerHTML = strHtml;
};