const usersRouter = require('express').Router();
const controller = require('../../controllers/pgs/users.js');

//carsRouter.get('/testConn', controller.testConnection);

//CRUD para o Carro
usersRouter.get('/', controller.getAll); //le todos
usersRouter.get('/:id', controller.getById); //le 1 carro pelo id
usersRouter.post('/create', controller.create); //criar um novo carro
usersRouter.put('/update', controller.update); //atualizar um carro
usersRouter.delete('/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = usersRouter;