const axios = require("axios");
const { Op } = require("sequelize");
const { Temperament } = require("../db");

const url = "https://api.thedogapi.com/v1/breeds";

const getAllTempsControllers = async () => {
  try {
    const breeds = (await axios.get(url)).data;
    const allTempsPromises = breeds.map(async (breed) => {
        breed.temperament && 
        await Temperament.findOrCreate({
            where: {
              name: breed.temperament
            },
        });
    })
    await Promise.all(allTempsPromises);
    return Temperament.findAll();;
  } catch (error) {
    throw error;
  }
};

const getTempController = async (name) => {
    try {
        const apiResponse = (await axios.get(url)).data;
        const apiTemperaments = apiResponse.filter((temp) =>
          temp.temperament && 
          temp.temperament.toLowerCase().includes(name)
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
    getTempController
  };

  