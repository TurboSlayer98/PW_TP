const listCars = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/local/cars');
  const lv = await response.json();
  for (const car of lv) {
      strHtml += `
      <div class="col-xl-3 col-md-6 mb-5 d-inline-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${car.Picture}" alt="${car.Brand} ${car.Model}">
          <h4 class="card-title mb-4 mt-4">${car.Brand} ${car.Model}</h4>
          <div class="col-12 d-inline-flex justify-content-center">
            <div class="col-4">
              <button class="btn btn-warning w-100" data-bs-toggle="modal" data-bs-target="#updateCarModal">Update</button>
            </div>
            <div class="col-4">
              <button class="btn btn-danger w-100" onclick="deleteCar(${car.ID})">Delete</button>
            </div>
            <div class="col-4">
              <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#carDetailsModal" onclick="listCarDetails(${car.ID})">Details</button>
            </div>
          </div>
        </div>
      </div>
      `;
  }
  document.getElementById("cardCarros").innerHTML = strHtml;
}
listCars();

const listCarDetails = async (id) => {
  const response = await fetch('http://localhost:4242/api/cars/' + id);
  const car = await response.json();

  console.log(car);

  //document.getElementById("carDetails_inputPicture").value = car[id].Picture;
  document.getElementById("carDetails_inputBrand").value = car[0].Brand;
  document.getElementById("carDetails_inputModel").value = car[0].Model;
  document.getElementById("carDetails_inputYear").value = car[0].Year;
  document.getElementById("carDetails_inputPlate").value = car[0].Plate;
  document.getElementById("carDetails_inputColor").value = car[0].Color;
  document.getElementById("carDetails_inputDoorNumber").value = car[0].Door_Number;
  document.getElementById("carDetails_inputKilometers").value = car[0].Kilometers;
}

const addCar = async () => {
  var car = {
    //ID: document.getElementById("").value,
    //Picture: document.getElementById("").value,
    Brand: document.getElementById("newCar_inputBrand").value,
    Model: document.getElementById("newCar_inputModel").value,
    Year: document.getElementById("newCar_inputYear").value,
    Plate: document.getElementById("newCar_inputPlate").value,
    Color: document.getElementById("newCar_inputColor").value,
    Door_Number: document.getElementById("newCar_inputDoorNumber").value,
    Kilometers: document.getElementById("newCar_inputKilometers").value,
  };
  //alert(dados.Brand); //alert(dados.Detalhes) //alert(dados.Foto)
  fetch('http://localhost:4242/api/cars/create', {
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
      //console.log(data);
      resposta = "O carro com a marca: " + car.Brand + " foi adicionado com sucesso!"
      alert(resposta)
      listarCarros();

    })
    .catch(error => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error('Houve um erro:', error);
    });
}

const updateCar = async () => {
  var car = {
    //Picture: document.getElementById("").value,
    Brand: document.getElementById("updateCar_inputBrand").value,
    Model: document.getElementById("updateCar_inputModel").value,
    Year: document.getElementById("updateCar_inputYear").value,
    Plate: document.getElementById("updateCar_inputPlate").value,
    Color: document.getElementById("updateCar_inputColor").value,
    Door_Number: document.getElementById("updateCar_inputDoorNumber").value,
    Kilometers: document.getElementById("updateCar_inputKilometers").value
  };
  fetch("http://localhost:4242/api/cars/update", {
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
      resposta = "O carro com a marca: " + car.Brand + " foi atualizado com sucesso!";
      alert(resposta);
      listarCarros();
    })
    .catch((error) => {
      // Captura qualquer erro de rede ou tratamento de erro
      console.error("Houve um erro:", error);
    });
};
