window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }

    const datatablesSimple1 = document.getElementById('datatablesSimple1');
    if (datatablesSimple1) {
        new simpleDatatables.DataTable(datatablesSimple1);
    }

    const activity_table = document.getElementById('activity_table');
    if (activity_table) {
        new simpleDatatables.DataTable(activity_table);
    }

    //const user_table = document.getElementById('user_table');
    //if (user_table) {
        //new simpleDatatables.DataTable(user_table);
    //}
});
