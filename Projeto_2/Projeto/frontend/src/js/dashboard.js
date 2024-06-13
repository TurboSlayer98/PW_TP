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

  countCars();
  countCarsInService();
  countMechanicsInService();
  countCarsFinished();

  getEvents();

  listSelectClients();
  listSelectServices();
  listSelectCars();

  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'dayGridMonth,timeGridWeek,timeGridDay',
      center: 'title',
      right: 'addEventButton prev,next today'
    },
    customButtons: {
      addEventButton: {
        text: 'New Event',
        click: function () {
          var myModal = new bootstrap.Modal(document.getElementById('newEventModal'));
          myModal.show();
        }
      },
    },
    eventClick: function (info) {
      var eventObj = info.event;
      listDetails(eventObj.id);
      var myModal = new bootstrap.Modal(document.getElementById('eventDetailsModal'));
      myModal.show();
    },
    events: async function () {
      return await getEvents();
    }
  })
  var ratio = calendar.getOption('aspectRatio');
  console.log(ratio);
  calendar.render();
});

const getEvents = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const data = await response.json();

  const events = data.map(event => ({
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end
  }));
  return events;
}

const listDetails = async (id) => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const appointment = await response.json();
  sessionStorage.setItem('id', appointment.id);
  document.getElementById("details_inputTitle").value = appointment.title;
  await listSelectStatus(id);
  const startDate = new Date(appointment.start).toISOString().slice(0, 16); // Slice to remove seconds and milliseconds
  document.getElementById("details_inputStartDate").value = startDate;
  const endDate = new Date(appointment.end).toISOString().slice(0, 16); // Slice to remove seconds and milliseconds
  document.getElementById("details_inputEndDate").value = endDate;
  await listSelectClient(appointment.user_id);
  await listSelectService(appointment.service_id);
  await listSelectCar(appointment.car_id);
};

const addAppointment = async () => {

  var appointment = {
    Title: document.getElementById("inputTitle").value,
    Status: document.getElementById("selectStatus").value,
    StartDate: new Date(document.getElementById("inputStartDate").value).toISOString(),
    EndDate: new Date(document.getElementById("inputEndDate").value).toISOString(),
    UserID: parseInt(document.getElementById("selectUser").value),
    ServiceID: parseInt(document.getElementById("selectService").value),
    CarID: parseInt(document.getElementById("selectCar").value),
  };
  console.log(appointment);
  try {
    const response = await fetch('http://localhost:4242/api/pgs/dashboard/create', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    const data = await response.json();
    alert(`The appointment titled ${data.title} has been added successfully!`);
    calendar.addEvent({
        id: data.id,
        title: data.title,
        start: data.start,
        end: data.end
      });
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while adding the appointment.');
  };
  getEvents();
}

const updateAppointment = async () => {

  var appointment = {
    id: parseInt(sessionStorage.getItem('id')),
    Title: document.getElementById("details_inputTitle").value,
    Status: document.getElementById("details_selectStatus").value,
    StartDate: new Date(document.getElementById("details_inputStartDate").value).toISOString(),
    EndDate: new Date(document.getElementById("details_inputEndDate").value).toISOString(),
    UserID: parseInt(document.getElementById("details_selectUser").value),
    ServiceID: parseInt(document.getElementById("details_selectService").value),
    CarID: parseInt(document.getElementById("details_selectCar").value),
  };
  try {
    const response = await fetch('http://localhost:4242/api/pgs/dashboard/update', {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });
    if (!response.ok) {
      throw new Error('Failed to update appointment');
    }
    const data = await response.json();
    alert(`The appointment titled ${data.title} has been update successfully!`);
  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while updating the appointment.');
  }
  getEvents();
};

const countCars = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/countCars', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const number = await response.json();
  document.getElementById("countCars").innerHTML = number;
};

const countCarsInService = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/countCarsInService', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const number = await response.json();
  document.getElementById("countCarsInService").innerHTML = number;
};

const countMechanicsInService = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/countMechanicsInService', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const number = await response.json();
  document.getElementById("countMechanicsInService").innerHTML = number;
};

const countCarsFinished = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/countCarsFinished', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const number = await response.json();
  document.getElementById("countCarsFinished").innerHTML = number;
};

const listSelectClient = async (id) => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/clients/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  strHtml +=
    `<option id="optionUser" value="${data.id}">${data.firstname} ${data.lastname} - ${data.email}</option>
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
  document.getElementById("details_selectUser").innerHTML += strHtml;
};

const listSelectService = async (id) => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/service/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  strHtml += `<option id="optionService" value="${data.id}">${data.name}</option><hr class="dropdown-divider"/>`;

  const response2 = await fetch('http://localhost:4242/api/pgs/service/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response2.json();
  for (const service of lv) {
    strHtml += `<option id="optionService" value="${service.id}">${service.name}</option>`;
  }
  document.getElementById("details_selectService").innerHTML = strHtml;
};

const listSelectCar = async (id) => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/cars/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  strHtml += `<option id="optionCar" value="${data.id}">${data.brand} ${data.model} - ${data.plate}</option><hr class="dropdown-divider"/>`;

  const response2 = await fetch('http://localhost:4242/api/pgs/cars/', {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const lv = await response2.json();
  for (const car of lv) {
    strHtml += `<option id="optionCar" value="${car.id}">${car.brand} ${car.model} - ${car.plate}</option>`;
  }
  document.getElementById("details_selectCar").innerHTML = strHtml;
};

const listSelectStatus = async (id) => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/' + id, {
    method: 'GET', headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
  });
  const data = await response.json();
  strHtml += `<option id="optionStatus" value="${data.status}">${data.status}</option><hr class="dropdown-divider"/>`;
  document.getElementById("details_selectStatus").innerHTML = strHtml + document.getElementById("details_selectStatus").innerHTML;
};