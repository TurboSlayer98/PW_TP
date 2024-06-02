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
  countCars();
  countCarsInService();
  countMechanicsInService();

  listSelectClients();
  listSelectServices();
  listSelectCars();
});

const countCars = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const number = await response.json();
  document.getElementById("countCars").innerHTML = number;
};

const countCarsInService = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const number = await response.json();
  document.getElementById("countCarsInService").innerHTML = number;
};

const countMechanicsInService = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const number = await response.json();
  document.getElementById("countMechanicsInService").innerHTML = number;
};

const getEvents = async () => {
  const response = await fetch('http://localhost:4242/api/pgs/dashboard/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const data = await response.json();

  // Assuming the API returns an array of events in the correct format
  const events = data.map(event => ({
    title: event.title,
    start: event.start,  // Ensure these fields match the API response
    end: event.end      // If the API provides an end date
  }));
  alert(events);
  return events;
}

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      center: 'addEventButton'
    },
    customButtons: {
      addEventButton: {
        text: 'New', click: function () {
          listSelectClients();
          listSelectServices();
          // Show the modal
          var myModal = new bootstrap.Modal(document.getElementById('newEventModal'));
          myModal.show();
        }
      },
    },
    events: async function () {
      return await getEvents();
    }
  })
  calendar.render();
});

const listSelectClients = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/clients/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const user of lv) {
    if (user.role == "CLIENT") {
      strHtml += `<option id="optionUser" value="${user.id}">${user.firstname} ${user.lastname} - ${user.email}</option>`;
    }
  }
  document.getElementById("selectUser").innerHTML = strHtml;
}

const listSelectServices = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/service/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const service of lv) {
    strHtml += `<option id="optionService" value="${service.id}">${service.name}</option>`;
  }
  document.getElementById("selectService").innerHTML = strHtml;
}

const listSelectCars = async () => {
  let strHtml = ``;
  const response = await fetch('http://localhost:4242/api/pgs/cars/', {
    method: 'GET', headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' }
  });
  const lv = await response.json();
  for (const cars of lv) {
    strHtml += `<option id="optionCar" value="${cars.id}">${cars.brand} ${cars.model} - ${cars.plate}</option>`;
  }
  document.getElementById("selectCars").innerHTML = strHtml;
}

const addAppointment = async () => {

  var appointment = {
    Title: document.getElementById("inputTitle").value,
    Status: document.getElementById("selectStatus").value,
    StartDate: document.getElementById("inputStartDate").value,
    EndDate: document.getElementById("inputEndDate").value,
    UserID: document.getElementById("optionUser").value,
    ServiceID: document.getElementById("optionService").value,
  };

  try {
    const response = await fetch('http://localhost:4242/api/pgs/dashboard/create', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ${token}', 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });

    if (!response.ok) {
      throw new Error('Failed to create appointment');
    }

    const data = await response.json();
    alert(`The appointment titled ${data.title} has been added successfully!`);
    listC();  // Assuming this function is defined elsewhere

  } catch (error) {
    console.error('An error occurred:', error);
    alert('An error occurred while adding the appointment.');
  }
}