const dashboardRouter = require('express').Router();
const controller = require('../../controllers/pgs/dashboard.js');

dashboardRouter.get('/', controller.countCars);
dashboardRouter.get('/', controller.countCarsInService);
dashboardRouter.get('/', controller.countMechanicsInService);
//dashboardRouter.get('/', controller.countMechanicsInService);

// Events
dashboardRouter.get('/', controller.getEvents);

dashboardRouter.post('/create', controller.create);

module.exports = dashboardRouter;