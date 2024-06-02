const router = require('express').Router();

const authRouter = require('./auth');

const adminsRouter = require('./admins');
const mechanicsRouter = require('./mechanics');
const clientsRouter = require('./clients');

const dashboardRouter = require('./dashboard');
const carsRouter = require('./cars');

const serviceRouter = require('./service');

router.use('/auth', authRouter);
router.use('/dashboard', dashboardRouter);
router.use('/cars', carsRouter);
router.use('/service', serviceRouter);
router.use('/admins', adminsRouter);
router.use('/mechanics', mechanicsRouter);
router.use('/clients', clientsRouter);

module.exports = router;