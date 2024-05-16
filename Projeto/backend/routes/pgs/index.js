const router = require('express').Router();
const carsRouter = require('./cars');
const authRouter = require('./auth');

router.use('/auth', authRouter);
router.use('/cars', carsRouter);

module.exports = router;