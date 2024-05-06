const carsRouter = require('express').Router();
const controller = require('../../controllers/pgs/cars.js');

carsRouter.get('/testConn', controller.testConnection);

//CRUD para o Carro
carsRouter.get('/', controller.getAll); //le todos
carsRouter.get('/:id', controller.getById); //le 1 carro pelo id
carsRouter.post('/create', controller.create); //criar um novo carro
carsRouter.put('/update', controller.update); //atualizar um carro
carsRouter.delete('/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = carsRouter;