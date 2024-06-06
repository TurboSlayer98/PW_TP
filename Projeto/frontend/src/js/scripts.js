const token = localStorage.getItem("token");

const listSelectClients = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/clients/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const user of lv) {
    if (user.role == "CLIENT") {
      strHtml += `<option id="optionUser" value="${user.id}">${user.firstname} ${user.lastname} - ${user.email}</option>`;
    }
  }
  document.getElementById("selectUser").innerHTML += strHtml;
};

const listSelectServices = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/service/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const service of lv) {
    strHtml += `<option id="optionService" value="${service.id}">${service.name}</option>`;
  }
  document.getElementById("selectService").innerHTML += strHtml;
};

const listSelectCars = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/cars/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const cars of lv) {
    strHtml += `<option id="optionCar" value="${cars.id}">${cars.brand} ${cars.model} - ${cars.plate}</option>`;
  }
  document.getElementById("selectCar").innerHTML += strHtml;
};