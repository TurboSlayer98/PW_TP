const path = require('path');
const publicRouter = require('express').Router();

// Define uma rota para a página HTML
publicRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(__dirname + "../../../frontend/public/index.html");
  });

// Define uma rota para a página login
publicRouter.get('/login', (req, res) => {
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile(__dirname + "../../../frontend/public/login.html");
});

// Define uma rota para a página register
publicRouter.get('/register', (req, res) => {
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile(__dirname + "../../../frontend/public/register.html");
});

// Define uma rota para a página forgot password
publicRouter.get('/forgotpassword', (req, res) => {
  // Envie o arquivo HTML como resposta para a solicitação HTTP
  res.sendFile(__dirname + "../../../frontend/public/password.html");
});

module.exports = publicRouter;