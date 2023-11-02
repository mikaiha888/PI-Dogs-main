const { Router } = require("express");
const {
  getAllDogs,
  getRazaById,
  getDogByName,
  createDog,
} = require("../handlers/dogsHandlers");

const dogsRouter = Router();
dogsRouter.get("/search", getDogByName);
dogsRouter.get("/", getAllDogs);
dogsRouter.get("/:id", getRazaById);
dogsRouter.post("/", createDog);

module.exports = dogsRouter;