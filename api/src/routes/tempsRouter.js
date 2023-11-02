const { Router } = require("express");
const {
  getAllTemps,
} = require("../handlers/tempsHandlers");

const tempsRouter = Router();
tempsRouter.get("/", getAllTemps);

module.exports = tempsRouter;
