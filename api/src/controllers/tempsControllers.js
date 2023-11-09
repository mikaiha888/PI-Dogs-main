const axios = require("axios");
const { Op } = require("sequelize");
const { Temperament } = require("../db");

const URL = "https://api.thedogapi.com/v1/breeds?limit=60";

const getAllTempsControllers = async () => {
  try {
    const breeds = (await axios.get(URL)).data;
    const allTempsPromises = breeds.map(async (breed) => {
      breed.temperament &&
        (await Temperament.findOrCreate({
          where: {
            name: breed.temperament,
          },
        }));
    });
    await Promise.all(allTempsPromises);
    const temperaments = await Temperament.findAll();
    return [
      ...new Set(
        temperaments.flatMap((temp) =>
          temp.name.split(", ").map((t) => t.trim())
        )
      ),
    ];
  } catch (error) {
    throw error;
  }
};

const getTempController = async (name) => {
  try {
    const apiResponse = (await axios.get(URL)).data;
    const apiTemperaments = apiResponse.filter(
      (temp) =>
        temp.temperament && temp.temperament.toLowerCase().includes(name)
    );
    const dbTemperaments = await Temperament.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    const matchingTemperaments = [...apiTemperaments, ...dbTemperaments];
    if (matchingTemperaments.length === 0)
      throw new Error(`No se ha encontrado el temperamento.`);
    return matchingTemperaments;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllTempsControllers,
  getTempController,
};
