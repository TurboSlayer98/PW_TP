document.addEventListener("DOMContentLoaded", function () {
    // Get reference to the user table
    const userTable = document.getElementById("user_table");
    const userInfoCard = document.querySelector(".card.mb-4.collapse.collapse-horizontal");

    // Add click event listener to the table
    userTable.addEventListener("click", function (event) {

        // Check if the clicked element is a table row
        if (event.target.tagName === "TH" && event.target.parentElement.tagName === "TR") {
            // Get the user information from the clicked row
            const selectedRow = event.target.parentElement;
            const userName = selectedRow.cells[0].textContent;
            const userRole = selectedRow.cells[1].textContent;

            userInfoCard.classList.remove("collapse");

            // Display user information in the card
            const userInfoCardBody = userInfoCard.querySelector(".card-body");
            const userInfoName = userInfoCardBody.querySelector("h5");
            const userInfoRole = userInfoCardBody.querySelector(".text-muted.mb-1");

            userInfoName.textContent = userName;
            userInfoRole.textContent = userRole;

            // You can add more logic here to display other user information if needed
        }
    });
});