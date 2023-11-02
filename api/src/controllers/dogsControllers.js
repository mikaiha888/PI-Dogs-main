const axios = require("axios");
const { Op } = require("sequelize");
const { Dog } = require("../db");

const url = "https://api.thedogapi.com/v1/breeds";
const url_images = "https://api.thedogapi.com/v1/images";

const getAllDogsControllers = async () => {
  try {
    const dogs = (await axios.get(url)).data;
    const allDogsPromises = dogs.map(async (dog) => {
      const image = (await axios.get(`${url_images}/${dog.reference_image_id}`))
        .data;
      await Dog.findOrCreate({
        where: {
          name: dog.name,
          image: image.url,
          height: dog.height.metric,
          weight: dog.weight.metric,
          life_span: dog.life_span,
        },
      });
    });
    await Promise.all(allDogsPromises);
    return Dog.findAll();
  } catch (error) {
    throw error;
  }
};

const getRazaByIdController = async (id, source) => {
  try {
    const raza =
      source === "api"
        ? (await axios.get(`${url}/${id}`)).data
        : await Dog.findByPk(id);
    return raza;
  } catch (error) {
    throw error;
  }
};

const getDogByNameController = async (name) => {
  try {
    const apiResponse = (await axios.get(url)).data;
    const apiBreeds = apiResponse.filter((breed) =>
      breed.name.toLowerCase().includes(name)
    );
    const dbBreeds = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
    const matchingBreeds = [...apiBreeds, ...dbBreeds];
    if (matchingBreeds.length === 0)
      throw new Error("No se encontraron razas de perros con ese nombre.");
    return matchingBreeds;
  } catch (error) {
    throw error;
  }
};

const createDogController = async (name, image, height, weight, life_span) => {
  try {
    const newBreed = await Dog.create({
      name: name,
      image: image,
      height: height,
      weight: weight,
      life_span: life_span
    })
    return newBreed;
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = {
  getAllDogsControllers,
  getRazaByIdController,
  getDogByNameController,
  createDogController,
};
