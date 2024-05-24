const {
  getAllDogsController,
  getBreedByIdController,
  getDogByNameController,
  filterDogController,
  createDogController,
} = require("../controllers/dogsControllers");

const getAllDogs = async (req, res) => {
  try {
    const response = await getAllDogsController();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getBreedById = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    const response = await getBreedByIdController(id, source);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getDogByName = async (req, res) => {
  try {
    const name = req.query.name.toLowerCase();
    if (!name) res.status(400).send("Faltan datos");
    const response = await getDogByNameController(name);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const filterDog = async (req, res) => {
  try {
    const filter = req.query.filter.toLowerCase();
    if (!filter) res.status(400).send("Faltan datos");
    const response = await filterDogController(filter);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createDog = async (req, res) => {
  const { name, image, height, weight, life_span, temperament } = req.body;
  if (!name || !image || !height || !weight || !life_span || !temperament)
    res.status(400).send("Faltan datos");
  try {
    const response = await createDogController({
      name,
      image,
      height,
      weight,
      life_span,
      temperament,
    });
    if (response.error && response.breed) {
      return res.status(422).send(response.error);
    }
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllDogs,
  getBreedById,
  getDogByName,
  createDog,
  filterDog
};
