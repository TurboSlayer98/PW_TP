const clientsRouter = require('express').Router();
const controller = require('../../controllers/pgs/clients.js');

//carsRouter.get('/testConn', controller.testConnection);

//CRUD para o Carro
clientsRouter.get('/', controller.getAll); //le todos
clientsRouter.get('/:id', controller.getById); //le 1 carro pelo id
clientsRouter.post('/create', controller.create); //criar um novo carro
clientsRouter.put('/update', controller.update); //atualizar um carro
clientsRouter.delete('/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = clientsRouter;