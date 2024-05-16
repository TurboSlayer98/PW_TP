const router = require('express').Router();

const authRouter = require('./auth');
//const dashboardRouter = require('./dashboard');
const carsRouter = require('./cars');
//const serviceRouter = require('./service');
//const employesRouter = require('./employes');
//const clientsRouter = require('./clients');

router.use('/auth', authRouter);
//router.use('/dashboard', dashboardRouter);
router.use('/cars', carsRouter);
//router.use('/service', serviceRouter);
//router.use('/employes', employesRouter);
//router.use('/clients', clientsRouter);

module.exports = router;