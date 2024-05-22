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

const listUsers = async () => {
    let strHtml = ``;
    const response = await fetch('http://localhost:4242/api/pgs/users/');
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
            <td>${user.account_status}</td>
            <td>${user.role}</td>
            <td class="d-flex justify-content-center">
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#" onclick="listUserData(${user.id})">Details</button>
            <button class="btn btn-danger" onclick="deleteUser(${user.id})"><i class="fa fa-solid fa-trash"></i></button>
            </td>
        </tr>
        `;
    }
    document.getElementById("usertable").innerHTML = strHtml;
};
listUsers();

const listUserData = async (id) => {
    const response = await fetch('http://localhost:4242/api/pgs/users/' + id);
    const car = await response.json();

    document.getElementById("Car_inputBrand").value = car.brand;
    document.getElementById("Car_inputModel").value = car.model;
    document.getElementById("Car_inputYear").value = car.year;
    document.getElementById("Car_inputPlate").value = car.plate;
    document.getElementById("Car_inputColor").value = car.color;
    document.getElementById("Car_inputDoorNumber").value = car.door_number;
    document.getElementById("Car_inputKilometers").value = car.kilometers;
    document.getElementById("Car_inputPicture").value = car.picture;
};

const addUser = async () => {
    var Gender;
    var Role;
    if (document.getElementsByName("radiobuttonG").value == "Male")
        Gender = "Male";
    else
        Gender = "Female";
    if (document.getElementsByName("radiobuttonR").value == "ADMIN")
        Role = "ADMIN";
    else if (document.getElementsByName("radiobuttonR").value == "MECHANIC")
        Role = "MECHANIC";
    else
        Role = "CLIENT";
    var user = {
        Username: document.getElementById("inputuserName").value,
        Email: document.getElementById("inputEmail").value,
        Password: document.getElementById("inputPassword").value,
        Firstname: document.getElementById("inputfirstName").value,
        Lastname: document.getElementById("inputlastName").value,
        Gender: Gender,
        Status: document.getElementById("newCar_inputDoorNumber").value,
        Role: Role,
    };
    fetch('http://localhost:4242/api/pgs/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    })
        .then((response) => {
            // Verifica se a resposta foi bem sucedida
            if (!response.ok) {
                throw new Error('Erro ao obter os dados');
            }
            // Converte a resposta para JSON
            return response.json();
        })
        .then((data) => {
            // Faz algo com os dados 
            resposta = "O user com o nome: " + user.Firstname + " foi adicionado com sucesso!"
            alert(resposta)
            listUsers();
        })
        .catch((error) => {
            // Captura qualquer erro de rede ou tratamento de erro
            console.error('Houve um erro:', error);
        });
};

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
            resposta = "O carro com a matricula: " + car.Plate + " foi atualizado com sucesso!";
            alert(resposta);
            listCars();
        })
        .catch((error) => {
            alert(car.Year);
            // Captura qualquer erro de rede ou tratamento de erro
            console.error("Houve um erro:", error);
        });
};

const deleteCar = async (id) => {
    fetch("http://localhost:4242/api/pgs/cars/delete/" + id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
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
