const dashboardRouter = require('express').Router();
const controller = require('../../controllers/pgs/dashboard.js');

dashboardRouter.get('/', controller.getAll);

//Functions
dashboardRouter.get('/countCars', controller.countCars);
dashboardRouter.get('/countCarsInService', controller.countCarsInService);
dashboardRouter.get('/countMechanicsInService', controller.countMechanicsInService);
dashboardRouter.get('/countCarsFinished', controller.countCarsFinished);

dashboardRouter.get('/:id', controller.getById); 
dashboardRouter.post('/create', controller.create);
dashboardRouter.put('/update', controller.update);
dashboardRouter.delete('/delete/:id', controller.delete);

module.exports = dashboardRouter;