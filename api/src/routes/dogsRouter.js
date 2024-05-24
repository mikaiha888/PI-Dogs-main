const { Router } = require("express");
const {
  getAllDogs,
  getBreedById,
  getDogByName,
  createDog,
  filterDog,
} = require("../handlers/dogsHandlers");

const dogsRouter = Router();
dogsRouter.get("/search", getDogByName);
dogsRouter.get("/filter", filterDog)
dogsRouter.get("/", getAllDogs);
dogsRouter.get("/:id", getBreedById);
dogsRouter.post("/", createDog);

module.exports = dogsRouter;