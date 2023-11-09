const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db");

const URL = "https://api.thedogapi.com/v1/breeds?limit=30";
const URL_IMAGE = "https://cdn2.thedogapi.com/images";

const getAllDogsControllers = async () => {
  try {
    const dogs = (await axios.get(URL)).data;
    const imageExtensions = [".jpg", ".png"];
    await Promise.all(
      dogs.map(async (dog) => {
        let successfulExtension = "";
        for (const extension of imageExtensions) {
          try {
            await axios.get(
              `${URL_IMAGE}/${dog.reference_image_id}${extension}`
            );
            successfulExtension = extension;
          } catch (error) {}
        }
        if (successfulExtension) {
          const [newDog, created] = await Dog.findOrCreate({
            where: {
              name: dog.name,
              image: `${URL_IMAGE}/${dog.reference_image_id}${successfulExtension}`,
              height: dog.height.metric,
              weight: dog.weight.metric,
              life_span: dog.life_span,
            },
          });
          if (dog.temperament) {
            const [newTemperament, created] = await Temperament.findOrCreate({
              where: { name: dog.temperament }
            });
            await newDog.setTemperaments(newTemperament);
          }
        }
      })
    );
    return await Dog.findAll({
      include: { model: Temperament, as: 'temperaments' }
    });
  } catch (error) {
    throw error;
  }
};

const getBreedByIdController = async (id, source) => {
  try {
    let breed;
    if (source === "api") {
      breed = (await axios.get(`${URL}/${id}`)).data;
      const imageExtensions = [".jpg", ".png"];
      for (const extension of imageExtensions) {
        try {
          await axios.get(
            `${URL_IMAGE}/${breed.reference_image_id}${extension}`
          );
          breed.image = `${URL_IMAGE}/${breed.reference_image_id}${extension}`
        } catch (error) {}
      }
    }
    
    if (source === "db") {
      breed = await Dog.findByPk(id, {
        include: [{ model: Temperament, as: 'temperaments' }]
        });
      }
    return breed;
  } catch (error) {
    throw new Error (`No se pudo encontrar la raza con el id ${id}`);
  }
};

const getDogByNameController = async (name) => {
  try {
    const imageExtensions = [".jpg", ".png"];
    const apiResponse = (await axios.get(URL)).data;
    const apiBreeds = apiResponse.filter((breed) =>
      breed.name.toLowerCase().includes(name)
    );
    const dbBreeds = await Dog.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [{ model: Temperament, as: 'temperaments' }]
    });
    const enrichedApiBreeds = apiBreeds.map(async (breed) => {
      for (const extension of imageExtensions) {
        try {
          await axios.get(
            `${URL_IMAGE}/${breed.reference_image_id}${extension}`
          );
          breed.image = `${URL_IMAGE}/${breed.reference_image_id}${extension}`;
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

const createDogController = async (name, image, height, weight, life_span, temperament) => {
  try {
    const [newBreed, created] = await Dog.findOrCreate({
      where: {
        name: name,
      },
      defaults: {
        image: image,
        height: height,
        weight: weight,
        life_span: life_span,
      },
    });
    if (!created) return { error: 'La raza ya existe en la base de datos.', breed: newBreed };
    let newTemperament;
    if (temperament) {
      try {
        const [newTemperament, created] = await Temperament.findOrCreate({
          where: {
            name: temperament,
          },
        });
        await newBreed.addTemperament(newTemperament);
        return [newBreed, newTemperament];
      } catch (error) {
        throw new Error('Error en la asociación de Temperament y Dog');
      }
    }
    return [newBreed, newTemperament];
  } catch (error) {
    throw new Error('No se pudo registrar la nueva raza');
  }
};

module.exports = {
  getAllDogsControllers,
  getBreedByIdController,
  getDogByNameController,
  createDogController,
};
