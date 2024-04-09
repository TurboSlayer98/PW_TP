
const carr = 0;

const atualizarCarros = async () => {
    let strHtml = ``
    const response = await fetch('../assets/json/cars.json')
    const cars = await response.json()
    for (const car of cars) {
      strHtml += `
            <div class="col-xl-3 col-md-6 mb-5 d-inline-flex justify-content-center">
              <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${car.Picture}" alt="${car.Brand} ${car.Model}">
                <h4 class="card-title mb-4 mt-4">${car.Brand} ${car.Model}</h4>
                <a href="#" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#CarModal" onclick="carregaModal('${car.Brand}','${car.Model}','${car.Year}','${car.Plate}','${car.Color}','${car.Door_Number}','${car.Kilometers}')">Details</a>
              </div>
            </div>    
                 `
    }
    document.getElementById("cardCarros").innerHTML = strHtml;
}

atualizarCarros();

function carregaModal(brand,model,year,plate,color,door_Number,kilometers) {
    
    document.getElementById("modal_Title").innerHTML = brand + ' ' + model;

    //document.getElementById("carImg").src = picture;

    document.getElementById("brand-p").innerHTML += brand;
    document.getElementById("model-p").innerHTML += model;
    document.getElementById("year-p").innerHTML += year;
    document.getElementById("plate-p").innerHTML += plate;
    document.getElementById("color-p").innerHTML += color;
    document.getElementById("door-p").innerHTML += door_Number;
    document.getElementById("kms-p").innerHTML += kilometers;
}