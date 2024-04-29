const path = require('path');
const express = require('express');
const privadoRouter = require('express').Router();
const controller = require('../controllers/carros');

// Set up static directory
privadoRouter.use(express.static(path.join(__dirname, '../public')));

// Define uma rota para a página HTML
privadoRouter.get('/cars', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile(path.join(__dirname, '../templates/backend/cars.html'));
  });

//CRUD para o Carro
privadoRouter.get('/', controller.getAll); //le todos
privadoRouter.get('/:id', controller.getById); //le 1 carro pelo id
privadoRouter.post('/create', controller.create); //criar um novo carro
privadoRouter.put('/update', controller.update); //atualizar um carro
privadoRouter.delete('/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = privadoRouter;