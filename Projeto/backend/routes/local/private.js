const path = require('path');
const express = require('express');
const privadoRouter = require('express').Router();

const caminho = "C:/Users/hffm9/OneDrive - Instituto Politécnico de Viana do Castelo/IPVC - 2023_2024/Programação Web/PW_TP/Projeto/templates/backend/";

// Set up static directory
privadoRouter.use(express.static(path.join(__dirname, '../public')));

// Define uma rota para a página HTML
privadoRouter.get('/cars', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(caminho + "cars.html");

    
});

// Define uma rota para a página HTML
privadoRouter.get('/service', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(caminho + "service.html");
});

// Define uma rota para a página HTML
privadoRouter.get('/employes', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(caminho + "employes.html");
});

// Define uma rota para a página HTML
privadoRouter.get('/clients', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(caminho + "clients.html");
});

module.exports = privadoRouter;