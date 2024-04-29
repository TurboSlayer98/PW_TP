const path = require('path');
const express = require('express');
const publicRouter = require('express').Router();

// Set up static directory
publicRouter.use(express.static(path.join(__dirname, '../public')));

// Define uma rota para a página HTML
publicRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(path.join(__dirname, '../templates/frontend/index.html'));
  });

module.exports = publicRouter;