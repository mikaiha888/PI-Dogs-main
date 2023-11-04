const axios = require("axios");
const { Op } = require("sequelize");
const { Dog } = require("../db");

const url = "https://api.thedogapi.com/v1/breeds";
const url_images = "https://cdn2.thedogapi.com/images";

const getAllDogsControllers = async () => {
  try {
    const dogs = (await axios.get(url)).data;
    const imageExtensions = [".jpg", ".png"];
    await Promise.all(
      dogs.map(async (dog) => {
        let successfulExtension = "";
        for (const extension of imageExtensions) {
          try {
            await axios.get(
              `${url_images}/${dog.reference_image_id}${extension}`
            );
            successfulExtension = extension;
          } catch (error) {}
        }
        if (successfulExtension) {
          await Dog.findOrCreate({
            where: {
              name: dog.name,
              image: `${url_images}/${dog.reference_image_id}${successfulExtension}`,
              height: dog.height.metric,
              weight: dog.weight.metric,
              life_span: dog.life_span,
            },
          });
        }
      })
    );
    return await Dog.findAll();
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
    const imageExtensions = [".jpg", ".png"];
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
    const enrichedApiBreeds = apiBreeds.map(async (breed) => {
      for (const extension of imageExtensions) {
        try {
          await axios.get(`${url_images}/${breed.reference_image_id}${extension}`);
          breed.image = `${url_images}/${breed.reference_image_id}${extension}`;
        } catch (error) {}
      }
      const matchingDbBreed = dbBreeds.find(
        (dbBreed) => dbBreed.name === breed.name
      );
      if (matchingDbBreed) {
        breed.dbInfo = matchingDbBreed.image;
      }
      return breed;
    });
    await Promise.all(enrichedApiBreeds);
    const matchingBreeds = [...apiBreeds, ...dbBreeds].filter(
      (value, index, self) => {
        return self.findIndex((b) => b.name === value.name) === index;
      }
    );
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
      life_span: life_span,
    });
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
