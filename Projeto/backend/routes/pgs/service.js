const serviceRouter = require('express').Router();
const controller = require('../../controllers/pgs/service.js');

//carsRouter.get('/testConn', controller.testConnection);

//CRUD para o Carro
serviceRouter.get('/', controller.getAll); //le todos
serviceRouter.get('/:id', controller.getById); //le 1 carro pelo id
serviceRouter.post('/create', controller.create); //criar um novo carro
serviceRouter.put('/update', controller.update); //atualizar um carro
serviceRouter.delete('/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = serviceRouter;