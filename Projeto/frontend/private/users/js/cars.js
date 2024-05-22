/*class CarDisplay {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  async fetchCars() {
    try {
      const response = await fetch('http://localhost:4242/api/cars');
      //const response = await fetch('../assets/json/cars.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const cars = await response.json();
      this.renderCars(cars);
    } catch (error) {
      console.error('Could not fetch cars:', error);
    }
  }

  renderCars(cars) {
    this.container.innerHTML = cars.map(car => `
      <div class="col-xl-3 col-md-6 mb-5 d-inline-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${car.Picture}" alt="${car.Brand} ${car.Model}">
          <h4 class="card-title mb-4 mt-4">${car.Brand} ${car.Model}</h4>
          <button class="btn btn-primary" data-bs-toggle="modal" onclick="carDisplay.loadModal(${JSON.stringify(car)})">Details</button>
        </div>
      </div>
    `).join('');
  }

  loadModal(car) {
    const modalId = `CarModal${car.Plate}`;
    const modalHtml = `
      <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="${modalId}Label" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="${modalId}Label">${car.Brand} ${car.Model}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <img src="${car.Picture}" alt="${car.Brand} ${car.Model}" class="img-fluid">
              <p>Brand: ${car.Brand}</p>
              <p>Model: ${car.Model}</p>
              <p>Year: ${car.Year}</p>
              <p>Plate: ${car.Plate}</p>
              <p>Color: ${car.Color}</p>
              <p>Doors: ${car.Door_Number}</p>
              <p>Kilometers: ${car.Kilometers}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    $(`#${modalId}`).modal('show');
  }
}

const carDisplay = new CarDisplay('cardCarros');
carDisplay.fetchCars();
*/

const listarCarros = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/cars');
  const lv = await response.json();
  for (const car of lv) {
      strHtml += `
      <div class="col-xl-3 col-md-6 mb-5 d-inline-flex justify-content-center">
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${car.Picture}" alt="${car.Brand} ${car.Model}">
          <h4 class="card-title mb-4 mt-4">${car.Brand} ${car.Model}</h4>
          <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#upModal" onclick="listDetails(${car.ID})">Details</button>
        </div>
      </div>
      `;
  }
  document.getElementById("cardCarros").innerHTML = strHtml;
}
listarCarros();

const adicionarCarro = async () => {
  var car = {
    //ID: document.getElementById("").value,
    //Picture: document.getElementById("").value,
    Brand: document.getElementById("inputBrand").value,
    Model: document.getElementById("inputModel").value,
    Year: document.getElementById("inputYear").value,
    Plate: document.getElementById("inputPlate").value,
    Color: document.getElementById("inputColor").value,
    Door_Number: document.getElementById("inputDoorNumber").value,
    Kilometers: document.getElementById("inputKilometers").value,
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