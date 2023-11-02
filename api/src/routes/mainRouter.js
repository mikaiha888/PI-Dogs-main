const { Router } = require('express');
const dogsRouter = require('./dogsRouter');
const tempsRouter = require('./tempsRouter');

const mainRouter = Router();
mainRouter.use('/dogs', dogsRouter);
mainRouter.use('/temperaments', tempsRouter);

module.exports = mainRouter;