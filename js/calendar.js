document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      events: [
          {
              title: 'Meeting',
              start: '2024-04-10'
          },
          {
              title: 'Appointment',
              start: '2024-04-15',
              end: '2024-04-17'
          }
          // Add more events as needed
      ]
  });

  calendar.render();
});