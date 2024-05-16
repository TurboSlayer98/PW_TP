const path = require('path');
const express = require('express');
const publicRouter = require('express').Router();

//const caminho = "C:/Users/hffm9/OneDrive - Instituto Politécnico de Viana do Castelo/IPVC - 2023_2024/Programação Web/PW_TP/Projeto/templates/frontend/";

// Set up static directory
//publicRouter.use(express.static(path.join(__dirname, '../public')));

// Define uma rota para a página HTML
publicRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile("index.html");
  });

module.exports = publicRouter;