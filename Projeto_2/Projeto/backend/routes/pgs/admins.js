const adminsRouter = require('express').Router();
const controller = require('../../controllers/pgs/admins.js');

//carsRouter.get('/testConn', controller.testConnection);

//CRUD para o Carro
adminsRouter.get('/', controller.getAll); //le todos
adminsRouter.get('/:id', controller.getById); //le 1 carro pelo id
adminsRouter.post('/create', controller.create); //criar um novo carro
adminsRouter.put('/update', controller.update); //atualizar um carro
adminsRouter.delete('/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = adminsRouter;