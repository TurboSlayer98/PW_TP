if (window.location.pathname.includes('/private/')) {
    document.addEventListener('DOMContentLoaded', event => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Redirect to login if token is not found
            window.location.href = '../../public/login.html';
            alert("Please authenticate to access this page.");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userRole = payload.role;

            // Check if the user's role matches the required role
            if (userRole !== "ADMIN") {
                alert('You do not have the required privileges to access this page.');
                // Redirect to an appropriate page based on role
                if (userRole === 'ADMIN') {
                    window.location.href = '../private/admins/dashboard.html';
                } else if (userRole === 'MECHANIC') {
                    window.location.href = '../private/admins/dashboard.html';
                } else {
                    window.location.href = '../private/users/dashboard.html';
                }
            }
        } catch (error) {
            console.error('Invalid token', error);
            // Redirect to login if there's an error with the token
            window.location.href = '../../public/login.html';
        }
    })
};

function validatePassword() {
    var password1 = document.getElementById("inputPassword").value;
    var password2 = document.getElementById("inputPasswordConfirm").value;

    // Validate through RegularExpression
    var passwordcheck1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    if (!passwordcheck1.test(password1)) {
        alert("Invalid Password");
        return false;
    }
    if (!password1.match(password2)) {
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
        headers: { "Content-Type": "application/json", },
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
    var user = {
        email: document.getElementById("inputEmail").value,
        password: document.getElementById("inputPassword").value,
    };

    try {
        const response = await fetch('http://localhost:4242/api/pgs/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.msg || 'Login failed');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        if (data.role === 'ADMIN') {
            window.location.href = '../private/admins/dashboard.html';
        } else if (data.role === 'MECHANIC') {
            window.location.href = '../private/mechanics/dashboard.html';
        } else {
            window.location.href = '../private/users/dashboard.html';
        }
    } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred during login: ' + error.message);
    }
};

// Função para definir um cookie
function setCookie(nome, valor, diasParaExpirar) {
    const data = new Date();
    data.setTime(data.getTime() + diasParaExpirar * 24 * 60 * 60 * 1000);
    const expira = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + valor + ";" + expira + ";path=/";
}

// Função para obter o valor de um cookie
function getCookie(nome) {
    const nomeCookie = nome + "=";
    const cookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(nomeCookie) === 0) {
            return cookie.substring(nomeCookie.length, cookie.length);
        }
    }
    return "";
}

function logout() {
    // Remove the token from localStorage
    localStorage.removeItem('token');

    // Redirect to the login page
    window.location.href = '../../public/login.html';
}

const leTokenSFF = async () => {
    var dados = {
      token: localStorage.getItem("token"),
    };
    console.log(JSON.stringify(dados));
    const response= await fetch("http://localhost:4242/api/pgs/auth/letoken", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dados),
    })
    console.log(response);
    dados= await  response.json()
    console.log(dados);
    if(!response.ok){
      alert("Erro ao fazer login");
    }
    else{
      alert("token lido com sucesso");
      console.log(dados);
    }
};
