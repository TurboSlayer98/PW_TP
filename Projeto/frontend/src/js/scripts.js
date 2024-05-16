/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 

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

});

function validatePassword(){
    var password1 = document.getElementById("inputPassword").value;
    var password2 = document.getElementById("inputPasswordConfirm").value;

    // Validate through RegularExpression
    var passwordcheck1 =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (!passwordcheck1.test(password1)){
       alert("Invalid Password");
    return false;
    }
    if(!password1.match(password2)){
        alert("The two password fields are not the same!!");
    return false;
    }
    newUser();
    return true;
}

const newUser = async () => {
    var data = {
        firstname: document.getElementById("inputFirstName").value,
        lastname: document.getElementById("inputLastName").value,
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value,
    };
    console.log(data);
    fetch("http://localhost:4242/api/pgs/auth/signup", {
      method: "POST",
      headers: {"Content-Type": "application/json",},
      body: JSON.stringify(data),
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
        alert("O " + data.firstname + data.lastname + " foi adicionado com sucesso!");
      })
      .catch((error) => {
        // Captura qualquer erro de rede ou tratamento de erro
        alert("Houve um erro:", error);
      });
  };

  const validateLogin = async () => {
    var data = {
      email: document.getElementById("inputEmail").value,
      password: document.getElementById("inputPassword").value,
    };
    const response= await fetch("http://localhost:4242/api/pgs/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    console.log(response.ok);
    dados= await  response.json()
    if(!response.ok){
      alert("Error Login In");
    }
    else{
      alert("Login Succefull!");
      console.log(data);
      // Guardar o token no local storage
      localStorage.setItem("token", data.token);
      window.location.href = "http://localhost:4242/";
    }
};
