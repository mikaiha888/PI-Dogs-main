const { Router } = require("express");
const {
  getAllTemps,
  getTemp
} = require("../handlers/tempsHandlers");

const tempsRouter = Router();
tempsRouter.get("/search", getTemp);
tempsRouter.get("/", getAllTemps);

module.exports = tempsRouter;
