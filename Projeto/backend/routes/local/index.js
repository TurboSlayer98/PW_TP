const router = require('express').Router();

const publicRouter = require('./');

router.use('/', publicRouter);

module.exports = router;