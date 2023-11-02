const { 
    getAllTempsControllers,
    getTempController
} = require("../controllers/tempsControllers");

const getAllTemps = async (req, res) => {
  try {
    const response = await getAllTempsControllers();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTemp = async (req, res) => {
    try {
      const name = req.query.name.toLowerCase();
      if (!name) res.status(400).send("Faltan datos");
      const response = await getTempController(name);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

module.exports = {
  getAllTemps,
  getTemp
};
