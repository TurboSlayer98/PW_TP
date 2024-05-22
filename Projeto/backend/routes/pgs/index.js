const router = require('express').Router();

const authRouter = require('./auth');
//const dashboardRouter = require('./dashboard');
const carsRouter = require('./cars');
//const serviceRouter = require('./service');
const usersRouter = require('./users');

router.use('/auth', authRouter);
//router.use('/dashboard', dashboardRouter);
router.use('/cars', carsRouter);
//router.use('/service', serviceRouter);
router.use('/users', usersRouter);

module.exports = router;