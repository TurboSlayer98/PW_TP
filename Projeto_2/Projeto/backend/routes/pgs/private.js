const path = require('path');
const privadoRouter = require('express').Router();
const middleware = require('../../middleware/auth.js');

//const caminho = "C:/Users/hffm9/OneDrive - Instituto Politécnico de Viana do Castelo/IPVC - 2023_2024/Programação Web/PW_TP/Projeto/templates/backend/";

// Set up static directory
//privadoRouter.use(express.static(path.join(__dirname, '../public')));

// __dirname representa o diretório atual do arquivo

privadoRouter.get('/dashboard', middleware.verificarToken, (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile("../../../frontend/private/dashboard.html");
});

// Define uma rota para a página HTML
privadoRouter.get('/cars', middleware.verificarToken, (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile("../../../frontend/private/cars.html");
});

// Define uma rota para a página HTML
privadoRouter.get('/service', middleware.verificarToken, (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile("../../../frontend/private/service.html");
});

// Define uma rota para a página HTML
privadoRouter.get('/admins', middleware.verificarToken, (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile("../../../frontend/private/admins.html");
});

// Define uma rota para a página HTML
privadoRouter.get('/mechanics', middleware.verificarToken, (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile("../../../frontend/private/mechanics.html");
});

// Define uma rota para a página HTML
privadoRouter.get('/clients', middleware.verificarToken, (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile("../../../frontend/private/clients.html");
});

module.exports = privadoRouter;