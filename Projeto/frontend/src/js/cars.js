const listCars = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/cars/');
  const lv = await response.json();
  for (const car of lv) {
      strHtml += `
      <div class="col-md-4">
        <div class="card">
          <img class="card-img-top" src="${car.picture}" alt="${car.brand} ${car.model}">
          <div class="card-img-overlay">
            <h4 class="card-title">${car.brand} ${car.model}</h4>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#CarModal" onclick="listCarDetails(${car.id})">Details</button>
          </div>
          <div class="card-footer">
            <button class="btn btn-danger" onclick="deleteCar(${car.id})"><i class="fa fa-solid fa-trash"></i></button>
          </div>
        </div>
      </div>
      `;
  }
  document.getElementById("cardCarros").innerHTML = strHtml;
}
listCars();

const listCarDetails = async (id) => {
  const response = await fetch('http://localhost:4242/api/pgs/cars/'+id);
  const car = await response.json();

  document.getElementById("Car_inputBrand").value = car.brand;
  document.getElementById("Car_inputModel").value = car.model;
  document.getElementById("Car_inputYear").value = car.year;
  document.getElementById("Car_inputPlate").value = car.plate;
  document.getElementById("Car_inputColor").value = car.color;
  document.getElementById("Car_inputDoorNumber").value = car.door_number;
  document.getElementById("Car_inputKilometers").value = car.kilometers;
  document.getElementById("Car_inputPicture").value = car.picture;
}

const addCar = async () => {
  var car = {
    Brand: document.getElementById("newCar_inputBrand").value,
    Model: document.getElementById("newCar_inputModel").value,
    Year: document.getElementById("newCar_inputYear").value,
    Plate: document.getElementById("newCar_inputPlate").value,
    Color: document.getElementById("newCar_inputColor").value,
    Door_Number: document.getElementById("newCar_inputDoorNumber").value,
    Kilometers: document.getElementById("newCar_inputKilometers").value,
    Picture: document.getElementById("newCar_inputPicture").value,
  };
  fetch('http://localhost:4242/api/pgs/cars/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
    .then(response => {
      // Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error('Erro ao obter os dados');
      }
      // Converte a resposta para JSON
      return response.json();
    })

    .then(data => {
      // Faz algo com os dados 
      resposta = "O carro com a marca: " + car.brand + " foi adicionado com sucesso!"
      alert(resposta)
      listCars();

    })
    .catch(error => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error('Houve um erro:', error);
    });
}

const updateCar = async () => {
  var car = {
    Brand: document.getElementById("Car_inputBrand").value,
    Model: document.getElementById("Car_inputModel").value,
    Year: document.getElementById("Car_inputYear").value,
    Plate: document.getElementById("Car_inputPlate").value,
    Color: document.getElementById("Car_inputColor").value,
    Door_Number: document.getElementById("Car_inputDoorNumber").value,
    Kilometers: document.getElementById("Car_inputKilometers").value,
    Picture: document.getElementById("newCar_inputPicture").value,
  };
  fetch("http://localhost:4242/api/pgs/cars/update", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(car),
  })
    .then((response) => {
      // Verifica se a resposta foi bem sucedida
      if (!response.ok) {
        throw new Error("Erro ao obter os dados");
      }
      // Converte a resposta para JSON
      return response.json();
    })
    .then((data) => {
      // Faz algo com os dados
      //console.log(data);
      resposta = "O carro com a marca: " + car.brand + " foi atualizado com sucesso!";
      alert(resposta)
      listCars();
    })
    .catch((error) => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error("Houve um erro:", error);
    });
};