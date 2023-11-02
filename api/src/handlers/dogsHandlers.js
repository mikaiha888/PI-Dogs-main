const {
  getAllDogsControllers,
  getRazaByIdController,
  getDogByNameController,
  createDogController
} = require("../controllers/dogsControllers");

const getAllDogs = async (req, res) => {
  try {
    const response = await getAllDogsControllers();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getRazaById = async (req, res) => {
  try {
    const { id } = req.params;
    const source = isNaN(id) ? "db" : "api";
    const response = await getRazaByIdController(id, source);
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

const createDog = async (req, res) => {
    const { name, image, height, weight, life_span } = req.body;
    if (!name || !image || !height || !weight || !life_span)
      res.status(400).send("Faltan datos");
    try {
        const response = await createDogController(name, image, height, weight, life_span);
        res.status(201).json(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
  getAllDogs,
  getRazaById,
  getDogByName,
  createDog
};
