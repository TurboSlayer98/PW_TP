const mechanicsRouter = require('express').Router();
const controller = require('../../controllers/pgs/mechanics.js');

//carsRouter.get('/testConn', controller.testConnection);

//CRUD para o Carro
mechanicsRouter.get('/', controller.getAll); //le todos
mechanicsRouter.get('/:id', controller.getById); //le 1 carro pelo id
mechanicsRouter.post('/create', controller.create); //criar um novo carro
mechanicsRouter.put('/update', controller.update); //atualizar um carro
mechanicsRouter.delete('/delete/:id', controller.delete); //apagar um crro pelo id

module.exports = mechanicsRouter;