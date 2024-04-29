const express = require('express');
const privadoRouter = require('express').Router();
const controller = require('../controllers/carros');

//CRUD para o Carro
privadoRouter.get('/cars', controller.getAll); //le todos
privadoRouter.get('/cars/:id', controller.getById); //le 1 carro pelo id
privadoRouter.post('/cars/create', controller.create); //criar um novo carro
privadoRouter.put('/cars/update', controller.update); //atualizar um carro
privadoRouter.delete('/cars/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = privadoRouter;