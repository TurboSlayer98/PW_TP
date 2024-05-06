const router = require('express').Router();
const carsRouter = require('./cars');

router.use('/cars', carsRouter);

module.exports = router;